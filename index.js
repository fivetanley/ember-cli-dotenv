'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const parseArgs = require('minimist');

module.exports = {
  name: require('./package').name,

  /**
   * NOTE: dotenv needs to be invoked before the app config is materialized
   * so that the process.env's are set appropriately.  Previously this was done
   * within the `config` hook.  As of 2.15.x, that is too late in the process
   * and needed to be moved into `init`.
   */
  init() {
    this._super.init && this._super.init.apply(this, arguments);

    let root = this.project.root;
    let configFactory = path.join(root, 'config', 'dotenv.js');
    let options = {
      path: path.join(root, '.env'),
      clientAllowedKeys: [],
      fastbootAllowedKeys: [],
      failOnMissingKey: false,
      enabled: true,
    };

    if (fs.existsSync(configFactory)) {
      this._config = Object.assign(
        options,
        require(configFactory)(this._resolveEnvironment()),
      );
    } else {
      this._config = options;
    }

    if (this._config.enabled) {
      let loadedConfig = dotenv.config({ path: options.path });
      this._envConfig = loadedConfig.parsed;

      // It might happen that environment config is missing or corrupted
      if (loadedConfig.error) {
        let loadingErrMsg = `[ember-cli-dotenv]: ${loadedConfig.error.message}`;
        if (options.failOnMissingKey) {
          throw new Error(loadingErrMsg);
        } else {
          console.warn(loadingErrMsg); // eslint-disable-line no-console
        }
      }
    }
  },

  _resolveEnvironment() {
    if (process.env.EMBER_ENV) {
      return process.env.EMBER_ENV;
    }

    let args = parseArgs(process.argv);
    let env = args.e || args.env || args.environment;

    // Is it "ember b -prod" or "ember build --prod" command?
    if (
      !env &&
      (process.argv.indexOf('-prod') > -1 ||
        process.argv.indexOf('--prod') > -1)
    ) {
      env = 'production';
    }

    // Is it "ember test" or "ember t" command without explicit env specified?
    if (
      !env &&
      (process.argv.indexOf('test') > -1 || process.argv.indexOf('t') > -1)
    ) {
      env = 'test';
    }

    return env || 'development';
  },

  config() {
    if (this._config.enabled) {
      let allowedKeys = this._config.clientAllowedKeys || [];

      return this._pickConfigKeys(allowedKeys);
    }

    return {};
  },

  /**
   * Reset values listed in `clientAllowedKeys` to null and
   * add values from `fastbootAllowedKeys` to FastBoot manifest in package.json.
   *
   * Users may list in same keys both in `clientAllowedKeys` and
   * `fastbootAllowedKeys`
   *
   * @returns {Object}
   */
  fastbootConfigTree() {
    let allowedKeys = this._config.fastbootAllowedKeys || [];

    // `fastbootConfigTree` expects key name as app/engine name
    return {
      [this.app.name]: this._pickConfigKeys(allowedKeys),
    };
  },

  _pickConfigKeys(keys) {
    let envConfig = this._envConfig || {};

    return keys.reduce((accumulator, key) => {
      if (envConfig[key] === undefined) {
        let errMsg =
          "[ember-cli-dotenv]: Required environment variable '" +
          key +
          "' is missing.";
        if (this._config.failOnMissingKey) {
          throw new Error(errMsg);
        } else {
          this.ui.writeWarnLine(errMsg);
        }
      }

      accumulator[key] = envConfig[key];

      return accumulator;
    }, {});
  },
};

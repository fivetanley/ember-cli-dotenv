/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const parseArgs = require('minimist');

module.exports = {
  name: 'ember-cli-dotenv',

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
      failOnMissingKey: false,
    };

    if (fs.existsSync(configFactory)) {
      this._config = Object.assign(options, require(configFactory)(this._resolveEnvironment()));
    }

    let loadedConfig = dotenv.config({path: options.path});
    this._envConfig = loadedConfig.parsed;
    this._envConfigError = loadedConfig.error;
  },

  included() {
    // It might happen that environment config is missing or corrupted
    if (this._envConfigError) {
      let loadingErrMsg = `[ember-cli-dotenv]: ${this._envConfigError.message}`;
      if (this._config.failOnMissingKey) {
        throw new Error(loadingErrMsg);
      } else {
        this.ui.warn(loadingErrMsg);
      }
    }
  },

  _resolveEnvironment() {
    if (process.env.EMBER_ENV) {
      return process.env.EMBER_ENV;
    }

    let args = parseArgs(process.argv);
    let env = args.e || args.env || args.environment;

    // Is it "ember b -prod" command?
    if (!env && process.argv.indexOf('-prod') > -1) {
      env = 'production'
    }

    // Is it "ember test" or "ember t" command without explicit env specified?
    if (!env && (process.argv.indexOf('test') > -1 || process.argv.indexOf('t') > -1)) {
      env = 'test'
    }

    return env || 'development';
  },

  config() {
    let loadedConfig = this._envConfig || {};
    let allowedKeys = this._config.clientAllowedKeys || [];

    return allowedKeys.reduce((accumulator, key) => {
      if (loadedConfig[key] === undefined) {
        let errMsg = '[ember-cli-dotenv]: Required environment variable \'' + key + '\' is missing.';
        if (this._config.failOnMissingKey) {
          throw new Error(errMsg);
        } else {
          this.ui.warn(errMsg);
        }
      }

      accumulator[key] = loadedConfig[key];

      return accumulator;
    }, {});
  },

  fastbootConfigTree() {
    let loadedConfig = this._envConfig || {};
    let allowedKeys = this._config.fastbootAllowedKeys || [];

    const config = allowedKeys.reduce((accumulator, key) => {
      if (loadedConfig[key] === undefined) {
        let errMsg = '[ember-cli-dotenv]: Required environment variable \'' + key + '\' is missing.';
        if (this._config.failOnMissingKey) {
          throw new Error(errMsg);
        } else {
          this.ui.warn(errMsg);
        }
      }

      accumulator[key] = loadedConfig[key];

      return accumulator;
    }, {});

    // `fastbootConfigTree` expects key name as app/engine name
    return {
      [this.app.name]: config
    };
  }
};

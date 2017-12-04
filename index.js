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
      Object.assign(options, require(configFactory)(this._resolveEnvironment()));
    }

    let loadedConfig = dotenv.config({ path: options.path });

    // It might happen that environment config is missing or corrupted
    if (loadedConfig.error) {
      let loadingErrMsg = `[ember-cli-dotenv]: ${loadedConfig.error.message}`;
      if (options.failOnMissingKey) {
        throw new Error(loadingErrMsg);
      } else {
        console.warn(loadingErrMsg);
        return;
      }
    }

    let allowedKeys = options.clientAllowedKeys || [];

    allowedKeys.forEach(key => {
      if (loadedConfig.parsed[key] === undefined) {
        let errMsg = '[ember-cli-dotenv]: Required environment variable \'' + key + '\' is missing.';
        if (options.failOnMissingKey) {
          throw new Error(errMsg);
        } else {
          console.warn(errMsg);
        }
      }
    });

    this._config = allowedKeys.reduce((accumulator, key) => {
      accumulator[key] = loadedConfig.parsed[key];

      return accumulator;
    }, {});
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
    return this._config;
  }
};

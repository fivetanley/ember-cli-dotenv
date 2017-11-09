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
      clientAllowedKeys: []
    };

    if (fs.existsSync(configFactory)) {
      Object.assign(options, require(configFactory)(this._resolveEnvironment()));
    }

    if (fs.existsSync(options.path) && dotenv.config({ path: options.path })) {
      let loadedConfig = dotenv.parse(fs.readFileSync(options.path));
      let allowedKeys = options.clientAllowedKeys || [];

      this._config = allowedKeys.reduce((accumulator, key) => {
        accumulator[key] = loadedConfig[key];

        return accumulator;
      }, {});
    }
  },

  _resolveEnvironment() {
    if (process.env.EMBER_ENV) {
      return process.env.EMBER_ENV;
    }

    let args = parseArgs(process.argv);
    let env = args.e || args.env || args.environment;

    return env || 'development';
  },

  config() {
    return this._config;
  }
};

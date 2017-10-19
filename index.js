/* jshint node: true */

'use strict';

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const existsSync = require('exists-sync');

module.exports = {
  name: 'ember-cli-dotenv',

  /**
   * NOTE: dotenv needs to be invoked before the app config is materialized
   * so that the process.env's are set appropriately.  Previously this was done
   * within the `config` hook.  As of 2.15.x, that is too late in the process
   * and needed to be moved into `init`.
   */
  init() {
    this._super.apply(this, arguments);

    let root = this.project.root;
    let configFactory = path.join(root, 'dotenv.js');
    let options = {
      path: path.join(root, '.env'),
      clientAllowedKeys: []
    };

    if (existsSync(configFactory)) {
      Object.assign(options, require(configFactory)(this.env));
    }

    if (existsSync(options.path) && dotenv.config({ path: options.path })) {
      let loadedConfig = dotenv.parse(fs.readFileSync(options.path));
      let allowedKeys = options.clientAllowedKeys || [];

      this._config = allowedKeys.reduce((accumulator, key) => {
        accumulator[key] = loadedConfig[key];

        return accumulator;
      }, {});
    }
  },

  config() {
    return this._config;
  }
};

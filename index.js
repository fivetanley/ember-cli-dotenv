/* jshint node: true */
module.exports = {
  name: 'ember-cli-dotenv',
  config: function(environment){
    var path = require('path');
    var fs = require('fs');
    var dotenv = require('dotenv');
    var existsSync = require('exists-sync');
    var project = this.project;
    var loadedConfig;
    var config = {};
    var hasOwn = Object.prototype.hasOwnProperty;

    var configFilePath,
        dotEnvPath = this.app && this.app.options.dotEnv && this.app.options.dotEnv.path;

    if (dotEnvPath) {
      // path is defined
      if (typeof dotEnvPath === 'string') {
        configFilePath = dotEnvPath;
      } else {
        if (dotEnvPath[environment]) {
          configFilePath = dotEnvPath[environment];
        }
      }
    }

    if (!configFilePath) {
      configFilePath = path.join(project.root, '.env');
    }

    if (existsSync(configFilePath) && dotenv.config({path: configFilePath})) {
      loadedConfig = dotenv.parse(fs.readFileSync(configFilePath));
    } else {
      loadedConfig = {};
    }

    var app = this.app;
    if (!this.app) {
      return;
    }
    if (app.options.dotEnv && hasOwn.call(app.options.dotEnv, 'allow')){
      console.warn("[EMBER-CLI-DOTENV] app.options.allow has been deprecated. Please use clientAllowedKeys instead. Support will be removed in the next major version");
    }
    var allowedKeys = (app.options.dotEnv && (app.options.dotEnv.clientAllowedKeys || app.options.dotEnv.allow) || []);

    allowedKeys.forEach(function(key){
      config[key] = loadedConfig[key];
    });

    return config;
  },
  included: function(app){
    this.app = app;
  }
};

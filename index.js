/* jshint node: true */
module.exports = {
  name: 'ember-cli-dotenv',
  config: function(){
    var path = require('path');
    var fs = require('fs');
    var dotenv = require('dotenv');
    var project = this.project;
    var loadedConfig;
    var config = {};
    var hasOwn = Object.prototype.hasOwnProperty;

    var configFilePath = path.join(project.root, '.env');

    if (fs.existsSync(configFilePath)){
      // Load all server side keys
      dotenv._getKeyAndValueFromLine(configFilePath);
      dotenv._setEnvs();
      dotenv.load();
      loadedConfig = dotenv.parse(fs.readFileSync(configFilePath));
    } else  {
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

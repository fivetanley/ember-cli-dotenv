/* jshint node: true */
module.exports = {
  name: 'ember-cli-dotenv',
  config: function(){
    var path = require('path');
    var fs = require('fs');
    var dotenv = require('dotenv');
    var app = this.app;
    var project = this.project;
    var loadedConfig;
    var config = {};
    var allowedKeys = (app.options.dotEnv && app.options.dotEnv.allow) || [];

    console.log('allowedKeys', allowedKeys);

    var configFilePath = path.join(project.root, '.env');

    if (fs.existsSync(configFilePath)){
      loadedConfig = dotenv.parse(fs.readFileSync(configFilePath));
    } else  {
      loadedConfig = {};
    }

    allowedKeys.forEach(function(key){
      config[key] = loadedConfig[key];
    });

    return config;
  }
};

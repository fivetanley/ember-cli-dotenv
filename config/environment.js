/* jshint node:true */
'use strict';

module.exports = function(/* environment, appConfig */) {
  var path = require('path');
  var fs = require('fs');
  var dotenv = require('dotenv');

  var configFilePath = path.join(this.project.root, '.env');
  var config;

  if (fs.existsSync(configFilePath)){
    return dotenv.parse(fs.readFileSync(configFilePath));
  } else  {
    return {};
  }
};

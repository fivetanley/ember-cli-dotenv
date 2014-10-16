/* jshint node: true */
module.exports = {
  name: 'ember-cli-dotenv',
  config: function(){
    var path = require('path');
    var fs = require('fs');
    var dotenv = require('dotenv');

    var configFilePath = path.join(this.project.root, '.env');

    if (fs.existsSync(configFilePath)){
      return dotenv.parse(fs.readFileSync(configFilePath));
    } else  {
      return {};
    }
  }
};

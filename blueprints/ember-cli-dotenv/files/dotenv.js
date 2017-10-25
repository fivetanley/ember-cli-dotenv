/* eslint-env node */

'use strict';

const path = require('path');

module.exports = function(/* env */) {
  return {
    clientAllowedKeys: ['DROPBOX_KEY'],
    path: path.join(__dirname, '.env')
  }
}

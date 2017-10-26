/* eslint-env node */
'use strict';

module.exports = function(env) {
  return {
    clientAllowedKeys: ['DOTENV_VAR'],
    path: `./.env-${env}`
  }
};

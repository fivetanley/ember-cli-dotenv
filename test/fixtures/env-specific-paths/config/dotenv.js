/* eslint-env node */
'use strict';

module.exports = function(env) {
  return {
    clientAllowedKeys: ['DOTENV_VAR'],
    fastbootAllowedKeys: ['FASTBOOT_DOTENV_VAR'],
    path: `./.env-${env}`
  }
};

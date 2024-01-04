/* eslint-env node */
'use strict';

module.exports = function () {
  return {
    clientAllowedKeys: ['DOTENV_VAR'],
    fastbootAllowedKeys: ['FASTBOOT_DOTENV_VAR'],
    path: './.env.custom',
  };
};

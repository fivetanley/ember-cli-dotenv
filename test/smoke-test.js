/* eslint-env node */
/* global describe before it */
'use strict';

const chai         = require('chai');
const expect       = chai.expect;
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('with default .env path', function() {
  this.timeout(600000);

  let app;

  before(function() {
    app = new AddonTestApp();

    return app.create('dummy')
      .then(function() {
        return app.runEmberCommand('build');
      });
  });

  it('add clientAllowedKeys to <app name>/config/environment JS module', function () {
    let config = readConfig(app);

    expect(config.DOTENV_VAR).to.equal('dotenv');
  });

  it('allows to use process.env in config/environment.js', function () {
    let config = readConfig(app);

    expect(config.IN_PROCESS_ENV).to.equal('IN_PROCESS_ENV');
  });

});

describe('with custom .env path', function() {
  this.timeout(600000);

  let app;

  before(function() {
    app = new AddonTestApp();

    return app.create('custom-path')
      .then(function() {
        return app.runEmberCommand('build');
      });
  });

  it('add clientAllowedKeys to <app name>/config/environment JS module', function () {
    let config = readConfig(app);

    expect(config.DOTENV_VAR).to.equal('custom.dotenv');
  });

  it('allows to use process.env in config/environment.js', function () {
    let config = readConfig(app);

    expect(config.IN_PROCESS_ENV).to.equal('CUSTOM_IN_PROCESS_ENV');
  });

});

describe('with env specific .env path', function() {
  this.timeout(600000);

  describe('for development environment', function() {

    let app;

    before(function() {
      app = new AddonTestApp();

      return app.create('env-specific-paths')
        .then(function() {
          return app.runEmberCommand('build');
        });
    });

    it('add clientAllowedKeys to <app name>/config/environment JS module', function () {
      let config = readConfig(app);

      expect(config.DOTENV_VAR).to.equal('development.dotenv');
    });

    it('allows to use process.env in config/environment.js', function () {
      let config = readConfig(app);

      expect(config.IN_PROCESS_ENV).to.equal('DEVELOPMENT_IN_PROCESS_ENV');
    });

  });

  describe('for production environment', function() {

    let app;

    before(function() {
      app = new AddonTestApp();

      return app.create('env-specific-paths')
        .then(function() {
          return app.runEmberCommand('build', '--environment=production');
        });
    });

    it('add clientAllowedKeys to <app name>/config/environment JS module', function () {
      let config = readConfig(app);

      expect(config.DOTENV_VAR).to.equal('production.dotenv');
    });

    it('allows to use process.env in config/environment.js', function () {
      let config = readConfig(app);

      expect(config.IN_PROCESS_ENV).to.equal('PRODUCTION_IN_PROCESS_ENV');
    });

  });

  describe('for production environment alias command', function() {

    let app;

    before(function() {
      app = new AddonTestApp();

      return app.create('env-specific-paths')
        .then(function() {
          return app.runEmberCommand('build', '-prod');
        });
    });

    it('properly resolves environment name', function () {
      let config = readConfig(app);

      expect(config.DOTENV_VAR).to.equal('production.dotenv');
      expect(config.IN_PROCESS_ENV).to.equal('PRODUCTION_IN_PROCESS_ENV');
    });

  });

});

/**
 * Reads config from meta tag in index.html of the final build.
 *
 * @param {AddonTestApp} app
 * @return {Object}
 */
function readConfig (app) {
  let configRegExp = new RegExp(
    `<meta name="${app.appName}\\/config\\/environment" content="([a-z\\d._\\-%/\\\\]*)" \/>`,
    'gi'
  );
  let contents = require('fs').readFileSync(app.filePath('dist/index.html'), 'utf8');

  let matches = configRegExp.exec(contents);
  return matches && matches[1] && JSON.parse(unescape(matches[1]));
}

/* eslint-env node */
/* global describe before it */
'use strict';

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs-extra');
const AddonTestApp = require('ember-cli-addon-tests').AddonTestApp;

describe('with default .env path', function () {
  this.timeout(600000);

  let app;

  before(function () {
    app = new AddonTestApp();

    return app
      .create('dummy', { skipNpm: true })
      .then(addMissingDependencies)
      .then(installModules)
      .then(function () {
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

describe('with custom .env path', function () {
  this.timeout(600000);

  let app;

  before(function () {
    app = new AddonTestApp();

    return app
      .create('custom-path', { skipNpm: true })
      .then(addMissingDependencies)
      .then(installModules)
      .then(function () {
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

describe('with env specific .env path', function () {
  this.timeout(600000);

  describe('for development environment', function () {
    let app;

    before(function () {
      app = new AddonTestApp();

      return app
        .create('env-specific-paths', { skipNpm: true })
        .then(addMissingDependencies)
        .then(installModules)
        .then(function () {
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

  describe('for production environment', function () {
    let app;

    before(function () {
      app = new AddonTestApp();

      return app
        .create('env-specific-paths', { skipNpm: true })
        .then(addMissingDependencies)
        .then(installModules)
        .then(function () {
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

  describe('for production environment alias command', function () {
    let app;

    before(function () {
      app = new AddonTestApp();

      return app
        .create('env-specific-paths', { skipNpm: true })
        .then(addMissingDependencies)
        .then(installModules)
        .then(function () {
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

describe('generating app build with FastBoot', function () {
  this.timeout(600000);

  let app;

  before(function () {
    app = new AddonTestApp();

    return app
      .create('dummy', { skipNpm: true })
      .then(function (app) {
        app.editPackageJSON((pkg) => {
          pkg.devDependencies['ember-cli-fastboot'] = '*';
        });

        return app;
      })
      .then(addMissingDependencies)
      .then(installModules)
      .then(function () {
        return app.runEmberCommand('build');
      });
  });

  it('provides additional config added to package.json', function () {
    let pkg = fs.readJsonSync(app.filePath('dist/package.json'));

    expect(pkg.fastboot.config.dummy.DOTENV_VAR).to.equal('dotenv');
    expect(pkg.fastboot.config.dummy.FASTBOOT_DOTENV_VAR).to.equal(
      'fastboot dotenv',
    );
  });

  it('fastbootAllowedKeys do not appear in <app name>/config/environment JS module', function () {
    let config = readConfig(app);

    expect(config.FASTBOOT_DOTENV_VAR).to.be.undefined;
  });
});

/**
 * Reads config from meta tag in index.html of the final build.
 *
 * @param {AddonTestApp} app
 * @return {Object}
 */
function readConfig(app) {
  let configRegExp = new RegExp(
    `<meta name="${app.appName}\\/config\\/environment" content="([a-z\\d._\\-%/\\\\]*)" \\/>`,
    'gi',
  );
  let contents = require('fs').readFileSync(
    app.filePath('dist/index.html'),
    'utf8',
  );

  let matches = configRegExp.exec(contents);
  return matches && matches[1] && JSON.parse(unescape(matches[1]));
}

/**
 * Adds missing dependencies.
 *
 * @param {AddonTestApp} app
 */
function addMissingDependencies(app) {
  app.editPackageJSON(function (pkg) {
    pkg.devDependencies['ember-data'] = '*';
    pkg.devDependencies['@babel/plugin-transform-block-scoping'] = '*';
    pkg.devDependencies['@babel/core'] = '*';
  });

  return app;
}

/**
 * Runs script for installing npm modules.
 *
 * @param {AddonTestApp} app
 */
function installModules(app) {
  return app.run('npm', 'install');
}

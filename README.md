![main branch build](https://github.com/fivetanley/ember-cli-dotenv/workflows/test/badge.svg?branch=main)
[![npm version](https://badge.fury.io/js/ember-cli-dotenv.svg)](https://badge.fury.io/js/ember-cli-dotenv)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-dotenv.svg)](http://emberobserver.com/addons/ember-cli-dotenv)

# ember-cli-dotenv

## Compatibility

* Ember.js v4.8 or above
* Ember CLI v4.8 or above
* Node.js v18 or above

## Installation

```bash
ember install ember-cli-dotenv
```

## Upgrading to 2.0.0

* `ember install ember-cli-dotenv@^2.0.0`
* open `config/dotenv.js` and `ember-cli-build.js`
* Move/convert the `dotEnv` application options from `ember-cli-build.js` to the function declared within `config/dotenv.js`
  * NOTE: if your `path` is dynamic see [Multiple Environments](https://github.com/fivetanley/ember-cli-dotenv#multiple-environments)

## Embroider Compatibility

This was addon was designed to work with classic Ember CLI build pipeline and
approach used here simply does not work under Embroider.

For Ember apps using Embroider, it's recommended to use [`@embroider/macros`][macros]
to pass Node.js environment variable(s) to Ember code. In `ember-cli-build.js`, do:

```javascript
require('dotenv').config();

let app = new EmberApp(defaults, {
  '@embroider/macros': {
    // this is how you configure your own package
    setOwnConfig: {
      DROPBOX_KEY: process.env.DROPBOX_KEY
    },
    // this is how you can optionally send configuration into your
    // dependencies, if those dependencies choose to use
    // @embroider/macros configs.
    setConfig: {
      'some-dependency': {
        DROPBOX_KEY: process.env.DROPBOX_KEY
      },
    },
  },
});
```

In case if you need to consume env variable(s) only in FastBoot mode
and ensure they don't get transferred to browser in `config/fastboot.js`, do:

```javascript
require('dotenv').config();

module.exports = function(environment) {
  const myGlobal = {
    DROPBOX_KEY: process.env.DROPBOX_KEY,
  };

  return {
    buildSandboxGlobals(defaultGlobals) {
      return Object.assign({}, defaultGlobals, {
        myGlobal,
      });
    },
  };
}
```

## What is Ember CLI Dotenv?

This addon allows you to write environment variables in a `.env` file and
expose them to your Ember app through the built-in `config/environment.js`
that you can import in your app. For example, you might be building an
app with Dropbox and don’t want to check your key into the repo. Put a `.env`
file in the root of your repository:

```bash
DROPBOX_KEY=YOURKEYGOESHERE
```

Next, configure `config/dotenv.js`.

```js
// config/dotenv.js
module.exports = function(env) {
  return {
    clientAllowedKeys: ['DROPBOX_KEY'],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: false
  };
};
```

*All keys in `.env` are currently injected into node’s `process.env`.*
These will be available in your `config/environment.js` file:

```js
// config/environment.js
module.exports = function(environment) {
  return {
    MY_OTHER_KEY: process.env.MY_OTHER_KEY
  };
};
```

You can then use the node process environment variables in other ember-cli-addons,
such as express middleware or other servers/tasks.

**Security: environment variables in `config/environment.js` are never filtered
unlike using `.env` and `clientAllowedKeys`. Remember to use the `environment`
variable passed into your config function to filter out secrets for production
usage. Never include sensitive variables in `clientAllowedKeys`, as these will
be exposed publicly via Ember's `<meta name="app/config/environment">` tag.**

Then, you can access the environment variables anywhere in your app like
you usually would.

```js
import ENV from "my-app/config/environment";

console.log(ENV.DROPBOX_KEY); // logs YOURKEYGOESHERE
```

You can read more about dotenv files on their [dotenv repository][dotenv].

All the work is done by ember-cli and [dotenv][dotenv]. Thanks ember-cli team and
dotenv authors and maintainers! Thanks Brandon Keepers for the original dotenv
ruby implementation.

### FastBoot support

This addon supports FastBoot via `fastbootConfigTree` build hook (requires `ember-cli-fastboot`
1.1.0 or higher).
Use `fastbootAllowedKeys` configuration option to make variables available in FastBoot mode
when Ember application is rendered server-side.

```javascript
// ember-cli-build.js

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: ['DROPBOX_KEY'],
      fastbootAllowedKeys: ['MY_API_SECRET', 'MY_OTHER_API_SECRET']
    }
  });

  return app.toTree();
};
```
**Note:** keys listed in `fastbootAllowedKeys` are not added to Ember's
`<meta name="app/config/environment">` tag and are not available to Ember application
when it runs in browser.

### Multiple Environments

Sometimes people may want to use different `.env` file than the one in project root.
This can be configured as below:

```js
// config/dotenv.js
module.exports = function(env) {
  return {
    clientAllowedKeys: ['DROPBOX_KEY'],
    path: './path/to/.env'
  };
};
```

In addition, you may also customize for different environments:


```js
// config/dotenv.js
module.exports = function(env) {
  return {
    clientAllowedKeys: ['DROPBOX_KEY'],
    path: `./path/to/.env-${env}`
  };
};
```

With the above, if you run `ember build --environment production`, the file
`./path/to/.env-production` will be used instead.

### Environment Specific Use

Sometimes people may want to only initiate the dotenv file in one or more environments (e.g. not in production)
This can be configured as below:

```js
// config/dotenv.js
module.exports = function(env) {
  return {
    enabled: env !== 'production' // default is TRUE for any environment
  };
};
```

When `enabled` is set to `false`, the dotenv protocol will not be used at all.
This is great for quieting errors and side issues when deploying with a service like Heroku,
 where you can use environment variables set within the service and avoid storing a .env file in your repo.

## Compatibility

This addon supports the Ember 2.x series, but it is also backwards-compatible down to Ember-CLI 0.1.2 and Ember 1.7.0.

For FastBoot support you need Ember 2.3 or higher (2.12.0 and higher is prefereable by ember-cli-fastboot)
and [ember-cli-fastboot](https://github.com/ember-fastboot/ember-cli-fastboot) 1.1.1 or higher.

## Other Resources

* [Emberscreencasts video on using ember-cli-dotenv](https://www.emberscreencasts.com/posts/52-dotenv)


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).

[dotenv]: https://github.com/motdotla/dotenv
[macros]: https://www.npmjs.com/package/@embroider/macros

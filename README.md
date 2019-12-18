[![Build Status](https://travis-ci.org/fivetanley/ember-cli-dotenv.svg?branch=master)](https://travis-ci.org/fivetanley/ember-cli-dotenv)
[![npm version](https://badge.fury.io/js/ember-cli-dotenv.svg)](https://badge.fury.io/js/ember-cli-dotenv)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-dotenv.svg)](http://emberobserver.com/addons/ember-cli-dotenv)

# Ember CLI Dotenv


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.4 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

  return app.toTree();
};
```
**Note:** keys listed in `fastbootAllowedKeys` are not added to Ember's
`<meta name="app/config/environment">` tag and are not available to Ember application
when it runs in browser.

### Multiple Environments

Sometime people may want to use different `.env` file than the one in project root.
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

## Compatibility

This addon supports the Ember 2.x series, but it is also backwards-compatible down to Ember-CLI 0.1.2 and Ember 1.7.0.

For FastBoot support you need Ember 2.3 or higher (2.12.0 and higher is prefereable by ember-cli-fastboot)
and [ember-cli-fastboot](https://github.com/ember-fastboot/ember-cli-fastboot) 1.1.1 or higher.

## Other Resources

* [Emberscreencasts video on using ember-cli-dotenv](https://www.emberscreencasts.com/posts/52-dotenv)


Contributing
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test:ember` – Runs the test suite against multiple Ember versions
* `npm test:node` - Runs the test suite in `test` folder created with `ember-cli-addon-tests`

Contributing
------------------------------------------------------------------------------

[dotenv]: https://github.com/motdotla/dotenv


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).

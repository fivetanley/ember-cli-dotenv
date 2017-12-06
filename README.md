[![Build Status](https://travis-ci.org/fivetanley/ember-cli-dotenv.svg?branch=master)](https://travis-ci.org/fivetanley/ember-cli-dotenv)
[![npm version](https://badge.fury.io/js/ember-cli-dotenv.svg)](https://badge.fury.io/js/ember-cli-dotenv)
[![Ember Observer Score](https://emberobserver.com/badges/ember-cli-dotenv.svg)](http://emberobserver.com/addons/ember-cli-dotenv)

# Ember CLI Dotenv

# Installation

```bash
ember install ember-cli-dotenv
```

# Upgrading to 2.0.0

* `ember install ember-cli-dotenv@^2.0.0`
* open `config/dotenv.js` and `ember-cli-build.js`
* Move/convert the `dotEnv` application options from `ember-cli-build.js` to the function declared within `config/dotenv.js`
  * NOTE: if your `path` is dynamic see [Multiple Environments](https://github.com/fivetanley/ember-cli-dotenv#multiple-environments)

# What is Ember CLI Dotenv?

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
    failOnMissingKey: false, 
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
usage.  Never include sensitive variables in `clientAllowedKeys`, as these will
be exposed publicly via ember's `<meta name="app/config/environment">` tag.**

then, you can access the environment variables anywhere in your app like
you usually would.

```js
import ENV from "my-app/config/environment";

console.log(ENV.DROPBOX_KEY); // logs YOURKEYGOESHERE
```

You can read more about dotenv files on their [dotenv repository][dotenv].

All the work is done by ember-cli and [dotenv][dotenv]. Thanks ember-cli team and
dotenv authors and maintainers! Thanks Brandon Keepers for the original dotenv
ruby implementation.

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
`./path/to/.env.production` will be used instead.

## Compatibility

This addon supports the Ember 2.x series, but it is also backwards-compatible down to Ember-CLI 0.1.2 and Ember 1.7.0.

## Other Resources

* [Emberscreencasts video on using ember-cli-dotenv](https://www.emberscreencasts.com/posts/52-dotenv)

## Development Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

<!-- Links -->
[dotenv]: https://github.com/motdotla/dotenv

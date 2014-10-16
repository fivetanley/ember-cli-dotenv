# Ember CLI Dotenv

# Installation

`npm install --save ember-cli-dotenv`

# What is Ember CLI Dotenv?

This addon allows you to write environment variables in a `.env` file and
expose them to your Ember app through the built-in `config/environment.js`
that you can import in your app. For example, you might be building an
app with Dropbox and don’t want to check your key into the repo. Put a `.env`
file in the root of your repository:

```bash
DROPBOX_KEY=YOURKEYGOESHERE
```

then, you can access the environment variables anywhere in your app like
you usually would.

```javascript
import ENV from "my-app/config/environment";

console.log(ENV.DROPBOX_KEY); // logs YOURKEYGOESHERE
```

You can read more about dotenv files on their [dotenv repository][dotenv].

All the work is done by ember-cli and [dotenv][dotenv]. Thanks ember-cli team and
dotenv authors and maintainers! Thanks Brandon Keepers for the original dotenv
ruby implementation.


## Development Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

<!-- Links -->
[dotenv]: https://github.com/motdotla/dotenv

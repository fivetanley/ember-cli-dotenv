Changelog
-------------

## 4.0.0

#### :boom: Breaking Change
* [#117](https://github.com/fivetanley/ember-cli-dotenv/pull/117) Drop support for Node.js 16 and below ([@SergeAstapov](https://github.com/SergeAstapov))

#### :rocket: Enhancement
* [#119](https://github.com/fivetanley/ember-cli-dotenv/pull/119) Widen dotenv package versions support to allow past v8 ([@SergeAstapov](https://github.com/SergeAstapov))

#### :memo: Documentation
* [#121](https://github.com/fivetanley/ember-cli-dotenv/pull/121) Add Embroider compatibility note and recommendations ([@SergeAstapov](https://github.com/SergeAstapov))

#### :house: Internal
* [#118](https://github.com/fivetanley/ember-cli-dotenv/pull/118) run `npx ember-cli-update --to=5.5.0` to align with blueprint ([@SergeAstapov](https://github.com/SergeAstapov))

## 3.1.0

* [#84](https://github.com/fivetanley/ember-cli-dotenv/pull/84) Add ability to shut off dotenv invocation [@gfmartinez](https://github.com/gfmartinez)

## 3.0.1

* [#68](https://github.com/fivetanley/ember-cli-dotenv/pull/68) Checking also for "ember build --prod" command [@davideferre](https://github.com/davideferre)

## 3.0.0

* [#66](https://github.com/fivetanley/ember-cli-dotenv/pull/66) Update Default location of .env in config/dotenv.js blueprint [@SergeAstapov](https://github.com/SergeAstapov)
* [#63](https://github.com/fivetanley/ember-cli-dotenv/pull/63) Upgrade dotenv to version 8.0.0 and drop Node.js 6.x support [@SergeAstapov](https://github.com/SergeAstapov)
* [#62](https://github.com/fivetanley/ember-cli-dotenv/pull/62) Remove unnecessary dependencies broccoli-caching-writer and send [@SergeAstapov](https://github.com/SergeAstapov)

## 2.2.3

* [#66](https://github.com/fivetanley/ember-cli-dotenv/pull/66) Update Default location of .env in config/dotenv.js blueprint [@SergeAstapov](https://github.com/SergeAstapov)

## 2.2.2

* [#61](https://github.com/fivetanley/ember-cli-dotenv/pull/61) Fix addon installation [@SergeAstapov](https://github.com/SergeAstapov)
* [#60](https://github.com/fivetanley/ember-cli-dotenv/pull/60) Updated to ember-cli to 3.9.0 [@KalachevDev](https://github.com/KalachevDev)
* [#58](https://github.com/fivetanley/ember-cli-dotenv/pull/58) dotenv package upgraded to 7.0.0 version [@KalachevDev](https://github.com/KalachevDev)


## 2.2.1

* [#53](https://github.com/fivetanley/ember-cli-dotenv/pull/50) Fix build error when outputting the missing key warning message [@sandydoo](https://github.com/sandydoo)


## 2.2.0

* [#50](https://github.com/fivetanley/ember-cli-dotenv/pull/50) Add FastBoot support [@SergeAstapov](https://github.com/SergeAstapov)


## 2.1.0

* [#45](https://github.com/fivetanley/ember-cli-dotenv/pull/45) Add check for env variables presence [@ondrejsevcik](https://github.com/ondrejsevcik)


## 2.0.0

* [#39](https://github.com/fivetanley/ember-cli-dotenv/pull/39) Removed exists-sync pkg, using fs.existsSync instead [@oxodesign](https://github.com/oxodesign)
* [#37](https://github.com/fivetanley/ember-cli-dotenv/pull/37) Move dotenv.js config file to /config folder [@SergeAstapov](https://github.com/SergeAstapov)
* [#35](https://github.com/fivetanley/ember-cli-dotenv/pull/35) Fix broken tests and add more tests with ember-cli-addon-tests addon [@SergeAstapov](https://github.com/SergeAstapov)
* [#29](https://github.com/fivetanley/ember-cli-dotenv/pull/29) Upgrade Ember CLI and align with default blueprint [@SergeAstapov](https://github.com/SergeAstapov)
* [#33](https://github.com/fivetanley/ember-cli-dotenv/pull/33) Add support for Ember CLI >= 2.16.0 [@jasonmit](https://github.com/jasonmit)
* [#31](https://github.com/fivetanley/ember-cli-dotenv/pull/31) README add npm and EmberObserver badges [@SergeAstapov](https://github.com/SergeAstapov)
* [#21](https://github.com/fivetanley/ember-cli-dotenv/pull/21) README fix .env.production path example [@ibroadfo](https://github.com/ibroadfo)


## 1.2.0

* [#20](https://github.com/fivetanley/ember-cli-dotenv/pull/20) README Security clarification [@wkoffel](https://github.com/wkoffel)
* [#15](https://github.com/fivetanley/ember-cli-dotenv/pull/15) Upgrade Addon via `ember init` command [@elwayman02](https://github.com/elwayman02)

## 1.0.4

* [#16](https://github.com/fivetanley/ember-cli-dotenv/pull/16) Avoid errors if .env does not exist [@dschmidt](https://github.com/dschmidt)

## 1.0.3

* [#13](https://github.com/fivetanley/ember-cli-dotenv/pull/13) README reference ember-cli-build.js instead of Brocfile.js [@matthewlehner](https://github.com/matthewlehner)
* [#12](https://github.com/fivetanley/ember-cli-dotenv/pull/12) README add learning resource [@jeffreybiles](https://github.com/jeffreybiles)
* [#11](https://github.com/fivetanley/ember-cli-dotenv/pull/11) remove deprecated existsSync [@jasonmit](https://github.com/jasonmit)

## 1.0.1

* [#10](https://github.com/fivetanley/ember-cli-dotenv/pull/10) Don't attempt to load .env file if it doesn't exist [@opsb](https://github.com/opsb)

## 1.0.0

* [#6](https://github.com/fivetanley/ember-cli-dotenv/pull/6) added support for multiple environments [@gniquil](https://github.com/gniquil)

## 0.4.0

* [#5](https://github.com/fivetanley/ember-cli-dotenv/pull/5) allow process.env to be populated before the ember app loads [@zilkey](https://github.com/zilkey)

## 0.3.0

* Deprecate `allow` in config. Use `allowedClientKeys` instead.
* The node process `process.env` now always gets injected with the environment variables.
This means `process.env` will have your secret environment variables, but you still have
to explicitly allow client keys.

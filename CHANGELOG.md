Changelog
-------------

## 0.2.2

* Deprecate `allow` in config. Use `allowedClientKeys` instead.
* The node process `process.env` now always gets injected with the environment variables.
This means `process.env` will have your secret environment variables, but you still have
to explicitly allow client keys.

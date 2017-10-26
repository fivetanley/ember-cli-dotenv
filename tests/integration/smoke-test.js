import { module } from 'qunit';
import { test } from 'ember-qunit';
import ENV from "dummy/config/environment";

module("smoke test");

test("should work", function(assert){
  assert.equal(ENV.DOTENV_VAR, "dotenv");
});

test("doesn't put in keys unless they are explicitly allowed", function(assert){
  assert.equal(Object.hasOwnProperty.call(ENV, "DO_NOT_ALLOW"), false);
});

test("puts keys in the node process ENV always", function(assert){
  assert.equal(ENV.IN_PROCESS_ENV, "IN_PROCESS_ENV");
});

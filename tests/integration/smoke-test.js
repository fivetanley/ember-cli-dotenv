import ENV from "dummy/config/environment";

module("smoke test");

test("should work", function(){
  equal(ENV.DOTENV_VAR, "dotenv");
});

test("doesn't put in keys unless they are explicitly allowed", function(){
  equal(Object.hasOwnProperty.call(ENV, 'DO_NOT_ALLOW'), false);
});

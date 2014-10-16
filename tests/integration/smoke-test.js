import ENV from "dummy/config/environment";

module("smoke test");

test("should work", function(){
  equal(ENV.DOTENV_VAR, "dotenv");
});

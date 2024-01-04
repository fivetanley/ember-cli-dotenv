import { module, test } from 'qunit';
import ENV from 'dummy/config/environment';

module('smoke test', function () {
  test('should work', function (assert) {
    assert.strictEqual(ENV.DOTENV_VAR, 'dotenv');
  });

  test("doesn't put in keys unless they are explicitly allowed", function (assert) {
    assert.false(Object.hasOwnProperty.call(ENV, 'DO_NOT_ALLOW'));
  });

  test('puts keys in the node process ENV always', function (assert) {
    assert.strictEqual(ENV.IN_PROCESS_ENV, 'IN_PROCESS_ENV');
  });
});

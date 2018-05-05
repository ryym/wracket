import * as assert from 'assert';
import {fake} from 'sinon';
import {memoize} from './memoize';

describe('memoize', () => {
  it('caches a result and just returns it from the second call', () => {
    const getOne = fake.returns(1);
    const memoized = memoize(getOne);

    assert.deepStrictEqual(
      [memoized(), memoized(), memoized()],
      [1, 1, 1],
      'return values of memoized function',
    );
    assert.equal(getOne.callCount, 1, 'wrapped function call count');
  });
});

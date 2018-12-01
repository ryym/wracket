import {fake} from 'sinon';
import {memoize} from './memoize';

describe('memoize', () => {
  it('caches a result and just returns it from the second call', () => {
    const getOne = fake.returns(1);
    const memoized = memoize(getOne);

    expect([memoized(), memoized(), memoized()]).toEqual([1, 1, 1]);
    expect(getOne.callCount).toBe(1);
  });
});

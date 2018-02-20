const { sumOfArray } = require('../utils/array-sum');

describe('array-sum', () => {
  it('should return zero when nothing is passed to it as input', () => {
    expect(sumOfArray()).toEqual(0);
  });
  it('should return some of items in array', () => {
    expect(sumOfArray([1, 2, 3, 4])).toEqual(10);
  });
  it('should handle negative numbers', () => {
    expect(sumOfArray([1, -1])).toEqual(0);
  });
  it('should handle arrays with items of other types than number', () => {
    expect(sumOfArray([1.2, 4, 'hello'])).toEqual('5.2hello');
    expect(sumOfArray([1.2, 4, true])).toEqual(6.2);
    expect(sumOfArray([1.2, 4, '2'])).toEqual('5.22');
    expect(sumOfArray([1.2, 4, null])).toEqual(5.2);
    expect(sumOfArray([1.2, 4, undefined])).toEqual(NaN);
  });
});

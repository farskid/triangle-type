const { isPositive } = require('../utils/is-positive');

describe('isPositive', () => {
  it('should reject on none numeral values', () => {
    expect(isPositive(true)).toBe(false);
    expect(isPositive('hello world')).toBe(false);
    expect(isPositive(NaN)).toBe(false);
    expect(isPositive(Infinity)).toBe(false);
    expect(isPositive(-Infinity)).toBe(false);
    expect(isPositive([1, 2])).toBe(false);
    expect(isPositive({ a: 'a', b: 'b' })).toBe(false);
    expect(isPositive(() => {})).toBe(false);
    expect(isPositive(null)).toBe(false);
    expect(isPositive(undefined)).toBe(false);
  });

  it('should reject negative values', () => {
    expect(isPositive(-2)).toBe(false);
    expect(isPositive(-1.14)).toBe(false);
  });

  it('should accept positive numbers', () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(2.11)).toBe(true);
  });
});

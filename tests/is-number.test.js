const { isNumber } = require("../utils/is-number");

describe("isNumber", () => {
  it("should reject on none numeral values", () => {
    expect(isNumber(true)).toBe(false);
    expect(isNumber("hello world")).toBe(false);
    expect(isNumber(NaN)).toBe(false);
    expect(isNumber(Infinity)).toBe(false);
    expect(isNumber(-Infinity)).toBe(false);
    expect(isNumber([1, 2])).toBe(false);
    expect(isNumber({ a: "a", b: "b" })).toBe(false);
    expect(isNumber(() => {})).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
  });

  it("should accept actual numbers", () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(-30)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-0)).toBe(true);
    expect(isNumber(0.0)).toBe(true);
    expect(isNumber(2.11)).toBe(true);
  });
});

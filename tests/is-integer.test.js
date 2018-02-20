const { isInteger } = require("../utils/is-integer");

describe("isInteger", () => {
  it("should reject on none numeral values", () => {
    expect(isInteger(true)).toBe(false);
    expect(isInteger("hello world")).toBe(false);
    expect(isInteger(NaN)).toBe(false);
    expect(isInteger(Infinity)).toBe(false);
    expect(isInteger(-Infinity)).toBe(false);
    expect(isInteger([1, 2])).toBe(false);
    expect(isInteger({ a: "a", b: "b" })).toBe(false);
    expect(isInteger(() => {})).toBe(false);
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
  });

  it("should reject float numbers", () => {
    expect(isInteger(1.2)).toBe(false);
    expect(isInteger(-21.7)).toBe(false);
  });

  it("should accept actual integers", () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(-30)).toBe(true);
    expect(isInteger(0)).toBe(true);
    expect(isInteger(-0)).toBe(true);
    expect(isInteger(0.0)).toBe(true);
  });
});

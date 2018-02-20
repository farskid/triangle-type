const { ERROR_CODES, TRIANGLE_TYPES } = require("../constants");

describe("ERROR_CODES", () => {
  it("should have NOT_NUMBER", () => {
    expect(ERROR_CODES.NOT_NUMBER).toEqual("NOT_NUMBER");
  });
  it("should have NOT_INTEGER", () => {
    expect(ERROR_CODES.NOT_INTEGER).toEqual("NOT_INTEGER");
  });
  it("should have NOT_POSITIVE", () => {
    expect(ERROR_CODES.NOT_POSITIVE).toEqual("NOT_POSITIVE");
  });
});

describe("TRIANGLE_TYPES", () => {
  it("should have only 3 types of Isosceles, Equilateral and Scalene", () => {
    expect(TRIANGLE_TYPES).toEqual({
      isosceles: "Isosceles",
      equilateral: "Equilateral",
      scalene: "Scalene",
      invalid: "Invalid"
    });
  });
});

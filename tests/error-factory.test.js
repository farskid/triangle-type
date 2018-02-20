const { createTriangleTypeError } = require("../utils/error-factory");

let suite = {};

beforeAll(() => {
  suite.error = createTriangleTypeError("SOME_CODE", "some message");
});

afterAll(() => {
  suite = null;
});

describe("createTriangleTypeError", () => {
  it("accept code and message props", () => {
    expect(suite.error.code).toEqual("SOME_CODE");
    expect(suite.error.message).toEqual("some message");
  });
  it("should inherit from Error object", () => {
    expect(Error.isPrototypeOf(suite.error)).toBe(true);
  });
});

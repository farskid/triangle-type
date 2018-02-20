const { triangleTypeDetecor } = require('../triangle-type-detect');
const { createTriangleTypeError } = require('../utils/error-factory');
const { ERROR_CODES, TRIANGLE_TYPES } = require('../constants');

describe('triangleTypeDetect', () => {
  it('should accept 3 arguments as 3 side values', () => {
    expect(triangleTypeDetecor.length).toBe(3);
  });
  it('should return a promise', () => {
    expect(triangleTypeDetecor(3, 4, 5).then).not.toBe(undefined);
  });
  it('should reject with NOT_NUMBER when one/all of the values is/are not of type number', () => {
    triangleTypeDetecor(true, 'hello world', undefined).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_NUMBER,
          'triangleDetector requires all 3 parameters to be of type number, instead got: boolean , string , undefined'
        )
      )
    );

    triangleTypeDetecor(true, 'hello world', 1).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_NUMBER,
          'triangleDetector requires all 3 parameters to be of type number, instead got: boolean , string , number'
        )
      )
    );

    triangleTypeDetecor(true, 2, 1).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_NUMBER,
          'triangleDetector requires all 3 parameters to be of type number, instead got: boolean , number , number'
        )
      )
    );
  });

  it('should reject with NOT_POSITIVE when one/all of the values is/are not positive', () => {
    triangleTypeDetecor(1, -1, 0).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_POSITIVE,
          'triangleDetector requires all 3 parameters to be a positive number'
        )
      )
    );
    triangleTypeDetecor(1, 0, 0).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_POSITIVE,
          'triangleDetector requires all 3 parameters to be a positive number'
        )
      )
    );
    triangleTypeDetecor(1, -1, -1).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_POSITIVE,
          'triangleDetector requires all 3 parameters to be a positive number'
        )
      )
    );
    triangleTypeDetecor(-1, -1, 0).catch(err =>
      expect(err).toEqual(
        createTriangleTypeError(
          ERROR_CODES.NOT_POSITIVE,
          'triangleDetector requires all 3 parameters to be a positive number'
        )
      )
    );
  });

  it('should resolve with Invalid when size values are impossible to shape a triangle due to geometry rule', () => {
    /*
      - Rule: a+b>c && a+c>b && b+c>a
      - Make sure there is no dependency on order of sides
    */
    triangleTypeDetecor(1, 2, 3).catch(err =>
      expect(err).toEqual(TRIANGLE_TYPES.invalid)
    );
    triangleTypeDetecor(3, 1, 2).catch(err =>
      expect(err).toEqual(TRIANGLE_TYPES.invalid)
    );
    triangleTypeDetecor(3, 2, 1).catch(err =>
      expect(err).toEqual(TRIANGLE_TYPES.invalid)
    );
  });

  it('should pass if all sides are valid positive numbers', () => {
    triangleTypeDetecor(3, 4, 5).then(type =>
      expect(type).toEqual(TRIANGLE_TYPES.scalene)
    );
  });

  it('should detect correct types', () => {
    triangleTypeDetecor(3, 3, 3).then(type =>
      expect(type).toEqual(TRIANGLE_TYPES.equilateral)
    );
    triangleTypeDetecor(2, 3, 2).then(type =>
      expect(type).toEqual(TRIANGLE_TYPES.isosceles)
    );
    triangleTypeDetecor(5, 4, 3).then(type =>
      expect(type).toEqual(TRIANGLE_TYPES.scalene)
    );
  });
});

const Set = require('es6-set');
const { ERROR_CODES, TRIANGLE_TYPES } = require('./constants');
const { createTriangleTypeError } = require('./utils/error-factory');
const { isNumber } = require('./utils/is-number');
const { isPositive } = require('./utils/is-positive');
const { sumOfArray } = require('./utils/array-sum');

module.exports.triangleTypeDetecor = function triangleTypeDetecor(
  side1,
  side2,
  side3
) {
  // Array of sides, operations on arrays are much easier than to deal with sides separately
  const sidesArray = [side1, side2, side3];

  // Sort sides lengths from small to large
  // NOTE: since `sort` is mutable, I'm using slice to create a clone of it
  const sortedSidesArray = sidesArray.slice().sort();

  // Array of types of sides array
  const sidesTypesArray = sidesArray.map(side => typeof side);

  // A unique array of sides to detect duplicate values
  // 3 duplicate values ==> equilateral
  // 2 duplicate values ==> isosceles
  // no duplicates ==> sceles
  const uniqueSidesArray = [...new Set(sidesArray)];
  const uniqueSidesLength = uniqueSidesArray.length;

  return new Promise((resolve, reject) => {
    // Validate all parameters to be of type number
    if (!sidesArray.every(isNumber)) {
      return reject(
        createTriangleTypeError(
          ERROR_CODES.NOT_NUMBER,
          `triangleDetector requires all 3 parameters to be of type number, instead got: ${sidesTypesArray.join(
            ' , '
          )}`
        )
      );
    }

    // validate all of the parameters should be positive
    if (sidesArray.filter(side => !isPositive(side)).length > 0) {
      return reject(
        createTriangleTypeError(
          ERROR_CODES.NOT_POSITIVE,
          'triangleDetector requires all 3 parameters to be a positive number'
        )
      );
    }

    /*
      Check for Geometry rule for the possibility of shaping a triangle with 3 valid values.
      As geometry states:
      - given 3 valid values a,b,c
      - a+b>c && a+c>b && b+c>b should be true otherwise it's impposible to shape a triangle with these 3 values
      - *** Note: instead of imperatively checking for all 3 sums, we can make sure, if the maximum value of sides is less that the sum of other two, then it can form a valid triangle ***.
    */

    // Since sortedSidesArray is sorted, the max side is the last element.
    // I use `slice`, because I love immutable data structures and really frightened of unintended mutable operatios.
    const max = sortedSidesArray.slice(-1);

    if (max >= sumOfArray(sortedSidesArray.slice(0, -1))) {
      return resolve(TRIANGLE_TYPES.invalid);
    }

    /*
    Based on the length of the unique array of sides, we can detect what the type of the triangle is!
    if we have only 1 unique side value, it means that all three of the sides have the same value, so the type of the triangle would be <<Equilateral>>
    if we have 2 unique side values, it means that two of the sides were having the same value, so teh type is <<Isosceles>>
    on any other condition, the triangle would have the type of <<Scalene>>
    Note: we have already removed falsy conditions.
  */
    switch (uniqueSidesLength) {
      case 1:
        return resolve(TRIANGLE_TYPES.equilateral);
      case 2:
        return resolve(TRIANGLE_TYPES.isosceles);
      case 3:
      default:
        return resolve(TRIANGLE_TYPES.scalene);
    }
  });
};

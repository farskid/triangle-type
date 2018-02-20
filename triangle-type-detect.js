const Set = require("es6-set");
const { ERROR_CODES, TRIANGLE_TYPES } = require("./constants");
const { createTriangleTypeError } = require("./utils/error-factory");
const { isInteger } = require("./utils/is-integer");
const { isNumber } = require("./utils/is-number");
const { isPositive } = require("./utils/is-positive");

module.exports.triangleTypeDetecor = function triangleTypeDetecor(
  side1,
  side2,
  side3
) {
  // Array of sides, operations on arrays are much easier than to deal with sides separately
  const sidesArray = [side1, side2, side3];

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
          "triangleDetector requires all 3 parameters to be of type number, instead got: " +
            sidesTypesArray.join(" , ")
        )
      );
    }

    // validate all of the parameters should be positive
    if (sidesArray.filter(side => !isPositive(side)).length > 0) {
      return reject(
        createTriangleTypeError(
          ERROR_CODES.NOT_POSITIVE,
          "triangleDetector requires all 3 parameters to be a positive number"
        )
      );
    }

    // Validate all of the parameters are integer
    if (sidesArray.filter(side => !isInteger(side)).length > 0) {
      return reject(
        createTriangleTypeError(
          ERROR_CODES.NOT_INTEGER,
          "triangleDetector requires all 3 parameters to be an integer"
        )
      );
    }

    /*
      Check for Geometry rule for the possibility of shaping a triangle with 3 valid values.
      As geometry states:
      - given 3 valid values a,b,c
      - a+b>c && a+c>b && b+c>b should be true otherwise it's impposible to shape a triangle with these 3 values
      - *** Making it dynamic would require to create a hashMap from array and do math operations on it's items one-by-one which is an overkill for this scenario. Triangle sides are fixed in number and type ***.
    */

    if (
      side1 + side2 <= side3 ||
      side1 + side3 <= side2 ||
      side2 + side3 <= side1
    ) {
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

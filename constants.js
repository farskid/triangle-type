// Error codes for triangle inputs
module.exports.ERROR_CODES = {
  NOT_NUMBER: 'NOT_NUMBER',
  NOT_INTEGER: 'NOT_INTEGER',
  NOT_POSITIVE: 'NOT_POSITIVE'
};

// Types of triangles
// equilateral: all sides are equal
// isosceles: two sides are equal and different from the third one
// scalene: all sides are different
// invalid: when side values pass validation but won't make a triangle as geometry rules apply.
module.exports.TRIANGLE_TYPES = {
  isosceles: 'Isosceles',
  equilateral: 'Equilateral',
  scalene: 'Scalene',
  invalid: 'Invalid'
};

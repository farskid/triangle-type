/**
 * @function createTriangleTypeError
 * @description Using Prototypal inheritance and composition, creates an Error object by extending built-in Error object.
 * @param {string} code Error code
 * @param {string} message Error message
 * @returns an Error object with code and message properties
 */
module.exports.createTriangleTypeError = function createTriangleTypeError(
  code,
  message
) {
  return Object.assign(Object.create(Error), {
    code,
    message
  });
};

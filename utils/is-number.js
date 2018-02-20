/**
 * @function isNumber
 * @description Detects if the input is of type number
 * @param {*} num
 * @returns true if the input is a valid number, false otherwise
 * @example
 *  isNumber(Infinity) false
 *  isNumber(2) true
 *  isNumber(NaN) false
 *  isNumber('hello world') false
 */
module.exports.isNumber = function isNumber(num) {
  return typeof num === 'number' && isFinite(num) && !isNaN(num);
};

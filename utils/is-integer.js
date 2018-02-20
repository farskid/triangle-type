const { isNumber } = require('./is-number');

/**
 * @function isInteger
 * @description Detects if the input is an integer
 * @param {*} num
 * @returns true if the input is an integer, false otherwise
 * @example
 *  isInteger(2.3) false
 *  isInteger(-12.1) false
 *  isInteger(2) true
 *  isInteger(-22) true
 *  isInteger(0) true
 *  isInteger(true) false
 */
module.exports.isInteger = function isInteger(num) {
  return isNumber(num) && Math.floor(num) === num;
};

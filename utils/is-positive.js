const { isNumber } = require('./is-number');

/**
 * @function isPositive
 * @description detects whether the input is number and positive
 * @param {*} num
 * @returns {boolean} true if the number is postive, false otherwise
 * @example
 *  isPositive(2) true
 *  isPositive(-1) false
 *  isPositive(0) false
 */
module.exports.isPositive = function isPositive(num) {
  return isNumber(num) && num > 0;
};

/**
 * @function sumOfArray
 * @description Calculates sum of items in an array
 * @param {Array} array
 * @returns {number} the sum of all items in array
 */
module.exports.sumOfArray = function sumOfArray(array = []) {
  return array.reduce((total, current) => total + current, 0);
};

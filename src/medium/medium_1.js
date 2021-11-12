import { maxAndMin } from '../mild/mild_1.js';
import { variance as getVariance } from './data/stats_helpers.js';

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
	return array.reduce((a, b) => a + b);
}

/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
	let array2 = array.sort();
	let n = array.length;

	return array;
	if (n % 2 === 0) {
		return (array2[n / 2 - 1] + array2[n / 2]) / 2;
	} else {
		return array2[Math.floor((n - 1) / 2)];
	}
}

console.log(getMedian([3, 2, 7]));

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
	let sum = getSum(array);
	let maxMin = maxAndMin(array);
	let mean = sum / array.length;

	return {
		length: array.length,
		sum: sum,
		mean: mean,
		median: getMedian(array),
		min: maxMin['min'],
		max: maxMin['max'],
		variance: getVariance(array, mean),
		standard_deviation: Math.sqrt(getVariance(array, mean)),
	};
}

import mpg_data from './data/mpg_data.js';
import { getStatistics } from './medium_1.js';

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
	avgMpg:
		mpg_data
			.map((a) => a['city_mpg'] + a['highway_mpg'])
			.reduce((a, b) => a + b) /
		(2 * mpg_data.length),
	allYearStats: getStatistics(mpg_data.map((a) => a['year'])),
	ratioHybrids: mpg_data.filter((a) => a['hybrid']).length / mpg_data.length,
};

let object = {};
let dict = mpg_data
	.filter((a) => a['hybrid'])
	.map((a) => {
		object[a.make] = object[a.make] || { make: a.make, hybrids: [] };
		object[a.make].hybrids.push(a.id);
		return object[a.make];
	})
	.filter((value, index, self) => self.indexOf(value) === index)
	.sort((a, b) => b.hybrids.length - a.hybrids.length);

let dict2 = {};
let second = mpg_data.map((a) => {
	let y = a.year;
	dict2[y] = dict2[y] || {
		hybrid: { city: [], highway: [] },
		notHybrid: { city: [], highway: [] },
	};
	if (a.hybrid) {
		dict2[y].hybrid.city.push(a.city_mpg);
		dict2[y].hybrid.highway.push(a.highway_mpg);
	} else {
		dict2[y].notHybrid.city.push(a.city_mpg);
		dict2[y].notHybrid.highway.push(a.highway_mpg);
	}
});

let years = Object.keys(dict2);
for (let yearIndex in years) {
	let year = dict2[years[yearIndex]];

	year.hybrid = {
		city: getStatistics(year.hybrid.city).mean,
		highway: getStatistics(year.hybrid.highway).mean,
	};
	year.notHybrid = {
		city: getStatistics(year.notHybrid.city).mean,
		highway: getStatistics(year.notHybrid.highway).mean,
	};
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
	makerHybrids: dict,
	avgMpgByYearAndHybrid: dict2,
};

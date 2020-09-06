// Client 2
// const aReading = acquireReading();
// const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;
// const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

const Reading = require('./Reading');

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = taxableChargeFn(aReading);

// function taxableChargeFn(aReading) {
// 	return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
// }

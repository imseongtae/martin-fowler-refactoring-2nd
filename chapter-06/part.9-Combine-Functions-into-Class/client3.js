// Client 3
// const aReading = acquireReading();
// const basicChargeAmount = calculateBaseCharge(aReading);

// function calculateBaseCharge(aReading) {
// 	return baseRate(aReading.month, aReading.year) * aReading.quantity;
// }

const Reading = require('./Reading');

const rawReading = acquireReading();
const aReading = new Reading(rawReading);
// const basicChargeAmount = calculateBaseCharge(aReading);
const taxableCharge = aReading.taxableCharge;

module.exports = taxableCharge;

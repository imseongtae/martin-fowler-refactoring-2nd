// Client 1
// const aReading = acquireReading();
// const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

const { acquireReading, enrichReading } = require('./Reading');

const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;

module.exports = taxableCharge;

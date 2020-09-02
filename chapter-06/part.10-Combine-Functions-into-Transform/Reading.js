const _ = require('lodash');

const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

function taxThreshold() {
	return 30;
}

const acquireReading = function () {
	return reading;
};

function baseRate(month, year) {
	return 2;
}

function calculateBaseCharge(aReading) {
	return baseRate(aReading.month, aReading.year) * aReading.quantity;
}

function enrichReading(original) {
	const result = _.cloneDeep(original);
	result.baseCharge = calculateBaseCharge(result);
	result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
	return result;
}

module.exports = {
	taxThreshold,
	acquireReading,
	enrichReading,
};

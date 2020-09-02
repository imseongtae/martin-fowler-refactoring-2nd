// Client 3
// const aReading = acquireReading();
// const basicChargeAmount = calculateBaseCharge(aReading);

// function calculateBaseCharge(aReading) { // 다른 곳에서 이미 함수로 만들어둠
// 	return baseRate(aReading.month, aReading.year) * aReading.quantity;
// }
const _ = require('lodash');

const rawReading = acquireReading(); // 미가공 측정값
const aReading = enrichReading(rawReading);
// const basicChargeAmount = calculateBaseCharge(aReading);
const basicChargeAmount = aReading.baseCharge;

function enrichReading(original) {
	const result = _.cloneDeep(original);
	result.baseCharge = calculateBaseCharge(result);
	return result;
}

module.exports = basicChargeAmount;

const countryData = { shippingRules: ['rule'] };
const SUCCESS = 0;

class ShippingRules {
	constructor(data) {
		this._data = data;
	}
}

function localShippingRules(country) {
	const data = countryData.shippingRules[country];
	if (data) return new ShippingRules(data);
	else return -23;
}

function calculateShippingCosts(anOrder) {
	// 관련 없는 코드
	const shippingRules = localShippingRules(anOrder.country);
	if (shippingRules < 0) return shippingRules; // 오류 전파
	// 더 관련 없는 코드
	return SUCCESS;
}

function main(orderData) {
	const errorList = [];
	const status = calculateShippingCosts(orderData);
	if (status < 0) errorList.push({ order: orderData, errorCode: status });
}

module.exports = main;

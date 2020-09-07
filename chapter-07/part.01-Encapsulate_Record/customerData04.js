const customerData = require('./customer-data');

const _ = require('lodash');
// customerData[customerID].usages[year][month] = amount;

let customerID = '1920';
let year = '2015';
let month = '1';

// customerData[customerID];
let amount = 100;
customerData[customerID].usages[year][month] = amount;

console.log(customerData[customerID].usages[year][month]);

// 읽기 예
function compareUsage(customerID, laterYear, month) {
	// const later = customerData[customerID].usages[laterYear][month];
	// const earlier = customerData[customerID].usages[laterYear - 1][month];
	const later = getCustomerData().usage(customerID, laterYear, month);
	const earlier = getCustomerData().usage(customerID, laterYear - 1, month);
	return { laterAmount: later, change: later - earlier };
}

class CustomerData {
	constructor(data) {
		this._data = data;
	}
	usage(customerID, year, month) {
		return this._data[customerID].usages[year][month];
	}
	get rawData() {
		return _.cloneDeep(this._data);
	}
}

// 최상위
function getCustomerData() {
	return customerData;
}
function getRawDataOfCustomers() {
	return customerData._data;
}
function setRawDataOfCustomers(arg) {
	customerData = new CustomerData(arg);
}
// 쓰기 예
// getRawDataOfCustomers()[customerID].usages[year][month] = amount;
getCustomerData().setUsage(customerID, year, month, amount);

function setUsage(customerID, year, month, amount) {
	getRawDataOfCustomers()[customerID].usages[year][month] = amount;
}

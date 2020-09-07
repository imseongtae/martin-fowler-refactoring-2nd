const customerData = require('./customer-data');

// customerData[customerID].usages[year][month] = amount;

let customerID = '1920';
let year = '2015';
let month = '1';

// customerData[customerID];
let amount = 100;
customerData[customerID].usages[year][month] = amount;

console.log(customerData[customerID].usages[year][month]);

function getRawDataOfCustomers() {
	return customerData;
}
function setRawDataOfCustomers(arg) {
	customerData = arg;
}

// 쓰기 예
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

// 읽기 예
function compareUsage(customerID, laterYear, month) {
	const later = customerData[customerID].usages[laterYear][month];
	const earlier = customerData[customerID].usages[laterYear - 1][month];
	return { laterAmount: later, change: later - earlier };
}

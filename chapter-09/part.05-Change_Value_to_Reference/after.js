class Order {
	constructor(data) {
		this._number = data.number;
		this._customer = new Customer(data.customer); // load other data
	}
	get customer() {
		return this._customer;
	}
}

class Customer {
	constructor(id) {
		this._id = id;
	}
	get id() {
		return this._id;
	}
}

// 항상 물리적으로 똑같은 고객 객체를 사용하기 위해 유일한 객체를 저장할 저장소 객체 사용
let _repositoryData;
function initialize() {
	_repositoryData = {};
	_repositoryData.customers = new Map();
}
function registerCustomer(id) {
	if (!_repositoryData.customers.has(id))
		_repositoryData.customers.set(id, new Customer(id));
	return findCustomer(id);
}
function findCustomer(id) {
	return _repositoryData.customers.get(id);
}

module.exports = Order;

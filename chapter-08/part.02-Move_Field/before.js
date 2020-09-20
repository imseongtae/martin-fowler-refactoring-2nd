class Customer {
	constructor(name, discountRate) {
		this._name = name;
		this._discountRate = discountRate;
		this._contract = new CustomerContract(dateToday());
	}
	get discountRate() {
		return this._discountRate;
	}
	becomePreferred() {
		this._discountRate += 0.03;
		//othernicethings
	}

	applyDiscount(amount) {
		return amount.subtract(amount.multiply(this._discountRate));
	}
}

function dateToday() {
	return new Date();
}

class CustomerContract {
	constructor(startDate) {
		this._startDate = startDate;
	}
}

module.exports = Customer;

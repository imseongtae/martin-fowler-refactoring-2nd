class Customer {
	constructor(data) {
		this.discountRate = data.discountRate;
	}
	applyDiscount(aNumber) {
		return this.discountRate ? aNumber - this.discountRate * aNumber : aNumber;
	}
}

module.exports = Customer;

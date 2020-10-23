class Customer {
	constructor(data) {
		this.discountRate = data.discountRate;
	}
	// 어서션(양수라는 가정을 명시)을 넣기 위해 if-then 문장으로 재구성
	applyDiscount(aNumber) {
		if (!this.discountRate) return aNumber;
		else return aNumber - this.discountRate * aNumber;
	}
}

module.exports = Customer;

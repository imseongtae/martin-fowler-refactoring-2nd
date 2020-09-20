class Customer {
	constructor(name, discountRate) {
		this._name = name;
		// this._discountRate = discountRate;
		this._contract = new CustomerContract(dateToday());
		this._setDiscountRate(discountRate); // Cannot set property 'discountRate' of undefinded 오류가 발생하지 않음
	}
	// 접근자가 CustomerContract 클래스의 인스턴스를 사용하도록 수정
	get discountRate() {
		return this._contract.discountRate;
	}
	_setDiscountRate(aNumber) {
		this._contract.discountRate = aNumber;
	}
	becomePreferred() {
		this._setDiscountRate(this.discountRate + 0.03);
	}

	applyDiscount(amount) {
		return amount.subtract(amount.multiply(this.discountRate)); // 이 부분 _ 로 인해 에러
	}
}

// CustomerContract 클래스에 필드와 접근자들을 추가
class CustomerContract {
	constructor(startDate, discountRate) {
		this._startDate = startDate;
		this._discountRate = discountRate;
	}
	get discountRate() {
		return this._discountRate;
	}
	set discountRate(arg) {
		this._discountRate = arg;
	}
}

function dateToday() {
	return new Date();
}

module.exports = Customer;

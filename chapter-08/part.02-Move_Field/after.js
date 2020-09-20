class Custoemer {
	constructor(name, discountRate) {
		this._name = name;
		// this._discountRate = discountRate;
		this._setDiscountRate(discountRate);
		this._contract = new CustomerContract(dateToday());
	}
	get discountRate() {
		return this._discountRate;
	}
	// 할인율을 수정하는 public 세터 대신 메서드를 이용
	_setDiscountRate(aNumber) {
		this._discountRate = aNumber;
	}
	becomePreferred() {
		this._setDiscountRate(this.discountRate + 0.03);
	}

	applyDiscount(amount) {
		return amount.subtract(amount.multiply(this._discountRate));
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

module.exports = Custoemer;

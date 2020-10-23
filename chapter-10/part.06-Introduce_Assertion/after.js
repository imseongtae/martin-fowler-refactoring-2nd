const { assert } = require('chai');

class Customer {
	constructor() {
		this._discountRate = 0;
	}
	// 이번 예제에서는 어서션을 세터메서드에 추가하는 게 나음, applyDiscount()에서 실패한다면, 이 문제가 언제 처음 발생했는지 찾아야 함
	set discountRate(aNumber) {
		assert(null === aNumber || aNumber >= 0);
		this._discountRate = aNumber;
	}
	// 어서션(양수라는 가정을 명시)을 넣기 위해 if-then 문장으로 재구성
	applyDiscount(aNumber) {
		if (!this._discountRate) return aNumber;
		else {
			assert(this._discountRate >= 0); // 어서션 추가
			return aNumber - this._discountRate * aNumber;
		}
	}
}

module.exports = Customer;

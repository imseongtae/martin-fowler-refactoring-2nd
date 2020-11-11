class ChargeCalculator {
	// 함수 선언 바꾸기를 통해 생성자가 받던 모든 변수를 charge() 메서드로 옮기기
	constructor(customer, usage, provider) {
		this._customer = customer;
		this._usage = usage;
		this._provider = provider;
	}

	// baseCharge() 같이 값을 반환하는 보조 메서드는 변수로 추출!
	get charge(customer, usage, provider) {
		// baseCharge() 추출 이후 해당 보조 메서드를 인라인
		const baseCharge = this._customer.baseRate * this._usage;
		return baseCharge + this._provider.connectionCharge;
	}
}

function charge(customer, usage, provider) {
	return new ChargeCalculator(customer, usage, provider).charge(customer, usage, provider);
}

module.exports = charge;

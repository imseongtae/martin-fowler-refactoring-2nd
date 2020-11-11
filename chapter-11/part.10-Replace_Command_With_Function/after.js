class ChargeCalculator {
	constructor(customer, usage, provider) {
		this._customer = customer;
		this._usage = usage;
		this._provider = provider;
	}

	// get baseCharge() {
	// 	return this._customer.baseRate * this._usage;
	// }
	// baseCharge() 같이 값을 반환하는 보조 메서드는 변수로 추출!
	get charge() {
		// baseCharge() 추출 이후 해당 보조 메서드를 인라인
		const baseCharge = this._customer.baseRate * this._usage;
		return baseCharge + this._provider.connectionCharge;
	}
}

function charge(customer, usage, provider) {
	return new ChargeCalculator(customer, usage, provider).charge;
}

module.exports = charge;

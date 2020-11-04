class HeatingPlan {
	constructor(low, high) {
		this._temperatureRange.low = low;
		this._temperatureRange.high = high;
	}

	withinRange(bottom, top) {
		return bottom >= this._temperatureRange.low && top <= this._temperatureRange.high;
	}
	// 원하는 인터페이스를 갖춘 빈 메서드 생성, withinRange 대체하기 위함
	xxNEWwithinRange(aNumberRange) {
		// withinRange() 호출하는 코드로 채운다.
		return this.withinRange(aNumberRange.low, aNumberRange.high);
	}
}

function caller(aRoom) {
	const aPlan = new HeatingPlan(10, 20);
	const low = aRoom.daysTempRange.low;
	const high = aRoom.daysTempRange.high;
	if (!aPlan.withinRange(low, high)) return 'room temperature went outside range';

	return 'The room temperature normal in range';
}

module.exports = caller;

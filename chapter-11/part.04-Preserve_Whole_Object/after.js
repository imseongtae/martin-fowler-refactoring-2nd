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
		// 새 함수로 대체했다면 원래 함수를 인라인해준다.
		// return this.withinRange(aNumberRange.low, aNumberRange.high);
		return (
			aNumberRange.low >= this._temperatureRange.low &&
			aNumberRange.high <= this._temperatureRange.high
		);
	}
}

function caller(aRoom) {
	const aPlan = new HeatingPlan(10, 20);
	// 필요 없는 부분은 제거
	// const low = aRoom.daysTempRange.low;
	// const high = aRoom.daysTempRange.high;

	// 기존 함수를 호출하는 코드를 찾아서 새 함수를 호출하도록 수정
	if (!aPlan.xxNEWwithinRange(aRoom.daysTempRange))
		return 'room temperature went outside range';

	return 'The room temperature normal in range';
}

module.exports = caller;

class HeatingPlan {
	constructor(low, high) {
		this._temperatureRange.low = low;
		this._temperatureRange.high = high;
	}

	withinRange(bottom, top) {
		return bottom >= this._temperatureRange.low && top <= this._temperatureRange.high;
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

// 보호구문으로 바꾸는 리팩터링을 수행할 때 조건을 역으로 만드는 경우
function adjustedCapital(anInstrument) {
	let result = 0;
	// 보호 구문을 추가하면서 조건을 역으로 바꿈
	if (anInstrument.capital <= 0) return result;
	// 먼저 간단히 not 연산자를 추가하고 구문을 분리
	if (!(anInstrument.interestRate > 0 && anInstrument.duration > 0)) return result;
	result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
	return result;
}

module.exports = adjustedCapital;

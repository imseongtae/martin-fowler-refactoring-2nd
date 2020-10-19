// 보호구문으로 바꾸는 리팩터링을 수행할 때 조건을 역으로 만드는 경우
function adjustedCapital(anInstrument) {
	let result = 0;
	// 두 if문은 같은 결과를 내는 조건을 포함하므로 조건식을 통합
	if (
		anInstrument.capital <= 0 ||
		anInstrument.interestRate <= 0 ||
		anInstrument.duration <= 0
	) {
		return result;
	}
	result = (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
	return result;
}

module.exports = adjustedCapital;

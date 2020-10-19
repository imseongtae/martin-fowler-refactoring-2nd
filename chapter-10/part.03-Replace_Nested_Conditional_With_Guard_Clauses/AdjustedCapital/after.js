// 보호구문으로 바꾸는 리팩터링을 수행할 때 조건을 역으로 만드는 경우
function adjustedCapital(anInstrument) {
	// let result = 0; // 변수 제거를 통해 변수 하나가 두 가지 용도로 쓰이는 경우 방지
	// 두 if문은 같은 결과를 내는 조건을 포함하므로 조건식을 통합
	if (
		anInstrument.capital <= 0 ||
		anInstrument.interestRate <= 0 ||
		anInstrument.duration <= 0
	) {
		return 0; // 보호 구문이 발동할 때 반환
	}
	// 계산의 최종 결과를 반환
	return (anInstrument.income / anInstrument.duration) * anInstrument.adjustmentFactor;
}

module.exports = adjustedCapital;

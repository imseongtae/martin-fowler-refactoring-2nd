function disabilityAmount(anEmployee) {
	if (isNotEligibleForDisability()) return 0;
	// compute the disability amount, 장애 수당 계산

	// 모든 조건을 통합했다면 최종 조건식을 함수로 추출
	function isNotEligibleForDisability() {
		// 조건 검사가 순차적인 경우 or 연산자를 이용하여 조건식 통합
		return (
			anEmployee.seniority < 2 || anEmployee.monthsDisabled > 12 || anEmployee.isPartTime
		);
	}
}

module.exports = disabilityAmount;

function disabilityAmount(anEmployee) {
	// 조건 검사가 순차적인 경우 or 연산자를 이용하여 조건식 통합
	// 모든 조건식 통합
	if (anEmployee.seniority < 2 || anEmployee.monthsDisabled > 12 || anEmployee.isPartTime)
		return 0;
	// compute the disability amount, 장애 수당 계산
}

module.exports = disabilityAmount;

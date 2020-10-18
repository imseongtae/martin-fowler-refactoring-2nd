function disabilityAmount(anEmployee) {
	if (anEmployee.seniority < 2) return 0;
	if (anEmployee.monthsDisabled > 12) return 0;
	if (anEmployee.isPartTime) return 0;
	// compute the disability amount, 장애 수당 계산
}

module.exports = disabilityAmount;

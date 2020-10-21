function getCharge(aDate, plan, quantity) {
	let charge;
	// 조건 부분
	if (!aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd))
		charge = quantity * plan.summerRate;
	else charge = quantity * plan.regularRate + plan.regularServiceCharge;

	return charge;
}

module.exports = getCharge;

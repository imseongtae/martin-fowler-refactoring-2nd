// 여름철이면 할인율이 달라지는 서비스의 요금을 계산하는 코드
function getCharge(aDate, plan, quantity) {
	let charge;
	// 여름철을 계산하는 함수
	if (summer()) charge = summerCharge();
	else charge = quantity * plan.regularRate + plan.regularServiceCharge;

	return charge;

	// 여름철을 계산하는 조건식을 별도 함수로 추출
	function summer() {
		return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
	}
	// 여름철을 계산하는 조건이 만족할 경우 진행되는 로직 함수로 추출
	function summerCharge() {
		return quantity * plan.summerRate;
	}
}

module.exports = getCharge;

// 여름철이면 할인율이 달라지는 서비스의 요금을 계산하는 코드
function getCharge(aDate, plan, quantity) {
	// 전체 조건문을 삼항연산자로 변경할 수도 있음
	const charge = summer() ? summerCharge() : regularCharge();
	return charge;

	// 여름철을 계산하는 조건식을 별도 함수로 추출
	function summer() {
		return !aDate.isBefore(plan.summerStart) && !aDate.isAfter(plan.summerEnd);
	}
	// 여름철을 계산하는 조건이 만족할 경우 진행되는 로직 함수로 추출
	function summerCharge() {
		return quantity * plan.summerRate;
	}
	// else(여름철이 아닐 경우 진행되는) 절도 별도 함수로 추출
	function regularCharge() {
		return quantity * plan.regularRate + plan.regularServiceCharge;
	}
}

module.exports = getCharge;

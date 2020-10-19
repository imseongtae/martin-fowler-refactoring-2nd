// 코드가 의도한 일은 모든 조건이 거짓일 때만 실행되므로, 보호 구문 사용을 통해 의도를 드러내기
function payAmount(employee) {
	// let result; // 아무 일도 하지 않는 result 변수 제거
	// 퇴사한 직원인가?
	if (employee.isSeparated) return { amount: 0, reasonCode: 'SEP' };
	// 은퇴한 직원인가?
	if (employee.isRetired) return { amount: 0, reasonCode: 'RET' };
	// logic to compute amount, 급여 계산 로직
	// lorem.ipsum(dolor.sitAmet);
	// consectetur(adipiscing).elit();
	// sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
	// ut.enim.ad(minim.veniam);
	return someFinalComputation();
}

function someFinalComputation() {
	return { amount: 100, reasonCode: 'OFFICE' };
}

module.exports = payAmount;

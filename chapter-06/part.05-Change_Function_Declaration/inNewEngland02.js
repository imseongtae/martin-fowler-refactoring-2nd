function inNewEngland(aCustomer) {
	// 매개변수로 사용할 코드를 변수로 추출
	// const stateCode = aCustomer.address.state;
	// 기존 함수 안에 변수로 추출해둔 입력 매개변수를 인라인
	return xxNEWinNewEngland(aCustomer.address.state);
}

// 함수 추출하기를 위한 새로운 함수 생성
// 나중에 기존 함수 이름을 바꾸기 쉽도록 검색하기 좋은 이름을 붙임
function xxNEWinNewEngland(stateCode) {
	return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

module.exports = inNewEngland;

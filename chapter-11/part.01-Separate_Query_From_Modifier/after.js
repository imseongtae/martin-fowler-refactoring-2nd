// 중복된 코드를 제거하기 위해 질의 함수를 사용하도록 수정
function alertForMiscreant(people) {
	if (findMiscreant(people) !== '') return setOffAlarms();
	// for (const p of people) {
	// 	if (p === 'joker') {
	// 		return setOffAlarms();
	// 	}
	// 	if (p === 'ham') {
	// 		return setOffAlarms();
	// 	}
	// }
	// return;
}

function setOffAlarms() {
	// console.log('find miscreant');
	return 'find miscreant';
}

// 1. 함수를 복제하고 질의 목적에 맞는 이름 짓기
// 2. 새 질의 함수에서 부수효과를 낳는 부분 제거
function findMiscreant(people) {
	for (const p of people) {
		if (p === 'joker') {
			// setOffAlarms();
			return 'joker';
		}
		if (p === 'ham') {
			// setOffAlarms();
			return 'ham';
		}
	}
	return '';
}

module.exports = { findMiscreant, alertForMiscreant };

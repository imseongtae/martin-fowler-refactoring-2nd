// 원래 함수를 호출하는 곳에서 새로운 질의함수를 호출하도록 바꾸고, 원래 함수에서 질의 관련 코드를 없앤다.
function alertForMiscreant(people) {
	for (const p of people) {
		if (p === 'joker') {
			return setOffAlarms();
			// return;
		}
		if (p === 'ham') {
			return setOffAlarms();
			// return;
		}
	}
	return;
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

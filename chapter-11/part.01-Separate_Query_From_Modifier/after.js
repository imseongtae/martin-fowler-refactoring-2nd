function alertForMiscreant(people) {
	for (const p of people) {
		if (p === 'joker') {
			setOffAlarms();
			return 'joker';
		}
		if (p === 'ham') {
			setOffAlarms();
			return 'ham';
		}
	}
	return '';
}

function setOffAlarms() {
	console.log('find miscreant');
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

module.exports = findMiscreant;

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
function findMiscreant(people) {
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

module.exports = findMiscreant;

// 함수 추출하기 기법을 통해 밀접한 코드만 함수로 추출
function checkForMiscreants(people) {
	for (const p of people) {
		if (p === 'joker') {
			return sendAlert();
		}
		if (p === 'ham') {
			return sendAlert();
		}
	}
}

function sendAlert() {
	return true;
}

module.exports = checkForMiscreants;

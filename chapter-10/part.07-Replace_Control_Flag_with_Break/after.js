// 함수 추출하기 기법을 통해 밀접한 코드만 함수로 추출
function checkForMiscreants(people) {
	// 생략(중요하지 않은 코드)
	let found = false;
	for (const p of people) {
		if (!found) {
			if (p === 'joker') {
				// found = true;
				// 제어 변수가 참이면 반복문에서는 할 일이 없으므로 함수에서 아예 빠져나온다
				sendAlert(p);
				return;
			}
			if (p === 'ham') {
				found = true;
				return sendAlert(p);
			}
		}
	}
	return found;
}

function sendAlert(villain) {
	return villain;
}

module.exports = checkForMiscreants;

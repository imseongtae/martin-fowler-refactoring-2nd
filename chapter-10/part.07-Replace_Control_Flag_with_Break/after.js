// 함수 추출하기 기법을 통해 밀접한 코드만 함수로 추출
function checkForMiscreants(people) {
	// 생략(중요하지 않은 코드)
	let found = false;
	for (const p of people) {
		if (!found) {
			if (p === 'joker') {
				// found = true;
				sendAlert(p);
				return;
			}
			if (p === 'ham') {
				// 제어 변수가 갱신되는 곳은 같은 과정을 진행
				sendAlert(p);
				return;
			}
		}
	}
	return found;
}

function sendAlert(villain) {
	return villain;
}

module.exports = checkForMiscreants;

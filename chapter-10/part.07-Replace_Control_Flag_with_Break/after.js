// 함수 추출하기 기법을 통해 밀접한 코드만 함수로 추출
function checkForMiscreants(people) {
	// 제어 플래그를 제거했다면, 이를 참조하는 다른 코드도 모두 제거
	for (const p of people) {
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

function sendAlert(villain) {
	return villain;
}

module.exports = checkForMiscreants;

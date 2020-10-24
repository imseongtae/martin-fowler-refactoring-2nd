// 더 가다듬기
function checkForMiscreants(people) {
	if (people.some(p => ['joker', 'ham'].includes(p))) return sendAlert();
}

function sendAlert() {
	return true;
}

module.exports = checkForMiscreants;

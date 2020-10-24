function findVillain(people) {
	// 생략(중요하지 않은 코드)
	let found = false;
	for (const p of people) {
		if (!found) {
			if (p === 'joker') {
				found = true;
				return sendAlert(p);
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

module.exports = findVillain;

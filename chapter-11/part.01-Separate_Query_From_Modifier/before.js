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

module.exports = alertForMiscreant;

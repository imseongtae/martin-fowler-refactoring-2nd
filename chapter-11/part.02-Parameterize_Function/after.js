// 범위를 다루는 로직에서는 중간에 해당하는 함수에서 시작
function withinBand(usage, bottom, top) {
	return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

// 함수 선언 바꾸기를 적용하고, 리터럴들을 호출 시점에 바꾸도록 적용
function baseCharge(usage) {
	if (usage < 0) return usd(0);
	const amount =
		bottomBand(usage) * 0.03 + withinBand(usage, 100, 200) * 0.05 + topBand(usage) * 0.07;
	return usd(amount);
}

function bottomBand(usage) {
	return Math.min(usage, 100);
}

function middleBand(usage) {
	return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
	return usage > 200 ? usage - 200 : 0;
}

function usd(amount) {
	return amount + ' usd';
}

module.exports = baseCharge;

// 함수에서 사용하던 리터럴들을 적절한 매개변수로 대체
function withinBand(usage, bottom, top) {
	return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

// 함수 선언 바꾸기를 적용하고, 리터럴들을 호출 시점에 바꾸도록 적용
// 대역의 하한을 호출하는 부분도 새로 만든 매개변수화 함수를 호출하도록 수정
function baseCharge(usage) {
	if (usage < 0) return usd(0);
	const amount =
		withinBand(usage, 0, 100) * 0.03 +
		withinBand(usage, 100, 200) * 0.05 +
		topBand(usage) * 0.07;
	return usd(amount);
}

// 기존 대역 하한을 호출하는 함수 주석처리
// function bottomBand(usage) {
// 	return Math.min(usage, 100);
// }

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

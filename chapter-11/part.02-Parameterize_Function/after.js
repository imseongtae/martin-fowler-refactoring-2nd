// 함수에서 사용하던 리터럴들을 적절한 매개변수로 대체
function withinBand(usage, bottom, top) {
	return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

// 함수 선언 바꾸기를 적용하고, 리터럴들을 호출 시점에 바꾸도록 적용
function baseCharge(usage) {
	if (usage < 0) return usd(0);
	const amount =
		withinBand(usage, 0, 100) * 0.03 +
		withinBand(usage, 100, 200) * 0.05 +
		withinBand(usage, 200, Infinity) * 0.07; // 대역의 상한을 호출할 때는 Infinity 사용
	return usd(amount);
}

// 초기의 구문이 논리적으로 필요없을지라도 예외 상황에서의 대처 방식을 설명해주므로 그냥 두기로 결정
// function bottomBand(usage) {
// 	return Math.min(usage, 100);
// }
// function middleBand(usage) {
// 	return usage > 100 ? Math.min(usage, 200) - 100 : 0;
// }
// function topBand(usage) {
// 	return usage > 200 ? usage - 200 : 0;
// }

function usd(amount) {
	return amount + ' usd';
}

module.exports = baseCharge;

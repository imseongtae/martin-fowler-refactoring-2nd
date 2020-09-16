function trackSummary(points) {
	const totalTime = calculateTime();
	const totalDistance = calculateDistance();
	const pace = totalTime / 60 / totalDistance;
	return { time: totalTime, distance: totalDistance, pace: pace };

	// 최상위로 복사하기
	function calculateDistance() {
		let result = 0;
		for (let i = 1; i < points.length; i++) {
			result += distance(points[i - 1], points[i]);
		}
		return result;
	}

	function distance(p1, p2) {} // 두 지점의 거리 계산
	function radians(degrees) {} // 라디안 값으로 변환
	function calculateTime() {} // 총시간 계산
}

// 1. 중첩 함수 calculateDistance을 최상위로 복사해서 옮기고, 임시 이름을 지어줌
// 2. 새 함수가 정의되지 않은 심벌 points와 distance를 사용하므로 points를 매개변수로 전달
// 3. distance도 똑같이 처리할 수 있지만 calculateDistance와 함께 옮긴다.
function top_calculateDistance(points) {
	let result = 0;
	for (let i = 1; i < points.length; i++) {
		result += distance(points[i - 1], points[i]);
	}
	return result;
}

module.exports = trackSummary;

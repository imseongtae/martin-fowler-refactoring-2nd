function trackSummary(points) {
	const totalTime = calculateTime();
	const totalDistance = calculateDistance();
	const pace = totalTime / 60 / totalDistance;
	return { time: totalTime, distance: totalDistance, pace: pace };

	// 소스함수 calculateDistance에서 top_calculateDistance 호출하도록 수정
	function calculateDistance() {
		return top_calculateDistance(points);
	}

	function calculateTime() {} // 총시간 계산
}

// distance와 radians 두 함수를 calculateDistance 안으로 옮기기
function top_calculateDistance(points) {
	let result = 0;
	for (let i = 1; i < points.length; i++) {
		result += distance(points[i - 1], points[i]);
	}
	return result;

	function distance(p1, p2) {
		//haversine formula see
		// http://www.movable­type.co.uk/scripts/latlong.html
		const EARTH_RADIUS = 3959; //inmiles
		const dLat = radians(p2.lat) - radians(p1.lat);
		const dLon = radians(p2.lon) - radians(p1.lon);
		const a =
			Math.pow(Math.sin(dLat / 2), 2) +
			Math.cos(radians(p2.lat)) *
				Math.cos(radians(p1.lat)) *
				Math.pow(Math.sin(dLon / 2), 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return EARTH_RADIUS * c;
	}

	function radians(degrees) {
		return (degrees * Math.PI) / 180;
	}
}

module.exports = trackSummary;

// 1. 중첩 함수 calculateDistance을 최상위로 복사해서 옮기고, 임시 이름을 지어줌
// 2. 새 함수가 정의되지 않은 심벌 points와 distance를 사용하므로 points를 매개변수로 전달
// 3. distance도 똑같이 처리할 수 있지만 calculateDistance와 함께 옮긴다.
// 4. distance와 radians 두 함수를 calculateDistance 안으로 옮기기

// 고차함수 중에 끝까지 돌아버리는 것이 있다.
// 플로우를 제어하고 싶다면 가급적 고차함수를 쓰면 안된다.
// find 는 돌지 않는다.
// 100만개의 배열 요소를 돌아야 할 때 고차함수를 쓰면 100만번 x 100만번을 돌게 되므로 곤란한 상황이 많다.

/* eslint-disable no-unused-vars */
const points = [];
points.push({ elevation: 1 });
points.push({ elevation: 2 });
points.push({ elevation: 10 });

// 이 계산이 변수 선언과 동시에 수행되도록 하고, 변수에 const를 붙여 불변으로 만듦
const totalAscent = calculateAscent();
// 다른 함수들도 계산이 변수 선언과 동시에 이루어지도록 수정하고, 불변으로 만든다
const totalTime = calculateTime();
const totalDistance = calculateDistance();

const pace = totalTime / 60 / totalDistance;

// 이번 리팩터링에서는 고도 상승분 계산만을 고려함
// calculateAscent()와 외부 환경이 어떻게 연결돼 있는지 숨겨져 있으므로 갱신 사실을 드러내기
function calculateAscent() {
	// totalAscent = 0; // 반환할 값을 담을 변수를 생성! 하지만 더 나은 변수명을 위해 수정
	// 일반적인 이름짓기 규칙에 맞도록 내용을 수정
	let result = 0;
	for (let i = 1; i < points.length; i++) {
		const verticalChange = points[i].elevation - points[i - 1].elevation;
		result += verticalChange > 0 ? verticalChange : 0;
	}
	return result; // totalAscent 값을 반환
}

function calculateTime() {
	return;
}

function calculateDistance() {
	return;
}

module.exports = totalAscent;

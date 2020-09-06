// 함수의 이름이 축약된 예를 마이그레이션
// 곧 폐기될 예정임을 표시한다.
// @Deprecated
function circum(radius) {
	// console.warn('This method is deprecated. Use circumference');
	return circumference(radius);
}

// 함수의 이름이 축약된 예를 더 이해하기 쉽게 변경
function circumference(radius) {
	return 2 * Math.PI * radius;
}

module.exports = {
	circum,
	circumference,
};

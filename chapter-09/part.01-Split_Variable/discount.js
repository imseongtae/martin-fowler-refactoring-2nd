// 변수 바꾸기를 수행해서 각각의 쓰임에 어울리는 이름을 지어준다.
function discount(inputValue, quantity) {
	let result = inputValue;
	// 입력값에 기초하여 결괏값을 누적해 계산한다는 사실을 드러내기 위한 변수명
	if (inputValue > 50) inputValue = inputValue - 2;
	if (quantity > 100) inputValue = inputValue - 1;
	return result;
}

module.exports = discount;

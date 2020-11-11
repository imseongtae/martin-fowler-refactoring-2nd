// class ChargeCalculator {
// 함수 선언 바꾸기를 통해 생성자가 받던 모든 변수를 charge() 메서드로 옮기기
// constructor(customer, usage, provider) {
// 	// 필드는 가급적 지우기
// 	// this._customer = customer;
// 	// this._usage = usage;
// 	// this._provider = provider;
// }

// baseCharge() 같이 값을 반환하는 보조 메서드는 변수로 추출!
// charge(customer, usage, provider) {
// charge() 본문에서 필드 대신 건네받은 매개변수를 사용하도록 수정
// const baseCharge = customer.baseRate * usage;
// return baseCharge + provider.connectionCharge;
// }
// }

function charge(customer, usage, provider) {
	// 최상위 charge() 함수로 인라인
	const baseCharge = customer.baseRate * usage;
	return baseCharge + provider.connectionCharge;
}

module.exports = charge;

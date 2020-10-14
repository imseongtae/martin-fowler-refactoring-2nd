class Person {
	constructor() {
		this._telephoneNumber = new TelephoneNumber();
	}
	get officeAreaCode() {
		return this._telephoneNumber.areaCode;
	}
	set officeAreaCode(arg) {
		// this._telephoneNumber.areaCode = arg;
		// 세터를 호출하는 곳에서 전화번호를 매번 다시 대입하도록 변경
		this._telephoneNumber = new TelephoneNumber(arg, this.officeNumber);
	}
	get officeNumber() {
		return this._telephoneNumber.number;
	}
	set officeNumber(arg) {
		// officeNumber 필드에도 같은 작업을 진행해줌
		// this._telephoneNumber.number = arg;
		this._telephoneNumber = new TelephoneNumber(this.officeAreaCode, arg);
	}
}

class TelephoneNumber {
	constructor(areaCode, number) {
		// 전화번호를 불변으로 만들기
		this._number = number;
		this._areaCode = areaCode;
	}
	equals(other) {
		// 값 객체로 인정받으려면 동치성을 값 기반으로 평가해야 한다.
		// 참조 기반 동치성을 값 기반 동치성으로 대체
		if (!(other instanceof TelephoneNumber)) return false;
		return this.areaCode === other.areaCode && this.number === other.number;
	}
	get areaCode() {
		return this._areaCode;
	}
	// set areaCode(arg) {
	// 	this._areaCode = arg;
	// }
	get number() {
		return this._number;
	}
	// set number(arg) {
	// 	this._number = arg;
	// }
}

module.exports = Person;

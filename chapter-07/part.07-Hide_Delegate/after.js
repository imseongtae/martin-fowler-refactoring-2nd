class Person {
	constructor(data) {
		this._name = data.name;
		this._department = new Department(data);
	}
	get name() {
		return this._name;
	}
	get manager() {
		return this._department.manager;
	}
	set manager(arg) {
		this._department.manager = arg;
	}
	// Department 객체의 chargeCode 메서드 위임
	get chargeCode() {
		return this._department.chargeCode;
	}
	set chargeCode(arg) {
		this._department.chargeCode = arg;
	}
	// Department 객체에 대한 접근자 삭제
}

class Department {
	constructor(data) {
		this._chargeCode = data.chargeCode;
		this._manger = data.manager;
	}
	get chargeCode() {
		return this._chargeCode;
	}
	set chargeCode(arg) {
		this._chargeCode = arg;
	}
	get manager() {
		return this._manger;
	}
	set manager(arg) {
		this._manger = arg;
	}
}

module.exports = Person;

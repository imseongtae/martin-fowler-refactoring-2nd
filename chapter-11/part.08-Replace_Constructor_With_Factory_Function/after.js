// 팩터리 함수 생성, 팩터리 본문은 생성자에 위임하는 방식으로 구현
function createEmployee(name, typeCode) {
	return new Employee(name, typeCode);
}

// 함수에 문자열 리터럴을 건네는 것은 악취이므로, 직원 유형을 팩터리 함수의 이름에 녹인다
function createEngineer(name) {
	return new Employee(name, 'E');
}

class Employee {
	constructor(name, typeCode) {
		this._name = name;
		this._typeCode = typeCode;
	}
	get name() {
		return this._name;
	}
	get type() {
		return Employee.legalTypeCodes[this._typeCode];
	}
	static get legalTypeCodes() {
		return { E: 'Engineer', M: 'Manager', S: 'Salesman' };
	}
}

module.exports = {
	createEmployee,
	createEngineer,
};

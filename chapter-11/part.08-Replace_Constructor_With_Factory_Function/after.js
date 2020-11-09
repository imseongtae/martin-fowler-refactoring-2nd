// 팩터리 함수 생성, 팩터리 본문은 생성자에 위임하는 방식으로 구현
function createEmployee(name, typeCode) {
	return new Employee(name, typeCode);
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
};

// 위임 메서드가 많아지면 Person 클래스의 상당 부분이 위임하는 데만 쓰이므로
// 중개자를 제거하는 편이 나음
class Person {
	constructor(data) {
		this._department = new Department(data);
	}
	get department() {
		return this._department;
	}
	// get manager() {
	// 	return this._department.manager;
	// }
	// set manager(arg) {
	// 	this._department.manager = arg;
	// }
}

class Department {
	constructor(data) {
		this._manger = data.manager;
	}
	get manager() {
		return this._manger;
	}
	set manager(arg) {
		this._manger = arg;
	}
}

module.exports = Person;

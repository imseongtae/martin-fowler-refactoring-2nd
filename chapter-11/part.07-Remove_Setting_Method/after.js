class Person {
	constructor(id) {
		this._id = id; // 생성자에서 값을 받도록 수정
	}
	get name() {
		return this._name;
	}
	set name(arg) {
		this._name = arg;
	}
	get id() {
		return this._id;
	}
	// 세터 메서드를 인라인
	// set id(arg) {
	// 	this._id = arg;
	// }
}

module.exports = Person;

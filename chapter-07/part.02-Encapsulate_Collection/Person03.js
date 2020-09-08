class Person {
	constructor(name) {
		this._name = name;
		this._courses = [];
	}
	get name() {
		return this._name;
	}
	get courses() {
		// 기존의 배열을 건드리지 않고 새로운 배열을 반환
		return this._courses.slice();
	}
	set courses(aList) {
		this._courses = aList.slice();
	}
	addCourse(aCourse) {
		this._courses.push(aCourse);
	}
	removeCourse(
		aCourse,
		fnIfAbsent = () => {
			throw new RangeError();
		},
	) {
		const index = this._courses.indexOf(aCourse);
		if (index === -1) fnIfAbsent();
		else this._courses.splice(index, 1);
	}
}

module.exports = Person;

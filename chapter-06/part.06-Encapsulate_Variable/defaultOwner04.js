let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };

// 게터 이름에서 get 을 제거
function defaultOwner() {
	// return Object.assign({}, defaultOwnerData);
	return new Person(defaultOwnerData);
}

function setDefaultOwner(arg) {
	defaultOwnerData = arg;
}

class Person {
	constructor(data) {
		this._lastName = data.lastName;
		this._firstName = data.firstName;
	}

	get lastName() {
		return this._lastName;
	}
	get firstName() {
		return this._firstName;
	}
	// 다른 속성도 이런 식으로 처리
}

module.exports = { defaultOwnerData, defaultOwner, setDefaultOwner };

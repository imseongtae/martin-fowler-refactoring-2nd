// 별도의 필드를 정의하고, 생성자와 접근자에서 둘을 구분해 사용하기
class Organization {
	constructor(data) {
		// 생성자에서 'title'도 받아들일 수 있도록 조치, 이를 통해 title과 name 둘 다 사용할 수 있고, title이 우선함
		this._title = data.title !== undefined ? data.title : data.name;
		this._country = data.country;
	}
	get name() {
		return this._title;
	}
	set name(aString) {
		this._title = aString;
	}
	get country() {
		return this._country;
	}
	set country(aCountryCode) {
		this._country = aCountryCode;
	}
}

// organization 레코드를 클래스로 캡슐화
const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });

module.exports = organization;

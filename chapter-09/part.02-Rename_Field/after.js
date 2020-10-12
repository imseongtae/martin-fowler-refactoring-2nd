// 생정자를 호출하는 곳을 수정했다면
// 생성자에서 name을 사용할 수 있게 하던 코드를 제거
class Organization {
	constructor(data) {
		this._title = data.title; // name을 사용할 수 있게 하던 코드를 제거
		this._country = data.country;
	}
	// 생성자와 데이터의 수정에 걸맞게 접근자의 이름도 변경
	get title() {
		return this._title;
	}
	set title(aString) {
		this._title = aString;
	}
	get country() {
		return this._country;
	}
	set country(aCountryCode) {
		this._country = aCountryCode;
	}
}

// 생성자를 호출하는 곳에서 title을 사용하도록 하나씩 수정
const organization = new Organization({ title: 'Acme Gooseberries', country: 'GB' });

module.exports = organization;

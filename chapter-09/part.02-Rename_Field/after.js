class Organization {
	constructor(data) {
		this._name = data.name;
		this._country = data.country;
	}
	get name() {
		return this._name;
	}
	set name(aString) {
		this._name = aString;
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

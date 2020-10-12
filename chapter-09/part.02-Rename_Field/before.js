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

const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });

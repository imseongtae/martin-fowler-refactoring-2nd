class Organization {
	constructor(data) {
		this._data = data;
		this._country = data.country;
	}
	set name(aString) {
		this._data.name = aString;
	}
	get name() {
		return this._data.name;
	}
	get country() {
		return this._country;
	}
	set country(aCountryCode) {
		this._country = aCountryCode;
	}
}

module.exports = Organization;

class Reading {
	constructor(data) {
		this._customer = data._customer;
		this._quantity = data._quantity;
		this._month = data._month;
		this._year = data._year;
	}
	get customer() {
		return this._customer;
	}
	get quantity() {
		return this._quantity;
	}
	get month() {
		return this._month;
	}
	get year() {
		return this._year;
	}
	get baseCharge() {
		return baseRate(this.month, this.year) * this.quantity;
	}
	get taxableCharge() {
		return Math.max(0, this.baseCharge - taxThreshold(this.year));
	}
}

module.exports = Reading;

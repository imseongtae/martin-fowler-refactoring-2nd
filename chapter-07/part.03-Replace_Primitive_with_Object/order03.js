class Order {
	constructor(data) {
		this.priority = data.priority;
		// more initialization
	}
	get priority() {
		return this._priority;
	}
	get priorityString() {
		return this._priority.toString;
	}
	set priority(aString) {
		this._priority = new Priority(aString);
	}
}

class Priority {
	constructor(value) {
		if (value instanceof Priority) return value;
		if (Priority.legalValues().includes(value)) this._value = value;
		else throw new Error(`<${value}> is invalid for Priority`);
		this._value = value;
	}
	toString() {
		return this._value;
	}
	get _index() {
		return Priority.legalValues().findIndex(s => s === this._value);
	}
	static legalValues() {
		return ['low', 'normal', 'high', 'rush'];
	}
	equals(other) {
		return this._index === other._index;
	}
	higherThan(other) {
		return this._index > other._index;
	}
	lowerThan(other) {
		return this._index < other._index;
	}
}

module.exports = Order;

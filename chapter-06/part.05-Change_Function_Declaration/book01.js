class Book {
	constructor() {
		this._reservations = [];
	}
	addReservation(customer) {
		this._reservations.push(customer);
	}
}

module.exports = Book;

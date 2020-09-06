class Order {
	constructor(aRecord) {
		this._data = aRecord;
	}

	get quantity() {
		return this._data.quantity;
	}
	get itemPrice() {
		return this._data.itemPrice;
	}

	get price() {
		// 가격(price) = 기본 가격 - 수량 할인 + 배송비
		return (
			this.quantity * this.itemPrice -
			Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
			Math.min(this.quantity * this.itemPrice * 0.1, 100)
		);
	}
}

module.exports = Order;

// 객체는 특정 로직과 데이터를 외부와 공유하려 할 때
// 공유할 정보를 설명해주는 적당한 크기의 문맥이 되어준다.
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
		return this.basePrice - this.quantityDiscount + this.shipping;
	}
	get basePrice() {
		return this.quantity * this.itemPrice;
	}
	get quantityDiscount() {
		return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05;
	}
	get shipping() {
		return Math.min(this.quantity * this.itemPrice * 0.1, 100);
	}
}

module.exports = Order;

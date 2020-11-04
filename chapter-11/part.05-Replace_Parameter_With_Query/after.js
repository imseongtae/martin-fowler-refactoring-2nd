class Order {
	constructor(quantity, itemPrice) {
		this.quantity = quantity;
		this.itemPrice = itemPrice;
	}

	// 함수 간소화를 위해 임시 변수를 질의 함수로 바꾸기 적용
	get finalPrice() {
		const basePrice = this.quantity * this.itemPrice;
		return this.discountedPrice(basePrice, this.discountLevel);
	}
	get discountLevel() {
		return this.quantity > 100 ? 2 : 1;
	}

	discountedPrice(basePrice, discountLevel) {
		switch (discountLevel) {
			case 1:
				return basePrice * 0.95;
			case 2:
				return basePrice * 0.9;
		}
	}
}

module.exports = Order;

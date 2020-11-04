class Order {
	constructor(quantity, itemPrice) {
		this.quantity = quantity;
		this.itemPrice = itemPrice;
	}

	// 함수 간소화를 위해 임시 변수를 질의 함수로 바꾸기 적용
	get finalPrice() {
		const basePrice = this.quantity * this.itemPrice;
		return this.discountedPrice(basePrice); // 필요할 때 호출하도록 수정
	}
	get discountLevel() {
		return this.quantity > 100 ? 2 : 1;
	}

	// discountLevel 을 필요할 때 직접 호출하도록 수정, 매개변수 대신 함수 호출로 수정
	discountedPrice(basePrice) {
		switch (this.discountLevel) {
			case 1:
				return basePrice * 0.95;
			case 2:
				return basePrice * 0.9;
		}
	}
}

module.exports = Order;

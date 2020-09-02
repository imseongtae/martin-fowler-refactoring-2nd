function priceOrder(product, quantity, shippingMethod) {
	const priceData = calculatePricingData(product, quantity);
	return applyShipping(priceData, shippingMethod);
}

// 첫번째 단계를 처리하는 함수
function calculatePricingData(product, quantity) {
	const basePrice = product.basePrice * quantity;
	const discount =
		Math.max(quantity - product.discountThreshold, 0) *
		product.basePrice *
		product.discountRate;
	return { basePrice, quantity, discount };
}

// 두 번째 단계를 처리하는 함수
function applyShipping(priceData, shippingMethod) {
	const shippingPerCase =
		priceData.basePrice > shippingMethod.discountThreshold
			? shippingMethod.discountedFree
			: shippingMethod.feePerCase;
	const shippingCost = priceData.quantity * shippingPerCase;
	return priceData.basePrice - priceData.discount + shippingCost;
}

/**
 * 1. 먼저 배송비 계산 부분을 함수로 추출
 * 2. 두 번째 단계를 처리하는 함수 applyShipping 작성
 * 3. 첫 번째 단계와 두 번째 단계가 주고받을 중간 데이터 구조를 만든다.
 * 5. basePrice를 중간 데이터 구조로 옮기고 매개변수 목록에서 제거, quantity와 discount도 적용
 * 6. 첫 번째 단계 코드를 함수로 추출하고, 이 데이터 구조를 반환하게 한다.
 */

module.exports = priceOrder;

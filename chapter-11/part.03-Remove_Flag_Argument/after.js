// 조건문 분해하기 적용, 명시적인 함수를 사용해 호출자의 의도를 분명히 밝히기 위해
function deliveryDate(anOrder, isRush) {
	if (isRush) {
		return rushDeliveryDate(anOrder);
	} else {
		return regularDeliveryDate(anOrder);
	}
}

function rushDeliveryDate(anOrder) {
	let deliveryTime;
	if (['MA', 'CT'].includes(anOrder.deliveryState)) deliveryTime = 1;
	else if (['NY', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 2;
	else deliveryTime = 3;
	return anOrder.placedOn.plusDays(1 + deliveryTime);
}

function regularDeliveryDate(anOrder) {
	let deliveryTime;
	if (['MA', 'CT', 'NY'].includes(anOrder.deliveryState)) deliveryTime = 2;
	else if (['ME', 'NH'].includes(anOrder.deliveryState)) deliveryTime = 3;
	else deliveryTime = 4;
	return anOrder.placedOn.plusDays(2 + deliveryTime);
}

module.exports = deliveryDate;

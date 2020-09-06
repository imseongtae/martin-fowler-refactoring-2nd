function rating(aDriver) {
	return moreThanFiveLateDeliveries(aDriver) ? 2 : 1;
}

function moreThanFiveLateDeliveries(dvr) {
	return dvr.numberOfLateDeliveries > 5;
}

/* 
* 인라인 후 코드를 살짝 수정해야 함
function rating(aDriver) {
	return aDriver.numberOfLateDeliveries > 5 ? 2 : 1;
}
*/

module.exports = rating;

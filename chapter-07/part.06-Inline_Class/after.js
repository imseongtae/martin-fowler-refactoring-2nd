// 1. TrackingInformation의 모든 요소를 모두 Shipment으로 옮긴 후
// 2. TrackingInformation 클래스 삭제

class Shipment {
	constructor(data) {
		this._shippingCompany = data.shippingCompany;
		this._trackingNumber = data.trackingNumber;
	}

	get shippingCompany() {
		return this._shippingCompany;
	}
	set shippingCompany(arg) {
		this._shippingCompany = arg;
	}
	get trackingNumber() {
		return this._trackingNumber;
	}
	set trackingNumber(arg) {
		this._trackingNumber = arg;
	}
	get trackingInfo() {
		return this._trackingInformation.display;
	}
	get trackingInformation() {
		return this._trackingInformation;
	}
	set trackingInformation(aTrackingInformation) {
		this._trackingInformation = aTrackingInformation;
	}
	get display() {
		return `${this.shippingCompany}: ${this.trackingNumber}`;
	}
}

module.exports = Shipment;

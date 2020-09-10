class TrackingInformation {
	constructor(data) {
		this._shippingCompany = data.shippingCompany;
		this._trackingNumber = data.trackingNumber;
	}
	// 외부에서 직접 호출하는 TrackingInformation의 메서드들을 모조리 Shipment으로 옮기기
	// get shippingCompany() {
	// 	return this._shippingCompany;
	// }
	// set shippingCompany(arg) {
	// 	this._shippingCompany = arg;
	// }
	get trackingNumber() {
		return this._trackingNumber;
	}
	set trackingNumber(arg) {
		this._trackingNumber = arg;
	}
	get display() {
		return `${this.shippingCompany}: ${this.trackingNumber}`;
	}
}

class Shipment {
	constructor(data) {
		this._shippingCompany = data.shippingCompany;
		this._trackingInformation = new TrackingInformation(data);
	}
	// Shipment에 위임 함수를 만들고, 클라이언트가 이를 호출하도록 수정
	get shippingCompany() {
		return this._shippingCompany;
	}
	set shippingCompany(arg) {
		this._shippingCompany = arg;
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
}

module.exports = Shipment;

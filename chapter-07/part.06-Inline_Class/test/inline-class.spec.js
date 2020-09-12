const beforeShipment = require('../before');
const afterShipment = require('../after');
const { expect } = require('chai');

const trackingInfoData = {
	shippingCompany: '오뚜기',
	trackingNumber: 1743,
};

describe('7-6 Original Code Test', () => {
	const aShipment = new beforeShipment(trackingInfoData);
	describe('success', () => {
		it('aShipment._trackingInformation.shippingCompany works properly', done => {
			expect(aShipment._trackingInformation.shippingCompany).to.equal('오뚜기');
			done();
		});
		it('aShipment._trackingInformation.trackingNumber works properly', done => {
			expect(aShipment._trackingInformation.trackingNumber).to.equal(1743);
			done();
		});
		it('get aShipment._trackingInformation.display method works properly', done => {
			expect(aShipment._trackingInformation.display).to.equal('오뚜기: 1743');
			done();
		});
	});
	describe('error', () => {
		it('shippingCompany의 값이 기대값과 다르다면 error를 응답', done => {
			expect(aShipment._trackingInformation.shippingCompany).not.to.equal('삼양');
			done();
		});
		it('trackingNumber가 숫자형이 아니면 error를 응답', done => {
			expect(aShipment._trackingInformation.trackingNumber).not.to.equal('1743');
			done();
		});
	});
});

describe('7-6 Refactoring Code Test', () => {
	describe('success', () => {
		const aShipment = new afterShipment(trackingInfoData);
		it('get display method works properly', done => {
			expect(aShipment.display).to.equal('오뚜기: 1743');
			done();
		});
		it('get shippingCompany method works properly', done => {
			expect(aShipment.shippingCompany).to.equal('오뚜기');
			done();
		});
		it('set shippingCompany method works properly', done => {
			aShipment.shippingCompany = '농심';
			expect(aShipment.shippingCompany).to.equal('농심');
			done();
		});
		it('get trackingNumber method works properly', done => {
			expect(aShipment.trackingNumber).to.equal(1743);
			done();
		});
		it('set trackingNumber method works properly', done => {
			aShipment.trackingNumber = 1004;
			expect(aShipment.trackingNumber).to.equal(1004);
			done();
		});
	});
	describe('error', () => {
		const aShipment = new afterShipment(trackingInfoData);
		it('get display method 가 "오뚜기: 1743" 과 다를 경우 error', done => {
			expect(aShipment.display).to.equal('오뚜기: 1743');
			expect(aShipment.display).not.to.equal('삼양: 1743');
			done();
		});
		it('get shippingCompany method가 "오뚜기" 와 다를 경우 error', done => {
			expect(aShipment.shippingCompany).to.equal('오뚜기');
			expect(aShipment.shippingCompany).not.to.equal('삼양');
			done();
		});
		it('set shippingCompany method가 "삼양" 과 다를 경우 error', done => {
			aShipment.shippingCompany = '삼양';
			expect(aShipment.shippingCompany).to.equal('삼양');
			expect(aShipment.shippingCompany).not.to.equal('농심');
			done();
		});
		it('get trackingNumber method 가 1743 과 다를 경우 error', done => {
			expect(aShipment.trackingNumber).to.equal(1743);
			expect(aShipment.trackingNumber).not.to.equal(1004);
			done();
		});
		it('set trackingNumber method가 1004 와 다를 경우 error', done => {
			aShipment.trackingNumber = 1004;
			expect(aShipment.trackingNumber).to.equal(1004);
			expect(aShipment.trackingNumber).not.to.equal(1005);
			done();
		});
	});
});

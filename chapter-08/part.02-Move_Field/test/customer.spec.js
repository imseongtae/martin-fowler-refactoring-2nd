const { expect } = require('chai');
const beforeCustomer = require('../before');
const Money = require('js-money');

describe('Customer', () => {
	it('calculates discount', () => {
		const customer = new beforeCustomer('Mike', 0.05);
		expect(customer.applyDiscount(new Money(500, Money.EUR))).to.eql(
			new Money(475, Money.EUR),
		);
	});
});

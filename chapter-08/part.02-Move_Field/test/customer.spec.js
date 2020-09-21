const { expect } = require('chai');
const beforeCustomer = require('../before');
const afterCustomer = require('../after');
const Money = require('js-money');

describe('8-2 Original Customer', () => {
	it('calculates discount', () => {
		const customer = new beforeCustomer('Mike', 0.05);
		expect(customer.applyDiscount(new Money(500, Money.EUR))).to.eql(
			new Money(475, Money.EUR),
		);
	});
});

describe('8-2 Refactoring Customer', () => {
	it('calculates discount', () => {
		const customer = new afterCustomer('Mike', 0.05);
		expect(customer.applyDiscount(new Money(500, Money.EUR))).to.eql(
			new Money(475, Money.EUR),
		);
	});
});

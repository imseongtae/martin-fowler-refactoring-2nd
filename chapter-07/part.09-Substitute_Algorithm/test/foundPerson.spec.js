const { expect } = require('chai');
const beforeFoundPerson = require('../before');
const afterFoundPerson = require('../after');

const people = ['Don'];

describe('7-9 Original code Test: Substitute Algorithm', () => {
	describe('success', () => {
		const foundPerson = beforeFoundPerson(people);
		it('foundPerson works properly', done => {
			expect(foundPerson).to.equal('Don');
			done();
		});
	});
	describe('error', () => {
		const foundPerson = beforeFoundPerson(people);
		it('foundPerson works properly', done => {
			expect(foundPerson).not.to.equal('Ham');
			done();
		});
	});
});

describe('7-9 Refactoring code Test: 알고리즘 교체하기', () => {
	describe('success', () => {
		const foundPerson = afterFoundPerson(people);
		it('foundPerson works properly', done => {
			expect(foundPerson).to.equal('Don');
			done();
		});
	});
	describe('error', () => {
		const foundPerson = afterFoundPerson(people);
		it('foundPerson works properly', done => {
			expect(foundPerson).not.to.equal('Ham');
			done();
		});
	});
});

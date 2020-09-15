const beforePerson = require('../before');
const afterPerson = require('../after');
const { expect } = require('chai');

const data = {
	manager: 'ham',
};

describe('7-8 Original Code: Remove Middle Man', () => {
	describe('success', () => {
		const aPerson = new beforePerson(data);
		it('Person manager getter works properly', done => {
			expect(aPerson.manager).to.equal('ham');
			done();
		});
		it('Person manager setter works properly', done => {
			aPerson.manager = '오뚜기';
			expect(aPerson.manager).to.equal('오뚜기');
			done();
		});
	});
	describe('error', () => {
		const aPerson = new beforePerson(data);
		it('Person manager getter works properly', done => {
			expect(aPerson.manager).not.to.equal('오뚜기');
			done();
		});
		it('Person manager setter works properly', done => {
			aPerson.manager = '삼양';
			expect(aPerson.manager).not.to.equal('오뚜기');
			done();
		});
	});
});

describe('7-8 Refactoring Code: Remove Middle Man / 중개자 제거', () => {
	const aPerson = new afterPerson(data);
	describe('success', () => {
		it('aPerson.department.manager getter works properly', done => {
			expect(aPerson.department.manager).to.equal('ham');
			done();
		});
		it('aPerson.department.manager setter works properly', done => {
			aPerson.department.manager = 'Kent';
			expect(aPerson.department.manager).to.equal('Kent');
			done();
		});
	});
});

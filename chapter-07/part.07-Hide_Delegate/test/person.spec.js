const beforePerson = require('../before');
const afterPerson = require('../after');
const { expect } = require('chai');

const data = {
	name: '오뚜기',
	chargeCode: 200,
	manager: '김과장',
};

describe('7-7 Original code: 중개자가 사용된 코드', () => {
	const aPerson = new beforePerson(data);
	describe('success', () => {
		it('aPerson.department.manager works properly', done => {
			expect(aPerson.department.manager).to.equal('김과장');
			done();
		});
		it('aPerson.department.chargeCode works properly', done => {
			expect(aPerson.department.chargeCode).to.equal(200);
			done();
		});
	});
});

// 위임 객체 숨기기
describe('7-7 Refactoring Code: 위임 숨기기', () => {
	describe('success', () => {
		const aPerson = new afterPerson(data);
		it('Person manager getter works properly', done => {
			expect(aPerson.manager).to.equal('김과장');
			done();
		});
		it('Person manager setter works properly', done => {
			aPerson.manager = '박과장';
			expect(aPerson.manager).to.equal('박과장');
			done();
		});
		it('Person chargeCode getter works properly', done => {
			expect(aPerson.chargeCode).to.equal(200);
			done();
		});
		it('Person chargeCode setter works properly', done => {
			aPerson.chargeCode = 777;
			expect(aPerson.chargeCode).to.equal(777);
			done();
		});
	});
});

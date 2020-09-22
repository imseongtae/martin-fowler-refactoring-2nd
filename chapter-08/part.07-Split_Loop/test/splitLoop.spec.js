const { expect } = require('chai');
const reportYoungestAgeAndTotalSalary = require('../before');
const afterSplitLoop = require('../after');

const people = [
	{
		age: '30',
		salary: 2000,
	},
	{
		age: '25',
		salary: 2000,
	},
	{
		age: '31',
		salary: 2000,
	},
];

describe('8-7 Original reportYoungestAgeAndTotalSalary', () => {
	it('report youngest age and total salary', () => {
		expect(reportYoungestAgeAndTotalSalary(people)).to.equal(
			'youngestAge: 25, totalSalary: 6000',
		);
	});
});

describe('8-7 Refactoring reportYoungestAgeAndTotalSalary', () => {
	it('report youngest age and total salary', () => {
		expect(afterSplitLoop(people)).to.equal('youngestAge: 25, totalSalary: 6000');
	});
});

const { expect } = require('chai');

describe('part.01-Pull_Up_Method', () => {
	describe('Original code', () => {
		const { Employee, Department } = require('../part.01-Pull_Up_Method/before');
		it('totalAnnualCost value is 12', () => {
			expect(new Employee().totalAnnualCost).equals(12);
		});
		it('annualCost value is 12', () => {
			expect(new Department().annualCost).equals(12);
		});
	});
	describe('Refactoring code', () => {
		const { Employee, Department } = require('../part.01-Pull_Up_Method/after');
		it('totalAnnualCost value is 12', () => {
			expect(new Employee().totalAnnualCost).equals(12);
		});
		it('annualCost value is 12', () => {
			expect(new Department().annualCost).equals(12);
		});
	});
});

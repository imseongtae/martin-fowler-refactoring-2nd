const { expect } = require('chai');
const distanceTravelled = require('../part.01-Split_Variable/distanceTravelled');
const beforeOrganization = require('../part.02-Rename_Field/before');
const afterOrganization = require('../part.02-Rename_Field/after');
const beforeProductionPlan = require('../part.03-Replace_Derived_Variable_with_Query/before');
const afterProductionPlan = require('../part.03-Replace_Derived_Variable_with_Query/after');
// -----

describe('01 Split Variable', () => {
	const scenario = {
		primaryForce: 10,
		secondaryForce: 9,
		mass: 5,
		delay: 0.2,
	};
	it('distanceTravelled', done => {
		expect(distanceTravelled(scenario, 600)).to.eql(1379.58);
		done();
	});
});

describe('02 Rename Field', () => {
	it('Original Code', done => {
		expect(beforeOrganization.name).to.eql('Acme Gooseberries');
		done();
	});
	it('Refactoring Code', done => {
		expect(afterOrganization.title).to.eql('Acme Gooseberries');
		done();
	});
});

describe('03 Replace with', () => {
	const data = {
		adjustments: [10],
		production: 10,
	};

	it('Original Code', done => {
		const productionPlan = new beforeProductionPlan(data);
		expect(productionPlan.production).to.eql(10);
		done();
	});
	it('Refactoring Code', done => {
		const productionPlan = new afterProductionPlan(data);
		expect(productionPlan.production).to.eql(10);
		expect(productionPlan.calculateProduction).to.eql(10);
		done();
	});
});

describe('03 Replace with', () => {
	const data = {
		customer: 123,
		number: 10,
	};

	it('Original Code', done => {
		const productionPlan = new beforeProductionPlan(data);
		expect(productionPlan.production).to.eql(10);
		done();
	});
	it('Refactoring Code', done => {
		const productionPlan = new afterProductionPlan(data);
		expect(productionPlan.production).to.eql(10);
		expect(productionPlan.calculateProduction).to.eql(10);
		done();
	});
});

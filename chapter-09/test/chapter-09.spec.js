const { expect } = require('chai');
const distanceTravelled = require('../part.01-Split_Variable/distanceTravelled');
const beforeOrganization = require('../part.02-Rename_Field/before');
const afterOrganization = require('../part.02-Rename_Field/after');

const scenario = {
	primaryForce: 10,
	secondaryForce: 9,
	mass: 5,
	delay: 0.2,
};

describe('01 Split Variable', () => {
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

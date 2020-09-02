const _ = require('lodash');
const { enrichReading } = require('./Reading');

const { describe, it } = require('mocha');
const assert = require('assert');

describe('test', () => {
	describe('test', () => {
		it('check reading unchanged', done => {
			const baseReading = { customer: 'ivan', quantity: 15, month: 5, year: 2017 };
			const oracle = _.cloneDeep(baseReading);
			enrichReading(baseReading);
			assert.deepEqual(baseReading, oracle);
			done();
		});
	});
});

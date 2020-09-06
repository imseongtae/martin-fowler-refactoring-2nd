// const { expect } = require('chai');
// const { describe, it } = require('mocha');
// const printOwing = require('./printOwing01');

// const Clock = {
// 	today: new Date(),
// };
console.log('test');

describe('test', function () {
	it('success', function (done) {
		console.log('test');
		done();
	});
});

// describe('printOwing : 원래 함수', () => {
// 	it('should print owing', () => {
// 		let invoice = {
// 			orders: [{ amount: 1 }],
// 			customer: 'JL',
// 		};

// 		let expected =
// 			'***********************\n' +
// 			'**** Customer Owes ****\n' +
// 			'***********************\n' +
// 			'name: JL\n' +
// 			'amount: 1\n' +
// 			'due: 1/31/2000\n';

// 		printOwing(invoice, console, Clock);

// 		expect(console.content).to.equal(expected);
// 	});
// });

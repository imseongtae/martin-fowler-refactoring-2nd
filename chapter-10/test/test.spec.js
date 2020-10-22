const { expect } = require('chai');
// module
const beforeGetCharge = require('../part.01-Decompose_Conditional/before');
const afterGetCharge = require('../part.01-Decompose_Conditional/after');
const beforeDisabilityAmount = require('../part.02-Consolidate_Conditional_Expression/before');
const afterDisabilityAmount = require('../part.02-Consolidate_Conditional_Expression/after');

const beforeRating = require('../part.04-Replace_Conditional_With_Polymorphism/Rating/before');
const afterRating = require('../part.04-Replace_Conditional_With_Polymorphism/Rating/after');

// part.01
describe('part.01 Decompose Conditional, 조건문 분해하기', () => {
	const plan = {
		summerStart: 6,
		summerEnd: 9,
		summerRate: 2,
		regularRate: 1,
		regularServiceCharge: 10,
	};
	class Date {
		constructor(month) {
			this._month = month;
		}
		isBefore(start) {
			return this._month <= start;
		}
		isAfter(end) {
			return this._month >= end;
		}
	}
	describe('success', () => {
		it('Original getCharge', done => {
			const aDate = new Date(7);
			expect(beforeGetCharge(aDate, plan, 2)).equals(4);
			done();
		});
		it('Refactoring getCharge, 여름철이면 할인율이 달라지는 서비스의 요금을 계산하는 코드', done => {
			const aDate = new Date(7);
			expect(afterGetCharge(aDate, plan, 2)).equals(4);
			done();
		});
	});
});

// part.02
describe('part.02 Consolidate Conditional Expression, 조건식 통합하기', () => {
	describe('success', () => {
		const anEmployee = {
			seniority: 1,
			monthsDisabled: 14,
			isPartTime: true,
		};
		it('Original disabilityAmount', done => {
			expect(beforeDisabilityAmount(anEmployee)).equals(0);
			done();
		});
		it('Refactoring disabilityAmount', done => {
			expect(afterDisabilityAmount(anEmployee)).equals(0);
			done();
		});
	});
});

describe('part.03 Replace Nested Conditional With Guard Clauses, 중첩 조건문을 보호 구문으로 바꾸기', () => {
	describe('success', () => {});
});

describe('part.04-Replace_Conditional_With_Polymorphism, 조건부 로직을 다형성으로 바꾸기', () => {
	describe('Rating', () => {
		const voyage = { zone: 'west-indies', length: 10 };
		const history = [
			{ zone: 'east­indies', profit: 5 },
			{ zone: 'west­indies', profit: 15 },
			{ zone: 'china', profit: -2 },
			{ zone: 'west­africa', profit: 7 },
		];
		it('Original Rating', done => {
			const myRating = beforeRating(voyage, history);
			expect(myRating).to.eql('B');
			done();
		});
		it('After Rating', done => {
			const myRating = afterRating(voyage, history);
			expect(myRating).to.eql('B');
			done();
		});
	});
});

const { expect } = require('chai');
// module
const beforeFindMiscreant = require('../part.01-Separate_Query_From_Modifier/before');
const {
	findMiscreant,
	alertForMiscreant,
} = require('../part.01-Separate_Query_From_Modifier/after');

// part.01
describe('part.01-Separate_Query_From_Modifier, 질의 함수와 변경 함수 분리하기', () => {
	describe('success', () => {
		const people = ['joker', 'st', 'ham', 'hambugger', 'pizza'];
		it('Original findMiscreant', done => {
			expect(beforeFindMiscreant(people)).equal('joker');
			done();
		});
		it('Refactoring findMiscreant', done => {
			expect(findMiscreant(people)).equal('joker');
			done();
		});
		it('Refactoring alertForMiscreant', done => {
			expect(alertForMiscreant(people)).equal('find miscreant');
			// alertForMiscreant(people);
			done();
		});
	});
});

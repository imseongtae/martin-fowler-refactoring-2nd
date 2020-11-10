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

describe('part.02-Parameterize_Function', () => {
	describe('Original Code', () => {
		const baseCharge = require('../part.02-Parameterize_Function/before');
		it('baseCharge 음수가 전달되는 경우', () => {
			expect(baseCharge(-1)).equals('0 usd');
		});
		it('0이 전달되는 경우', () => {
			expect(baseCharge(0)).equals('0 usd');
		});
		it('bottomBand 대역으로 100이 전달되는 경우', () => {
			expect(baseCharge(100)).equals('3 usd');
		});
		it('middleBand 대역으로 200이 전달되는 경우', () => {
			// 3 + 5
			expect(baseCharge(200)).equals('8 usd');
		});
		it('topBand 대역으로 300이 전달되는 경우', () => {
			// 3 + 5 + 7
			expect(baseCharge(300)).equals('15 usd');
		});
	});
	describe('Refactoring Code', () => {
		const baseCharge = require('../part.02-Parameterize_Function/after');
		it('baseCharge 음수가 전달되는 경우', () => {
			expect(baseCharge(-1)).equals('0 usd');
		});
		it('0이 전달되는 경우', () => {
			expect(baseCharge(0)).equals('0 usd');
		});
		it('대역의 하한을 호출하는 함수로 100이 전달되는 경우', () => {
			expect(baseCharge(100)).equals('3 usd');
		});
		it('대역의 중간을 호출하는 함수로 200이 전달되는 경우', () => {
			// 3 + 5
			expect(baseCharge(200)).equals('8 usd');
		});
		it('대역의 상한을 호출하는 함수로 300이 전달되는 경우', () => {
			expect(baseCharge(300)).equals('15 usd');
		});
	});
});

describe('part.08-Replace_Constructor_With_Factory_Function', () => {
	describe('Original code', () => {
		const Employee = require('../part.08-Replace_Constructor_With_Factory_Function/before');
		const document = {
			name: 'ham',
			empType: 'E',
			leadEngineer: 's',
		};
		const candidate = new Employee(document.name, document.empType);
		it('Employee name is ham', () => {
			expect(candidate.name).equals('ham');
		});
		it('Employee empType is Engineer', () => {
			expect(candidate.type).equals('Engineer');
		});
		it('Lead Engineer', () => {
			const leadEngineer = new Employee(document.leadEngineer, 'E');
			expect(leadEngineer.name).equals('s');
			expect(leadEngineer.type).equals('Engineer');
		});
	});
	describe('Refactoring code', () => {
		const {
			createEmployee,
			createEngineer,
		} = require('../part.08-Replace_Constructor_With_Factory_Function/after');
		const document = {
			name: 'ham',
			empType: 'E',
			leadEngineer: 's',
		};
		const candidate = createEmployee(document.name, document.empType);
		it('Employee name is ham', () => {
			expect(candidate.name).equals('ham');
		});
		it('Employee empType is Engineer', () => {
			expect(candidate.type).equals('Engineer');
		});
		it('Lead Engineer', () => {
			const leadEngineer = createEngineer(document.leadEngineer);
			expect(leadEngineer.name).equals('s');
			expect(leadEngineer.type).equals('Engineer');
		});
	});
});

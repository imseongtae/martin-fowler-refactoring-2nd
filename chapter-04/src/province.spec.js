// const { assert, expect } = require('chai');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');

const { Province, sampleProvinceData } = require('./province');

describe('province', () => {
	// 테스트끼리 상호작용하는 공유 픽스처를 생성하는 원인이 되므로 const 키워드는 안됨
	// const asia = new Province(sampleProvinceData()); // 이렇게 하면 안됨
	let asia;
	beforeEach(() => {
		// beforeEach는 각각의 테스트 바로 전에 실행되어 asia를 초기화하므로 모든 테스트가 자신만의 새로운 asia를 사용하게 됨
		asia = new Province(sampleProvinceData());
	});
	it('shortfall', () => {
		// assert.equal(asia.shortfall, 5)
		expect(asia.shortfall).equal(5);
	});
	it('profit', () => {
		expect(asia.profit).equal(230);
	});
	it('change production', done => {
		asia.producers[0].production = 20;
		expect(asia.shortfall).equal(-6);
		expect(asia.profit).equal(292);
		done();
	});
	it('zero demand', () => {
		asia.demand = 0;
		expect(asia.shortfall).equal(-25);
		expect(asia.profit).equal(0);
	});
	it('negative demand', () => {
		asia.demand = -1;
		expect(asia.shortfall).equal(-26);
		expect(asia.profit).equal(-10);
	});
	it('empty string demand', () => {
		// 수요 입력란이 비어있다.
		asia.demand = '';
		expect(asia.shortfall).NaN;
		expect(asia.profit).NaN;
	});
});

describe('no producers', () => {
	let noProducers;
	beforeEach(() => {
		const data = {
			name: 'No producers',
			producers: [],
			demand: 30,
			price: 20,
		};
		noProducers = new Province(data);
	});
	it('shortfall', () => {
		expect(noProducers.shortfall).equal(30);
	});
	it('profit', () => {
		expect(noProducers.profit).equal(0);
	});
});

describe('string for producers', () => {
	it('', () => {
		const data = {
			name: 'String producers',
			producers: '',
			demand: 30,
			price: 20,
		};
		const prov = new Province(data);
		expect(prov.shortfall).equal(0);
	});
});

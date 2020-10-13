// const { assert } = require('chai');

class ProductionPlan {
	constructor(data) {
		this._adjustments = data.adjustments;
		this._production = data.production;
	}
	get production() {
		// assert를 통한 검증 이후 계산 결과를 직접 반환하도록 수정
		return this.calculateProduction;
	}
	get calculateProduction() {
		return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
	}
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
		// this._production += anAdjustment.amount; // 죽은 코드 제거하기로 정리
	}
}

module.exports = ProductionPlan;

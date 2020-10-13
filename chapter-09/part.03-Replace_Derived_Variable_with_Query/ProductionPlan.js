const { assert } = require('chai');

class ProductionPlan {
	constructor(production) {
		// 변수 쪼개기를 적용
		this._initialProduction = production;
		this._productionAccumulator = 0;
		this._adjustments = [];
	}
	get production() {
		// 변수 쪼개기 적용 이후, 어서션을 추가
		assert(this._productionAccumulator === this.calculatedProductionAccumulator);
		return this._initialProduction + this._productionAccumulator;
	}
	get calculatedProductionAccumulator() {
		return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
	}
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
		this._production += anAdjustment.amount;
	}
}

module.exports = ProductionPlan;

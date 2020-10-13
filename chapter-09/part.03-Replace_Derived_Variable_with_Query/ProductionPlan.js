class ProductionPlan {
	constructor(production) {
		// 변수 쪼개기를 적용
		this._initialProduction = production;
		this._productionAccumulator = 0;
		this._adjustments = [];
	}
	get production() {
		// 변수 쪼개기를 적용
		return this._initialProduction + this._productionAccumulator;
	}
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
		this._production += anAdjustment.amount;
	}
}

module.exports = ProductionPlan;

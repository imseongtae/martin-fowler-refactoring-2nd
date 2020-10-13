const { assert } = require('chai');

class ProductionPlan {
	constructor(data) {
		this._adjustments = data.adjustments;
		this._production = data.production;
	}
	get production() {
		// assert를 추가하여 검증하기
		assert(this._production === this.calculateProduction);
		return this._production;
	}
	get calculateProduction() {
		return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
	}
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
		this._production += anAdjustment.amount;
	}
}

module.exports = ProductionPlan;

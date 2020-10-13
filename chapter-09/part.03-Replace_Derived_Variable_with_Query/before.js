class ProductionPlan {
	constructor(data) {
		this._adjustments = data.adjustments;
		this._production = data.production;
	}
	get production() {
		return this._production;
	}
	applyAdjustment(anAdjustment) {
		this._adjustments.push(anAdjustment);
		this._production += anAdjustment.amount;
	}
}

module.exports = ProductionPlan;

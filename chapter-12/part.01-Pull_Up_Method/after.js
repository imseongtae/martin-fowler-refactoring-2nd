class Party {
	constructor() {
		this.monthlyCost = 1;
	}
}

class Employee extends Party {
	get totalAnnualCost() {
		return this.monthlyCost * 12;
	}
}

class Department extends Party {
	get annualCost() {
		return this.monthlyCost * 12;
	}
}

module.exports = {
	Employee,
	Department,
};

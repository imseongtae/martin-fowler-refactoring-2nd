class Party {
	constructor() {
		this.monthlyCost = 1;
	}
}

class Employee extends Party {
	// 두 메서드의 이름을 통일한다
	get annualCost() {
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

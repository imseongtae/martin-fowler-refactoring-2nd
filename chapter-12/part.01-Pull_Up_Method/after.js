class Party {
	constructor() {
		this.monthlyCost = 1;
	}
	// annualCost() 메서드를 슈퍼 클래스에 복사하고, 서브 클래스에서 제거 후 테스트
	get annualCost() {
		return this.monthlyCost * 12;
	}
}

class Employee extends Party {
	// 두 메서드의 이름을 통일한다
	// get annualCost() {
	// 	return this.monthlyCost * 12;
	// }
}

class Department extends Party {
	// 마찬가지로 annualCost() 제거 후 테스트
	// get annualCost() {
	// 	return this.monthlyCost * 12;
	// }
}

module.exports = {
	Employee,
	Department,
};

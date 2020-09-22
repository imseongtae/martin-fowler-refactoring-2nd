function reportYoungestAgeAndTotalSalary(people) {
	// let totalSalary = 0;
	// for (const p of people) {
	// 	totalSalary += p.salary;
	// }

	// let youngest = people[0] ? people[0].age : Infinity;
	// for (const p of people) {
	// 	if (p.age < youngest) youngest = p.age;
	// }
	return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

	// 더 가다듬기 작업
	// 나누어 놓은 각 반복문을 함수로 추출하자
	function totalSalary() {
		let totalSalary = 0;
		for (const p of people) {
			totalSalary += p.salary;
		}
		return totalSalary;
	}
	function youngestAge() {
		let youngest = people[0] ? people[0].age : Infinity;
		for (const p of people) {
			if (p.age < youngest) youngest = p.age;
		}
		return youngest;
	}
}

module.exports = reportYoungestAgeAndTotalSalary;

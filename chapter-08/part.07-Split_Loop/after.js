function reportYoungestAgeAndTotalSalary(people) {
	let youngest = people[0] ? people[0].age : Infinity;
	let totalSalary = 0;
	for (const p of people) {
		// if (p.age < youngest) youngest = p.age;
		totalSalary += p.salary;
	}
	// 반복문 쪼개기 단계
	// 1. 단순히 반복문 복제하기
	// 2. 잘못된 결과를 초래할 수 있는 중복 제거
	for (const p of people) {
		if (p.age < youngest) youngest = p.age;
		// totalSalary += p.salary;
	}
	return `youngestAge: ${youngest}, totalSalary: ${totalSalary}`;
}

module.exports = reportYoungestAgeAndTotalSalary;

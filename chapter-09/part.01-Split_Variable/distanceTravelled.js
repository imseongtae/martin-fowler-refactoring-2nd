function distanceTravelled(scenario, time) {
	let result;
	// 변수에 새로운 이름을 지어주고, 불변으로 만듦
	const primaryAcceleration = scenario.primaryForce / scenario.mass;
	let primaryTime = Math.min(time, scenario.delay);
	// 모든 참조의 이름을 변경
	result = 0.5 * primaryAcceleration * primaryTime * primaryTime;
	let secondaryTime = time - scenario.delay;
	if (secondaryTime > 0) {
		let primaryVelocity = primaryAcceleration * scenario.delay;
		// 두 번째 변수를 용도에 적합한 이름으로 수정
		let secondaryAcceleration =
			(scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
		result +=
			primaryVelocity * secondaryTime + 0.5 * secondaryAcceleration * secondaryTime;
	}
	return result;
}

module.exports = distanceTravelled;

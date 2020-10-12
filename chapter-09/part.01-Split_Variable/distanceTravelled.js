function distanceTravelled(scenario, time) {
	let result;
	let acc = scenario.primaryForce / scenario.mass;
	let primaryTime = Math.min(time, scenario.delay);
	result = 0.5 * acc * primaryTime * primaryTime;
	let secondaryTime = time - scenario.delay;
	if (secondaryTime > 0) {
		let primaryVelocity = acc * scenario.delay;
		acc = (scenario.primaryForce + scenario.secondaryForce) / scenario.mas;
		result += primaryVelocity * secondaryTime + 0.5 * acc * secondaryTime;
	}
	return result;
}

module.exports = distanceTravelled;

function plumages(bird) {
	// return new Map(birds.map(b => [b.name, plumage(b)]));
	return new Bird(bird).plumage;
}
function speeds(bird) {
	// return new Map(birds.map(b => [b.name, airSpeedVelocity(b)]));
	return new Bird(bird).airSpeedVelocity;
}

// plumage, airSpeedVelocity 함수를 클래스로 묶기
class Bird {
	constructor(birdObject) {
		Object.assign(this, birdObject);
	}
	get plumage() {
		switch (this.type) {
			case 'EuropeanSwallow':
				return 'average';
			case 'AfricanSwallow':
				return this.numberOfCoconuts > 2 ? 'tired' : 'average';
			case 'NorwegianBlueParrot':
				return this.voltage > 100 ? 'scorched' : 'beautiful';
			default:
				return 'unknown';
		}
	}
	get airSpeedVelocity() {
		switch (this.type) {
			case 'EuropeanSwallow':
				return 35;
			case 'AfricanSwallow':
				return 40 - 2 * this.numberOfCoconuts;
			case 'NorwegianBlueParrot':
				return this.isNailed ? 0 : 10 + this.voltage / 10;
			default:
				return null;
		}
	}
}

module.exports = {
	plumages,
	speeds,
};

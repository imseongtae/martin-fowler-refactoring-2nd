// 객체를 얻을 때 팩토리 함수를 사용하도록 수정
function plumages(bird) {
	// return new Bird(bird).plumage;
	return createBird(bird).plumage;
}
function speeds(bird) {
	// return new Bird(bird).airSpeedVelocity;
	return createBird(bird).airSpeedVelocity;
}

// 서브클래스의 인스턴스를 만들어줄 팩터리 함수
function createBird(bird) {
	switch (bird.type) {
		case 'EuropeanSwallow':
			return new EuropeanSwallow(bird);
		case 'AfricanSwallow':
			return new AfricanSwallow(bird);
		case 'NorweigianBlueParrot':
			return new NorwegianBlueParrot(bird);
		default:
			return new Bird(bird);
	}
}

// 종별 서브클래스
class EuropeanSwallow extends Bird {}
class AfricanSwallow extends Bird {}
class NorwegianBlueParrot extends Bird {}

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

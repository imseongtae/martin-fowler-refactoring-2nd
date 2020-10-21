// 객체를 얻을 때 팩토리 함수를 사용하도록 수정
function plumages(birds) {
	return new Map(birds.map(b => createBird(b)).map(bird => [bird.name, bird.plumage]));
}
function speeds(birds) {
	return new Map(
		birds.map(b => createBird(b)).map(bird => [bird.name, bird.airSpeedVelocity]),
	);
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

// 종별 서브클래스에서 슈퍼클래스의 조건절을 오버라이드
// airSpeedVelocity도 똑같은 과정을 수행
class EuropeanSwallow extends Bird {
	get plumage() {
		return 'average';
	}
	get airSpeedVelocity() {
		return 35;
	}
}
class AfricanSwallow extends Bird {
	get plumage() {
		return this.numberOfCoconuts > 2 ? 'tired' : 'average';
	}
	get airSpeedVelocity() {
		return 40 - 2 * this.numberOfCoconuts;
	}
}
class NorwegianBlueParrot extends Bird {
	get plumage() {
		return this.voltage > 100 ? 'scorched' : 'beautiful';
	}
	get airSpeedVelocity() {
		return this.isNailed ? 0 : 10 + this.voltage / 10;
	}
}

// 슈퍼클래스의 메서드는 기본동작용으로 남겨놓는다.
// 슈퍼클래스 Bird는 없어도 괜찮아 보임
// 자바스크립트에서 타입 계층 구조 없이도 다형성을 표현할 수 있다.
class Bird {
	constructor(birdObject) {
		Object.assign(this, birdObject);
	}
	get plumage() {
		return 'unknown';
	}
	get airSpeedVelocity() {
		return null;
	}
}

module.exports = {
	plumages,
	speeds,
};

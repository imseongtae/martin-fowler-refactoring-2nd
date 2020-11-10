/* eslint-disable no-unused-vars */

function score(candidate, medicalExam, scoringGuide) {
	// execute() 메서드가 매개변수를 받지 않도록 수정, 매개변수가 복잡할 때는 편리해짐
	return new Scorer(candidate).execute(medicalExam, scoringGuide);
}

// 1. 빈 클래스를 만들고, 2. score함수를 클래스로 옮긴다.
class Scorer {
	constructor(candidate) {
		this._candidate = candidate;
	}
	execute(medicalExam, scoringGuide) {
		let result = 0;
		let healthLevel = 0;
		let highMedicalRiskFlag = false;

		if (medicalExam.isSmoker) {
			healthLevel += 10;
			highMedicalRiskFlag = true;
		}

		let certificationGrade = 'regular';
		if (scoringGuide.stateWithLowCertification(this._candidate.originState)) {
			certificationGrade = 'low';
			result -= 5;
		}
		// 비슷한 코드가 한참 이어짐
		result -= Math.max(healthLevel - 5, 0);
		return result;
	}
}

module.exports = score;

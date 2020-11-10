/* eslint-disable no-unused-vars */

function score(candidate, medicalExam, scoringGuide) {
	// execute() 메서드가 매개변수를 받지 않도록 수정, 매개변수가 복잡할 때는 편리해짐
	// 다른 매개변수들도 옮기기
	return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

// 1. 빈 클래스를 만들고, 2. score함수를 클래스로 옮긴다.
// 더 가다듬기, 모든 지역변수를 필드로 바꾸기
class Scorer {
	constructor(candidate, medicalExam, scoringGuide) {
		this._candidate = candidate;
		this._medicalExam = medicalExam;
		this._scoringGuide = scoringGuide;
	}
	execute(scoringGuide) {
		this._result = 0; // let result = 0;
		this._healthLevel = 0;
		this._highMedicalRiskFlag = false;

		// 함수가 사용하던 변수나 그 유효범위에 구애받지 않고, 함수 추출하기 리팩터링 적용
		this.scoreSmoking();
		this._certificationGrade = 'regular';
		if (this._scoringGuide.stateWithLowCertification(this._candidate.originState)) {
			this._certificationGrade = 'low';
			this._result -= 5;
		}
		// 비슷한 코드가 한참 이어짐
		this._result -= Math.max(this._healthLevel - 5, 0);
		return this._result;
	}

	scoreSmoking() {
		if (this._medicalExam.isSmoker) {
			this._healthLevel += 10;
			this._highMedicalRiskFlag = true;
		}
	}
}

module.exports = score;

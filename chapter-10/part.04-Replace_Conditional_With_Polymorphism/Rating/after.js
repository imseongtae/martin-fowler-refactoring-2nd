// 투자 등급
// rating 함수는 위험 요인과 수익 요인을 종합하여 요청한 항해의 최종등급을 계산
function rating(voyage, history) {
	// 생성자를 호출하는 코드 대신 이 팩터리 함수를 사용하도록 수정
	return createRating(voyage, history).value;
}

// 다형성을 적용하기 위해 세부 계산 함수들을 Rating 클래스로 묶기
class Rating {
	constructor(voyage, history) {
		this.voyage = voyage;
		this.history = history;
	}
	get value() {
		const vpf = this.voyageProfitFactor;
		const vr = this.voyageRisk;
		const chr = this.captainHistoryRisk;
		if (vpf * 3 > vr + chr * 2) return 'A';
		else return 'B';
	}
	// 항해 경로 위험요소
	get voyageRisk() {
		let result = 1;
		if (this.voyage.length > 4) result += 2;
		if (this.voyage.length > 8) result += this.voyage.length - 8;
		if (['china', 'east­indies'].includes(this.voyage.zone)) result += 4;
		return Math.max(result, 0);
	}
	// 선장의 항해 이력 위험요소
	get captainHistoryRisk() {
		let result = 1;
		if (this.history.length < 5) result += 4;
		result += this.history.filter(v => v.profit < 0).length;
		return Math.max(result, 0);
	}
	// 수익 요인
	get voyageProfitFactor() {
		let result = 2;
		if (this.voyage.zone === 'china') result += 1;
		if (this.voyage.zone === 'east­indies') result += 1;
		result += this.historyLengthFactor;
		result += this.voyageLengthFactor;
		return result;
	}
	// 문장을 호출한 곳으로 옮기기 적용, 함수 이름을 변경
	get voyageLengthFactor() {
		return this.voyage.length > 14 ? -1 : 0;
	}
	// 이력 길이를 수정하는 부분을 함수로 추출
	get historyLengthFactor() {
		return this.history.length > 8 ? 1 : 0;
	}
}

// 중국 항해 경험이 있을 때를 담당하는 클래스, 기본 클래스와 차이만 담음
class ExperiencedChinaRating extends Rating {
	get captainHistoryRisk() {
		const result = super.captainHistoryRisk - 2;
		return Math.max(result, 0);
	}
	// 항해 거리요인을 계산할 때 더하는 3점을 전체 결과를 계산하는 쪽으로 옮기기
	get voyageProfitFactor() {
		return super.voyageProfitFactor + 3;
	}
	// 함수 이름을 변경
	get voyageLengthFactor() {
		let result = 0;
		if (this.voyage.length > 12) result += 1;
		if (this.voyage.length > 18) result -= 1;
		return result;
	}
	get historyLengthFactor() {
		return this.history.length > 10 ? 1 : 0;
	}
}

// 적절한 변형 클래스를 반환해줄 팩터리 함수를 생성
function createRating(voyage, history) {
	if (voyage.zone === 'china' && history.some(v => 'china' === v.zone))
		return new ExperiencedChinaRating(voyage, history);
	else return new Rating(voyage, history);
}

module.exports = rating;

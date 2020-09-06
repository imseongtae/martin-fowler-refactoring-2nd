const fs = require('fs');
const plays = JSON.parse(fs.readFileSync('./plays.json').toString());
const [invoices] = JSON.parse(fs.readFileSync('./invoices.json').toString());

function state(invoice, plays) {
	// return renderPlainText(createStatementData(invoice, plays));
}

// 공연료 청구서를 출력하는 코드
function statement(invoice) {
	const statementData = {};
	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances.map(enrichPerformance);
	statementData.totalAmount = totalAmount(statementData);
	statementData.totalVolumeCredits = totalVolumeCredits(statementData);
	return renderPlainText(statementData, plays);

	function enrichPerformance(aPerformance) {
		const result = Object.assign({}, aPerformance); // 얕은 복사 수행
		result.play = playFor(result);
		result.amount = amountFor(result);
		result.volumeCredits = volumeCreditsFor(result);

		return result;
	}
	// totalAmount
	function totalAmount(data) {
		// for 반복문을 파이프라인으로 바꿈
		return data.performances.reduce((total, p) => total + p.amount, 0);
	}
	function totalVolumeCredits(data) {
		let result = 0; // 변수를 반복문 앞으로
		for (let perf of data.performances) {
			result += perf.volumeCredits;
		}
		return result;
	}

	function volumeCreditsFor(aPerformance) {
		let result = 0;
		result += Math.max(aPerformance.audience - 30, 0);
		// 희극 관객 5명마다 추가 포인트를 제공한다.
		if ('comedy' === aPerformance.play.type) {
			result += Math.floor(aPerformance.audience / 5);
		}
		return result;
	}
	function amountFor(aPerformance) {
		// 함수명: (~에 대한 금액), 추출한 함수에는 그 코드가 하는 일을 설명하는 이름으로 지음
		// 값이 바뀌지 않는 변수는 매개변수로 전달
		let result = 0; // 명확한 이름으로 변경

		switch (aPerformance.play.type) {
			case 'tragedy': // 비극
				result = 40000;
				if (aPerformance.audience > 30) {
					// result += 1000 * (aPerformance.audience - 30);
					result += 1000 * (aPerformance.audience - 30);
				}
				break;
			case 'comedy': // 희극
				result = 30000;
				if (aPerformance.audience > 20) {
					result += 10000 + 500 * (aPerformance.audience - 20);
				}
				result += 300 * aPerformance.audience;
				break;
			default:
				throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
		}
		return result; // 함수 안에서 값이 바뀌는 변수 반환
	}
	// 이를 통해 play 매개변수 제거
	function playFor(aPerformance) {
		return plays[aPerformance.playID];
	}
}

// 청구 내역을 출력한다.
function renderPlainText(data) {
	let result = `청구 내역 (고객명: ${data.customer})\n`;
	for (let perf of data.performances) {
		result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
	}

	// return
	result += `총액: ${usd(data.totalAmount)}\n`;
	result += `적립 포인트: ${data.totalVolumeCredits}점 \n`;
	return result;

	// 화폐 단위 맞추기
	function usd(aNumber) {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}).format(aNumber / 100);
	}
} // end renderPlainText

console.log(statement(invoices, plays));

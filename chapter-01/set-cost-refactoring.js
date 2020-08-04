const fs = require('fs');

// 공연료 청구서를 출력하는 코드
function statement(invoice) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `청구 내역 (고객명: ${invoice.customer})\n`;
	const format = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format;

	for (let perf of invoice.performances) {
		// const play = playFor(perf); // 우변을 함수로 추출, 개별 공연에서 값을 얻음
		// 추출한 함수를 사용
		// let thisAmount = amountFor(perf);
		// 포인트를 적립한다.
		volumeCredits += Math.max(perf.audience - 30, 0);
		// 희극 관객 5명마다 추가 포인트를 제공한다.
		if ('comedy' === playFor(perf).type) {
			volumeCredits += Math.floor(perf.audience / 5);
		}
		// 청구 내역을 출력한다.
		result += ` ${playFor(perf).name}: ${format(amountFor(perf) / 100)} (${
			perf.audience
		}석)\n`;
		totalAmount += amountFor(perf);
	}

	// return
	result += `총액: ${format(totalAmount / 100)}\n`;
	result += `적립 포인트: ${volumeCredits}점 \n`;
	return result;
}

// const invoices = fs.readFileSync('./invoices.json');
const invoices = JSON.parse(fs.readFileSync('./invoices.json').toString());
const plays = JSON.parse(fs.readFileSync('./plays.json').toString());

// console.log(invoices);
const [invoicesData] = invoices;
// statement(data, plays);
console.log(statement(invoicesData, plays));

// 함수명: (~에 대한 금액), 추출한 함수에는 그 코드가 하는 일을 설명하는 이름으로 지음
// 값이 바뀌지 않는 변수는 매개변수로 전달
function amountFor(aPerformance) {
	let result = 0; // 명확한 이름으로 변경

	switch (playFor(aPerformance).type) {
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
			throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
	}
	return result; // 함수 안에서 값이 바뀌는 변수 반환
}

// 임시변수를 질의함수로 바꾸기
// 이를 통해 play 매개변수 제거
function playFor(aPerformance) {
	return plays[aPerformance.playID];
}

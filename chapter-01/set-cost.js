const fs = require('fs');

// 공연료 청구서를 출력하는 코드
function statement(invoice, plays) {
	let totalAmount = 0;
	let volumeCredits = 0;
	let result = `청구 내역 (고객명: ${invoice.customer})\n`;
	const format = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}).format;

	for (let perf of invoice.performances) {
		const play = plays[perf.playID];
		let thisAmount = 0;

		switch (play.type) {
			case 'tragedy': // 비극
				thisAmount = 40000;
				if (perf.audience > 30) {
					// thisAmount += 1000 * (perf.audience - 30);
					thisAmount += 1000 * (perf.audience - 30);
				}
				break;
			case 'comedy': // 희극
				thisAmount = 30000;
				if (perf.audience > 20) {
					thisAmount += 10000 + 500 * (perf.audience - 20);
				}
				thisAmount += 300 * perf.audience;
				break;
			default:
				throw new Error(`알 수 없는 장르: ${play.type}`);
		}

		// 포인트를 적립한다.
		volumeCredits += Math.max(perf.audience - 30, 0);
		// 희극 관객 5명마다 추가 포인트를 제공한다.
		if ('comedy' === play.type) {
			volumeCredits += Math.floor(perf.audience / 5);
		}
		// 청구 내역을 출력한다.
		result += ` ${play.name}: ${format(thisAmount / 100)} (${
			perf.audience
		}석)\n`;
		totalAmount += thisAmount;
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

const Clock = {
	today: new Date(),
};

function printOwing(invoice) {
	printBanner(); // 배너 출력 로직을 함수로 추출

	const outstanding = calculateOutstanding(invoice); // 함수가 반환하는 값을 저장

	recordDueDate(invoice); // 마감일 설정 로직을 함수로 추출
	printDetails(invoice, outstanding); // 세부 사항 출력 로직을 함수로 추출
}

function calculateOutstanding(invoice) {
	let result = 0; // 추출할 코드 복사
	// 미해결 채무(outstanding)를 계산
	for (const o of invoice.orders) {
		result += o.amount;
	}
	return result; // 수정된 값 반환
}

function recordDueDate(invoice) {
	// 마감일(dueDate)을 기록한다.
	const today = Clock.today;
	invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

// 지역변수를 매개변수로 전달
function printDetails(invoice, outstanding) {
	// 세부 사항을 출력한다.
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
	console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
//
function printBanner() {
	console.log('***********************');
	console.log('**** 고객 채무 ****');
	console.log('***********************');
}

module.exports = printOwing;

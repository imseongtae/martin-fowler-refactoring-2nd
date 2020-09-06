/**
 * 1. 잘라내서
 * 2. 붙이고
 * 3. 다듬는 방식으로 진행
 */

function reportLines(aCustomer) {
	const lines = [];
	lines.push(['name', aCustomer.name]);
	lines.push(['location', aCustomer.location]);
	// gatherCustomerData(lines, aCustomer);
	return lines;
}

// function gatherCustomerData(out, aCustomer) {
// 	out.push(['name', aCustomer.name]);
// 	out.push(['location', aCustomer.location]);
// }

module.exports = reportLines;

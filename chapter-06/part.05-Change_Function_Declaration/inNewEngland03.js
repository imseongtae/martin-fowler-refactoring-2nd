function inNewEngland(stateCode) {
	return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(stateCode);
}

// 함수 호출문
// const newEnglanders = someCustomers.filter(c => inNewEngland(c.address.state));

module.exports = inNewEngland;

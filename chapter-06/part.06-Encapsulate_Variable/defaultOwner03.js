let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };

// 게터 이름에서 get 을 제거
function defaultOwner() {
	// return defaultOwnerData;
	return Object.assign({}, defaultOwnerData);
}

function setDefaultOwner(arg) {
	defaultOwnerData = arg;
}

module.exports = { defaultOwnerData, defaultOwner, setDefaultOwner };

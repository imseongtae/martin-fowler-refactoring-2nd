let defaultOwner = { firstName: '마틴', lastName: '파울러' };

function getDefaultOwner() {
	return defaultOwner;
}

function setDefaultOwner(arg) {
	defaultOwner = arg;
}

module.exports = { defaultOwner, getDefaultOwner, setDefaultOwner };

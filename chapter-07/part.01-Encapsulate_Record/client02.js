const Organization = require('./organization02');

let result;

const organization = new Organization({ name: 'Acme Gooseberries', country: 'GB' });

function getOrganization() {
	return organization;
}

result += `<h1>${getOrganization().name}</h1>`; // 읽기 예

console.log(result);

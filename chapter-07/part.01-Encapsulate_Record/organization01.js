const organization = { name: 'Acme Gooseberries', country: 'GB' };

let result;
let newName;
result += `<h1>${organization.name}</h1>`; // 읽기 예
organization.name = newName; // 쓰기 예

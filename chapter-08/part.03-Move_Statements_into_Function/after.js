function renderPerson(outStream, person) {
	const result = [];
	result.push(`<p>${person.name}</p>`);
	// result.push(renderPhoto(person.photo));
	result.push(emitPhotoData(person.photo)); // 1. 호출자 수정 후
	return result.join('\n');
}

function photoDiv(p) {
	return ['<div>', emitPhotoData(p), '</div>'].join('\n');
}

// emitPhotoData 함수를 인라인 후
// zznew 이름을 emitPhotoData로 변경
function emitPhotoData(p) {
	return [
		`<p>title: ${p.title}</p>`,
		`<p>location: ${p.location}</p>`,
		`<p>date: ${p.date.toDateString()}</p>`,
	].join('\n');
}

// function emitPhotoData(aPhoto) {
// 	const result = [];
// 	result.push(`<p>location: ${aPhoto.location}</p>`);
// 	result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
// 	return result.join('\n');
// }

const date = new Date('May 10, 2019');

const aPerson = {
	name: 'Alex',
	photo: {
		title: 'holiday',
		location: 'Greece',
		date: date,
	},
};

console.log(renderPerson([], aPerson));

module.exports = {
	renderPerson,
	photoDiv,
};

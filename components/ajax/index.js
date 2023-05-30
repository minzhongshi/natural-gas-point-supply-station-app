import instance from './ajax.js';

export function Index(data = {}) {
	return instance({
		method: 'GET',
		url: 'saying/get',
		data,
	});
}
export function Index2(data = {}) {
	return instance({
		method: 'POST',
		url: 'Other/getdata',
		data,
	});
}
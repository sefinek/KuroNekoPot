const ipaddr = require('ipaddr.js');

module.exports = ip => {
	const range = ipaddr.parse(ip).range();
	return ['loopback', 'private', 'linkLocal', 'unspecified', 'multicast', 'reserved', 'carrierGradeNat', 'broadcast', 'benchmarking'].includes(range);
};
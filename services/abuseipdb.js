const axios = require('./axios.js');

module.exports = async (ip, ipInfo, comment, categories = '19') => {
	try {
		await axios.post('https://api.abuseipdb.com/api/v2/report', null, {
			params: {
				ip,
				categories,
				comment,
			},
			headers: {
				'Key': process.env.ABUSEIPDB_KEY,
				'Accept': 'application/json',
			},
		});

		console.log(`Reported ${ip} with ${ipInfo.count > 1 ? 'multiple requests' : 'a single request'}`);
	} catch (err) {
		console.log(err.response?.data?.errors || err.stack);
	}
};
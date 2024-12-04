const axios = require('./axios.js');

let address = null; // Holds the IP address

const fetchIPAddress = async () => {
	try {
		const { data } = await axios.get('https://api.sefinek.net/api/v2/ip');
		if (data?.success) {
			address = data.message;
		} else {
			console.error('Failed to retrieve your IP');
		}
	} catch (err) {
		console.error('Error fetching your IP', err.stack);
	}
};


setInterval(fetchIPAddress, 35 * 60 * 1000);
(async () => fetchIPAddress())();

module.exports = { fetchIPAddress, getAddress: () => address };
const { getAddress } = require('../services/serverIp.js');

module.exports = (req, res) => {
	res.render('info.ejs', {
		accept: req.headers['accept'],
		acceptEncoding: req.headers['accept-encoding'],
		acceptLanguage: req.headers['accept-language'],
		cacheControl: req.headers['cache-control'],
		connection: req.headers['connection'],
		host: req.headers['host'],
		httpRequest: `${req.method} ${req.url} HTTP/${req.httpVersion}`,
		pragma: req.headers['pragma'],
		remoteAddr: req.connection.remoteAddress,
		remotePort: req.connection.remotePort,
		requestMethod: req.method,
		requestUri: req.url,
		secGPC: req.headers['sec-gpc'],
		serverIp: getAddress(),
		serverProtocol: `HTTP/${req.httpVersion}`,
		ua: req.headers['user-agent'],
		upgradeInsecureRequests: req.headers['upgrade-insecure-requests'],
	});
};

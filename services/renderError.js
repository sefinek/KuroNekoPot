const getServerIP = require('./serverIp.js');

module.exports = (req, res, code, err) => {
	if (err) console.error(err);
	if ([429, 500, 503].includes(code)) return res.status(code).end();

	res.status(code).render(`errors/${code}.ejs`, {
		ip: getServerIP() || req.ip || req.connection.remoteAddress,
		port: req.socket.localPort,
	});
};
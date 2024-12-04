const getClientIp = require('./serverIp.js');

module.exports = (req, res, code, err) => {
	if (err) console.error(err);

	res.status(code).render(`errors/${code}.ejs`, {
		ip: getClientIp.getAddress() || req.ip || req.connection.remoteAddress,
		port: req.socket.localPort,
	});
};
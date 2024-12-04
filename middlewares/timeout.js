const timeout = require('express-timeout-handler');
const RenderError = require('../services/renderError.js');

module.exports = () => timeout.handler({
	timeout: 4000,
	onTimeout: (req, res) => RenderError(req, res, 503),
	disable: ['write', 'setHeaders', 'send', 'json', 'end'],
});
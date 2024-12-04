const rateLimit = require('express-rate-limit');
const RenderError = require('../services/renderError.js');

module.exports = rateLimit({
	windowMs: 30 * 1000,
	limit: 50,
	standardHeaders: 'draft-7',
	legacyHeaders: false,

	skip: req => req.ip === '::ffff:127.0.0.1' && process.env.NODE_ENV === 'development',
	handler: (req, res) => RenderError(req, res, 429),
});
module.exports = (req, res, code, err) => {
	if (err) console.error(err);
	res.status(code).end();
};
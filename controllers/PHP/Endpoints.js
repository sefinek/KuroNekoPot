exports.hello = (req, res) => {
	res.send('<h1>Hello world!</h1>');
};

exports.success = (req, res) => {
	res.send('OK');
};

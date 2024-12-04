exports.get = (req, res) => {
	res.render('admin/login.ejs', { error: null });
};

exports.post = (req, res) => {
	const { username, password } = req.body;
	if (username === 'admin' && password === 'admin') {
		res.redirect('/administrator/dashboard#home');
	} else {
		res.render('admin/login.ejs', { error: 'Invalid username or password' });
	}
};

exports.logout = (req, res) => {
	res.redirect('/administrator');
};
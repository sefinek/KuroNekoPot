const endpointLastModifiedDates = {};

module.exports = (req, res, next) => {
	res.setHeader('Accept-Ranges', 'bytes');
	res.setHeader('Connection', 'Keep-Alive');
	// res.setHeader('Content-Length', '');

	const currentDate = new Date().toUTCString();
	res.setHeader('Date', currentDate);
	res.setHeader('Etag', '"2aa6-6286c8c3ef858"');
	res.setHeader('Keep-Alive', 'timeout=5, max=100');
	res.setHeader('Server', 'Apache/2.4.41 (Ubuntu)');
	res.setHeader('Vary', 'Accept-Encoding');


	if (!endpointLastModifiedDates[req.originalUrl]) {
		const randomDaysAgo = Math.floor(Math.random() * 13) + 2;
		const lastModifiedDate = new Date();
		lastModifiedDate.setDate(lastModifiedDate.getDate() - randomDaysAgo);
		endpointLastModifiedDates[req.originalUrl] = lastModifiedDate.toUTCString();
	}

	res.setHeader('Last-Modified', endpointLastModifiedDates[req.originalUrl]);

	res.removeHeader('X-Powered-By');
	res.removeHeader('Transfer-Encoding');

	next();
};
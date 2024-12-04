require('dotenv').config();
const express = require('express');
const compression = require('compression');
const fs = require('node:fs');
const path = require('node:path');
const getClientIp = require('./services/serverIp.js');
const reportIpToAbuseIPDB = require('./services/abuseipdb.js');
const isLocalIP = require('./services/isLocalIP.js');
const RenderError = require('./services/RenderError.js');

const app = express();

const logger = require('./middlewares/morgan.js');
const limiter = require('./middlewares/ratelimit.js');
const timeout = require('./middlewares/timeout.js');
const headers = require('./middlewares/headers.js');

// Middleware setup
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(logger);
app.use(limiter);
app.use(timeout());
app.use(compression());
app.use(headers);
app.use(express.static('public'));
app.set('view engine', 'ejs');

const ipRequestMap = new Map();
const dataFilePath = path.join(__dirname, 'ipData.json');

// Load data from JSON file
if (fs.existsSync(dataFilePath)) {
	const fileData = fs.readFileSync(dataFilePath);
	try {
		const parsedData = JSON.parse(fileData);
		parsedData.forEach(([ip, info]) => ipRequestMap.set(ip, info));
	} catch (err) {
		console.error('Error parsing JSON data:', err);
	}
}

// Track and report IP addresses
app.use(async (req, res, next) => {
	const serverIp = getClientIp.getAddress();
	const ip = req.ip.replace('::ffff:', '');
	if (serverIp === ip || isLocalIP(ip)) return next();

	const currentTimestamp = Date.now();
	const requestLogEntry = `${req.method} ${req.originalUrl}`;
	const userAgent = req.get('User-Agent');

	const ipDetails = ipRequestMap.get(ip) || { count: 0, firstRequestTime: currentTimestamp, log: [] };
	ipDetails.count++;
	ipDetails.log.push({ entry: requestLogEntry, userAgent });
	if (ipDetails.log.length > 5) ipDetails.log.shift();

	ipRequestMap.set(ip, ipDetails);

	// Save updated data to JSON file
	try {
		fs.writeFileSync(dataFilePath, JSON.stringify(Array.from(ipRequestMap.entries()), null, 2));
	} catch (err) {
		console.error('Error writing JSON data:', err);
	}

	setTimeout(async () => {
		if (!ipRequestMap.has(ip)) return;

		const data = ipRequestMap.get(ip);
		const combinedLog = data.log.map(log => log.entry).join('\n');
		const reportMessage = data.log.length === 1 ?
			`${ip} - ${data.log[0].entry} "${data.log[0].userAgent}"` :
			`${combinedLog}\n\n${data.log[data.log.length - 1].userAgent || 'Empty useragent'}`;
		try {
			await reportIpToAbuseIPDB(ip, data, reportMessage);
			ipRequestMap.delete(ip);
			fs.writeFileSync(dataFilePath, JSON.stringify(Array.from(ipRequestMap.entries()), null, 2));
		} catch (err) {
			console.error('Error reporting IP or writing JSON data:', err);
		}
	}, 20 * 60 * 1000);

	next();
});


// Routes
app.use(require('./routes/Index.js'));
app.use(require('./routes/Admin.js'));


// Error handling
app.use((req, res) => RenderError(req, res, 404));
app.use((err, req, res, _next) => RenderError(req, res, 500, err));

// Start the server
const port = process.env.PORT || 8053;
app.listen(port, () => process.send ? process.send('ready') : console.log(`Server running at http://127.0.0.1:${port}`));
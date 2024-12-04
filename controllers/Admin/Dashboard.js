const { faker } = require('@faker-js/faker');

const stats = {
	totalUsers: faker.number.int({ min: 1000, max: 10000 }),
	newUsers: faker.number.int({ min: 20, max: 100 }),
	activeSessions: faker.number.int({ min: 200, max: 500 }),
	alertsTriggered: faker.number.int({ min: 2, max: 15 }),
	uniqueIps: faker.number.int({ min: 150, max: 800 }),
	longSessions: faker.number.int({ min: 50, max: 150 }),
};

const userIpAgentMap = new Map();

const generateUserWithIpAgent = () => {
	const email = faker.internet.email({ allowSpecialCharacters: false }).toLowerCase();
	if (!userIpAgentMap.has(email)) {
		userIpAgentMap.set(email, {
			ip: faker.internet.ip(),
			userAgent: faker.internet.userAgent(),
		});
	}
	return {
		user: faker.internet.username(),
		email,
		ip: userIpAgentMap.get(email).ip,
		userAgent: userIpAgentMap.get(email).userAgent,
	};
};

const loginStats = [];

const generateInitialLogs = () => {
	for (let i = 0; i < 15; i++) {
		loginStats.push({
			timestamp: faker.date.recent().toISOString().replace('T', ' ').substring(0, 19),
			...generateUserWithIpAgent(),
			action: faker.helpers.arrayElement(['Login', 'Account Registration', 'Password Reset', 'Logout', 'Attempted Login']),
			status: faker.helpers.weightedArrayElement([{ value: 'Successful', weight: 0.75 }, { value: 'Failed', weight: 0.25 }]),
		});
	}
};
generateInitialLogs();

const MAX_LOG_LENGTH = 100;

const tokens = {
	accessToken: faker.string.alphanumeric(40),
	refreshToken: faker.string.alphanumeric(40),
	sessionId: `SESS-${faker.string.alphanumeric(10)}-${faker.string.alphanumeric(5)}`,
	csrfToken: faker.string.alphanumeric(20).toUpperCase(),
};

const reloadCounts = {};

const generateRandomToken = (length) => faker.string.alphanumeric(length);
const generateSessionId = () => `SESS-${generateRandomToken(10)}-${generateRandomToken(5)}`;
const shouldUpdateForDev = (ip) => {
	if (!reloadCounts[ip]) reloadCounts[ip] = 0;
	reloadCounts[ip]++;
	return reloadCounts[ip] % 3 === 0;
};

const updateStats = () => {
	stats.totalUsers += faker.number.int({ min: 10, max: 30 });
	stats.newUsers = faker.number.int({ min: 15, max: 30 });
	stats.activeSessions = Math.max(200, stats.activeSessions + faker.number.int({ min: -20, max: 50 }));
	stats.alertsTriggered += faker.number.int({ min: 0, max: 5 });
	stats.uniqueIps += faker.number.int({ min: 1, max: 10 });
	stats.longSessions += faker.number.int({ min: 0, max: 5 });
};

const updateLoginStats = () => {
	if (process.env.NODE_ENV === 'production' && Math.random() > 0.4) return;

	const userWithIpAgent = generateUserWithIpAgent();
	const actions = ['Login', 'Account Registration', 'Password Reset', 'Logout', 'Attempted Login', 'Change Password', 'Update Profile', 'Download Data'];

	let action = 'Login';
	const status = faker.helpers.weightedArrayElement([{ value: 'Successful', weight: 0.8 }, { value: 'Failed', weight: 0.2 }]);
	if (status === 'Successful' && Math.random() > 0.5) {
		action = faker.helpers.arrayElement(actions.slice(2));
	}

	const newLog = {
		timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
		user: userWithIpAgent.user,
		email: userWithIpAgent.email,
		action,
		ip: userWithIpAgent.ip,
		userAgent: userWithIpAgent.userAgent,
		status,
	};

	loginStats.unshift(newLog);
	if (loginStats.length > MAX_LOG_LENGTH) loginStats.pop();
};

const updateTokens = () => {
	tokens.accessToken = generateRandomToken(40);
	tokens.refreshToken = generateRandomToken(40);
	tokens.sessionId = generateSessionId();
	tokens.csrfToken = generateRandomToken(20).toUpperCase();
};

setInterval(() => {
	if (process.env.NODE_ENV === 'production') {
		updateStats();
	}
}, 1000 * 60 * faker.number.int({ min: 3, max: 10 }));

setInterval(() => {
	if (process.env.NODE_ENV === 'production') {
		updateLoginStats();
	}
}, 1000 * 60 * faker.number.int({ min: 2, max: 8 }));

setInterval(updateTokens, 1000 * 60 * faker.number.int({ min: 60, max: 120 }));

module.exports = (req, res) => {
	const ip = req.ip;
	if (process.env.NODE_ENV === 'development') {
		if (shouldUpdateForDev(ip)) {
			updateStats();
			updateLoginStats();
		}
	}

	res.render('admin/index.ejs', {
		stats,
		loginStats,
		tokens,
	});
};
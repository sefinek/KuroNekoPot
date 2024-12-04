const morgan = require('morgan');

morgan.token('body', req => JSON.stringify(req.body));

module.exports = morgan(':remote-addr ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :body');
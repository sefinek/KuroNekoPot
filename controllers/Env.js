const path = require('node:path');
const file = path.join(__dirname, '..', 'public', 'config.txt');

module.exports = (req, res) => res.sendFile(file);
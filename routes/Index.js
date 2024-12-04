const { Router } = require('express');
const router = Router();

const NginxController = require('../controllers/Nginx.js');
const EnvController = require('../controllers/Env.js');

router.get('/', NginxController);
router.get('/.env', EnvController);

module.exports = router;
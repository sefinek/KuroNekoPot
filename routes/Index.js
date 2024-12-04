const { Router } = require('express');
const router = Router();

const NginxController = require('../controllers/Nginx.js');
const PHPInfoController = require('../controllers/PHPInfo.js');

router.get('/', NginxController);
router.get('/info.php', PHPInfoController);
router.get('/phpinfo.php', PHPInfoController);

module.exports = router;
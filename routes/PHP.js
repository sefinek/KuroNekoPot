const { Router } = require('express');
const router = Router();

const PHPInfoController = require('../controllers/PHP/Info.js');
const PHPEndpointsController = require('../controllers/PHP/Endpoints.js');

router.get('/info.php', PHPInfoController);
router.get('/phpinfo.php', PHPInfoController);

router.get('/index.php', PHPEndpointsController.success);
router.get('/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/vendor/phpunit/phpunit/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/vendor/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/vendor/phpunit/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/vendor/phpunit/phpunit/LICENSE/eval-stdin.php', PHPEndpointsController.success);
router.get('/vendor/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/phpunit/phpunit/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/phpunit/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/lib/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/lib/phpunit/phpunit/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/lib/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/lib/phpunit/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/lib/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/laravel/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/www/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/ws/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/yii/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/zend/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/ws/ec/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/V2/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/tests/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/test/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/testing/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/api/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/demo/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/cms/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/crm/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/admin/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/backup/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/blog/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/workspace/drupal/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/panel/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/public/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/apps/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/app/vendor/phpunit/phpunit/src/Util/PHP/eval-stdin.php', PHPEndpointsController.success);
router.get('/service/krashrpt.php', PHPEndpointsController.success);
router.get('/password.php', PHPEndpointsController.success);
router.get('/SQlite/main.php', PHPEndpointsController.success);

router.post('/form.php', PHPEndpointsController.success);
router.post('/hello.world', PHPEndpointsController.hello);
router.post('/cgi-bin/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/.%2e/bin/sh', PHPEndpointsController.success);
router.post('/cgi-bin/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/%%32%65%%32%65/bin/sh', PHPEndpointsController.success);

module.exports = router;
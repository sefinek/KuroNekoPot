const { Router } = require('express');
const router = Router();

const LoginController = require('../controllers/Admin/Login.js');
const DashboardController = require('../controllers/Admin/Dashboard.js');

router.get('/admin', LoginController.get);
router.get('/administrator', LoginController.get);
router.post('/administrator/login', LoginController.post);
router.get('/administrator/logout', LoginController.logout);

router.get('/administrator/dashboard', DashboardController);

module.exports = router;
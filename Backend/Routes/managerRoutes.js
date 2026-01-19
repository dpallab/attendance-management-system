const managerAuthController = require('../Controllers/managerAuthController.js');
const express = require('express');

const router = express.Router();

router.post('/managerRegister', managerAuthController.register);
router.post('/managerLogin', managerAuthController.login);

module.exports = router;











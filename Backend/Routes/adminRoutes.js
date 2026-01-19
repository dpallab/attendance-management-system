const adminAuthController = require('../Controllers/adminAuthController.js');
const express = require('express');


const router = express.Router();

router.post('/adminRegister', adminAuthController.register);
router.post('/adminLogin', adminAuthController.login);

router.get("/all-employees", adminAuthController.getAllEmployees);
router.get("/all-managers", adminAuthController.getAllManagers);

router.delete("/delete-employee/:id", adminAuthController.deleteEmployee);
router.delete("/delete-manager/:id", adminAuthController.deleteManager);

module.exports = router;











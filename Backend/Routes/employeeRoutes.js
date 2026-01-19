const employeeAuthController = require('../Controllers/employeeAuthController');
const express = require('express');
// const multer = require('multer');


  /* //For image upload code///////
const store = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'uploads/')
    },
    filename: function (req, file, cd) {
        cd(null, Date.now() + "-" + file.originalname)
    }
})
const upload = multer({ storage: store });    ///////     */

const router = express.Router();

router.post('/employeeRegister',employeeAuthController.register);
router.post('/employeeLogin', employeeAuthController.login);

module.exports = router;











const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/logoutController');


router.get('/', logoutController.handlleLogout);



module.exports = router;
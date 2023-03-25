const express = require('express');
const router = express.Router();

// const expressAsyncHandler = require('express-async-handler');
const paypalController = require('../app/controllers/PaypalController');
const isAuth = require('../util/auth');


router.get('/', paypalController.show);



module.exports = router
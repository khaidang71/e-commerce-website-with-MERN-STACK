const express = require('express');
const router = express.Router();

const expressAsyncHandler = require('express-async-handler');
const orderController = require('../app/controllers/OrderController');
const isAuth = require('../util/auth');
const isAdmin = require('../util/admin');
router.get('/', isAuth, isAdmin, expressAsyncHandler(orderController.FindAll));
router.get('/summary', isAuth, isAdmin, expressAsyncHandler(orderController.summary));
router.post('/', isAuth, expressAsyncHandler(orderController.create));
router.get('/mine', isAuth, expressAsyncHandler(orderController.history))
router.get('/:id', isAuth, expressAsyncHandler(orderController.show));
router.put('/:id/deliver', isAuth, expressAsyncHandler(orderController.deliver));
router.put('/:id/pay', isAuth, expressAsyncHandler(orderController.paid));
router.delete('/:id', isAuth, isAdmin, expressAsyncHandler(orderController.delete));


module.exports = router
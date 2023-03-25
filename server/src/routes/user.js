

const express = require('express');
const router = express.Router();

const userController = require('../app/controllerS/UserController');
const isAuth = require('../util/auth');
const isAdmin = require('../util/admin');
const generateToken = require('../util/utils');
const expressAsyncHandler = require('express-async-handler');



router.get('/', isAuth,  isAdmin, expressAsyncHandler(userController.FindAll));
router.put('/profile',isAuth, expressAsyncHandler(userController.edit));
router.get('/:id', isAuth, isAdmin, expressAsyncHandler(userController.FindOneId));
router.put('/:id', isAuth, isAdmin, expressAsyncHandler(userController.editAdmin));
router.delete('/:id', isAuth, isAdmin, expressAsyncHandler(userController.delete));
router.post('/signin', expressAsyncHandler(userController.signin));
router.post('/signup', expressAsyncHandler(userController.signup))
// router.post('/login', userController.login);
// router.post('/register', userController.register);
// router.put('/profile',  isAuth,userController.edit);
// router.get('/', userController.show);
// router.post('/login', userController.login);

module.exports = router

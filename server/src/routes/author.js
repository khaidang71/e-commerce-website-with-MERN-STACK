const isAdmin = require('../util/admin');
const isAuth = require('../util/auth');
const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/BookController');
const expressAsyncHandler = require('express-async-handler');
const { route } = require('./order');
const BookController = require('../app/controllers/BookController');


router.get('/', bookController.FindAll)


// router.get('/create',bookController.create);
// router.post('/store', bookController.store);
// router.get('/:id/edit', bookController.edit);
// router.put('/:id', bookController.update);
// router.post('/:id/reviews', isAuth, bookController.reviews)
// router.delete('/:id', isAuth, isAdmin, bookController.delete);
// router.get('/:slug', bookController.show);
// router.get('/', BookController.show);

router.post('/', isAuth, isAdmin, expressAsyncHandler(bookController.create));
router.put('/:id', isAuth, isAdmin, expressAsyncHandler(bookController.edit));
router.delete('/:id', isAuth, isAdmin, expressAsyncHandler(bookController.delete));
router.post('/:id/reviews', isAuth, expressAsyncHandler(bookController.reviews));
router.get('/search', expressAsyncHandler(bookController.search));
router.get('/admin', isAuth, isAdmin, expressAsyncHandler(bookController.admin));
router.get('/categories', expressAsyncHandler(bookController.categories));
router.get('/slug/:slug', bookController.FindOneSlug);
router.get('/:id', bookController.FindId);
// router.get('/:id', bookController.FindOneId);
// router.post('/', isAuth, isAdmin, expressAsyncHandler(bookController.create));


module.exports = router
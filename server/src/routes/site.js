const express = require('express');
const siteController = require('../app/controllers/SiteController');
const router = express.Router();
// const { data } = require('../data');
// const seedControler = require('./seed');
// // const newsController.index
// router.get('/search', siteController.search);
// router.get('/', siteController.index);

router.get('/api/seed', siteController.seed)



module.exports = router
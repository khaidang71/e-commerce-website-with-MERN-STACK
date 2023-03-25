const express = require('express')
const router = express.Router()

const inventoryController = require('../app/controllers/InventoryController');
const cartController = require('../app/controllers/CartController');
const gRNoteController = require('../app/controllers/GRNoteController');

const verifyToken = require('../middleware/user');




// router.get('/show',inventoryController.show);
router.put('/cart', verifyToken,  cartController.create);
router.get('/cart', verifyToken,  cartController.show);

router.post('/inventory',inventoryController.create);

router.put('/gRNote', gRNoteController.create)


module.exports = router

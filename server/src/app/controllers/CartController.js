const Cart = require('../models/Cart');
const Inventory = require('../models/Inventory')
const { mongooseToObject } = require('../../util/mongoose');



class CartController {
    // 
    async show(req, res, next){
        try {
            const cart = await Cart.find({user: req.userId})
            res.json({success: true, cart})
        } catch (error) {
            
        }
    }


    async create(req, res, next) {
        try {
            const {product, quantity } = req.body;
            const user = req.userId;
            const stock = await Inventory.updateOne({
                product,
                quantity: { $gt: quantity }
            }, {
                $inc: {
                    quantity: -quantity
                },
                $push: {
                    reservations: {
                        user,
                        quantity
                    }
                }
            })
            console.log('add stock:', stock);

            if (stock.modifiedCount) {
                // add to Cart

                await Cart.findOneAndUpdate({
                    user
                }, {
                    $push: {
                        products: {
                            product,
                            quantity
                        }

                    }
                }, {
                    upsert: true,
                    new: true
                })

                res.json({ success: true, message: ' add to cart', product });
            }
            else res.json({ success: true, message: ' khong du  hang' });


        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'internal server error' })
        }
    }
}
module.exports = new CartController;
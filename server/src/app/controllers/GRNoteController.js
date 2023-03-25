const GRNote = require('../models/Receipt');
const { mongooseToObject } = require('../../util/mongoose');
const Inventory = require('../models/Inventory')
const InventoryController = require('./InventoryController')


class GRNoteController {
    // 
    async create(req, res, next) {

        try {
            const { products } = req.body
            const gRNote = await new GRNote(req.body);
            for (var i = 0; i < products.length; i++) {
                const product = products[i].product;
                const quantity = products[i].quantity;
                const newproduct = await Inventory.findOneAndUpdate({
                    product
                }, {
                    $inc: {
                        quantity: +quantity
                    },

                })
                if (!newproduct) {
                    const inventory = await new Inventory({product, quantity});
                    await inventory.save()
                        .then(() => res.json({ success: true, message: 'add new inventory success successfuly' }))
                        .catch(error => {

                        });

                }
            }

            await gRNote.save()
                .then(() => res.json({ success: true, message: 'add GRNote success successfuly' }))
                .catch(error => {

                });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'internal server error' })
        }
    }
}
module.exports = new GRNoteController;
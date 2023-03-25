const Inventory = require('../models/Inventory');
const { mongooseToObject } = require('../../util/mongoose');

class InventoryController {
    // 

    async create(req, res, next){
        try {
            const inventory = await new Inventory(req.body);
            // const newUser = new User(req.body);
            await inventory.save()
                .then(() => res.json({ success: true, message: 'add inventory success successfuly' }))
                .catch(error => {

                });

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'internal server error' })
        }
    }
}
module.exports = new InventoryController;
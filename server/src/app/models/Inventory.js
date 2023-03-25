const mongoose = require('mongoose');



const Schema = mongoose.Schema;

const Inventory  = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: 'books'
    },
    quantity:{
        type: Number,
    },
    price:{
        type: Number,
    },
    discount:{
      type: Number,
    },
    reservations: {
        type: Array,
    },
}, {timestamps: true,});

module.exports = mongoose.model('Inventory', Inventory);

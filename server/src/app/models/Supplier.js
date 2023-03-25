const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Supplier = new Schema({
    name: {
        type: String,
    },
    books: [{
        type: Array,
    }],
    about: {
        type: String,
    },
    phone: {
        type: Number,
    },
    address: {
        type: Object,
    }

}, { timestamps: true, });

module.exports = mongoose.model('Supplier', Supplier);

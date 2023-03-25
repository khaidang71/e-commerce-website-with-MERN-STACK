const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

// mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Coupon = new Schema({
    exp: {
        type: Date,
    },
    price: {
        type: Number,
    },
    min: {
        type: Number,
    },
    max: {
        type: Number,
    },


}, { timestamps: true, });
module.exports = mongoose.model('Coupon ', Coupon);

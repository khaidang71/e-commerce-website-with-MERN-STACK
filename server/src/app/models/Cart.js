const mongoose = require('mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Cart = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    products:{
        type: Array,
    },
    status: {
        type: String, default: "active"
    },
    modifiedOn:{type: Date, default: Date.now}
    
}, {
  timestamps: true,
});
module.exports = mongoose.model('Cart', Cart);

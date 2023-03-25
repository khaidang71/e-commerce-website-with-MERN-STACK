const mongoose = require('mongoose');

// mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Image = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
const Receipt = new Schema({
    supplier: {
        type: Schema.Types.ObjectId,
        ref: "supplers"
    },
    receiptDate: {
        type: Date,
    },
    books: [
        {
            title: { type: String },
            price: { type: Number },
            image: {
                Image
            },
            book:{
                type: Schema.Types.ObjectId,
                ref: "books"
            }
        }
    ],
    totail: {
        type: Number,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true, });
module.exports = mongoose.model('Receipt', Receipt);

var mongoose = require('mongoose');

const Schema = mongoose.Schema;
var Image = new Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});


module.exports =  new mongoose.model('Image', Image);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Author = new Schema({
  authorName:{ 
    type: String,
    required: true,
  },
  about:{
    type: String,
    required: true
  },

  books:[{
    type: Schema.Types.ObjectId,
    ref: 'books'
  }],
},{ timestamps: true, }) ;

module.exports = mongoose.model('Author', Author);

const Book = require('../models/Book');
const { mongooseToObject, mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    //[POST] /me/stored/book
    storedBooks(req, res, next){
        Book.find({})
        .then(books =>  res.render('me/stored-books', {
            books: mutipleMongooseToObject(books)
        }))
        .catch(next);
       
    }
}
module.exports = new MeController;
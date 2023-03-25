const Book = require('../models/Book');
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { data } = require('../../data');
const User = require('../models/User');

class SiteController {
    index(req, res, next){
        Book.find({})
            .then(Books => {
                res.render('home', {
                    books: mutipleMongooseToObject(Books)
                });

            }) 
            .catch(next);

    }
    async seed(req, res){
        await Book.remove({});
        const createBooks = await Book.insertMany(data.books);
        await User.remove({});
        const createUsers = await User.insertMany(data.users);
        res.send({createBooks, createUsers});
    };    

    //[GET] /search
    // search(req, res) {
    //     res.render('search');
    // }
}
module.exports = new SiteController;
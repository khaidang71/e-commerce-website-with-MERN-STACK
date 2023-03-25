const express = require('express');
const Book = require('../app/models/Book.js')
const { data } = require('../data.js')

class seedControler {
    async seed(req, res){
    await Book.remove({});
    const createBooks = await Book.insertMany(data.books);
    res.send({ createBooks });
};    
}


module.exports = new seedControler;
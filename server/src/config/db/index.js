const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
async function connect() {
    await mongoose
        // .connect(process.env.MONGODB_URI)
        .connect("mongodb://localhost:27017/BookStoreDB")
        .then(() => {
            console.log('connect successfuly!!');
        })
        .catch((error) => {
            console.log('connect failure!!')
            console.log(error.message)
        })

}
module.exports = { connect };
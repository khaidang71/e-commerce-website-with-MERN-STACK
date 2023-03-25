// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
// import mg from 'mailgun-js';
// const mg = require('mailgun-js');

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
};

module.exports = generateToken;
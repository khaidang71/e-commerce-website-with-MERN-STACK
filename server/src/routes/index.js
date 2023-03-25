const meRouter = require('./me');
// const newsRouter = require('./news');
const siteRouter = require('./site');
const booksRouter = require('./books');
// const cartRouter = require('./cart');

// const ecommerceRoutre = require('./ecommerce');
const userPaypal = require('./paypal');
const userRouter = require('./user');

const userOrder = require('./order');

function route(app) {

    app.use('/api/books', booksRouter);
    app.use('/api/users', userRouter);
    app.use('/api/orders', userOrder);
    app.use('/api/keys/paypal', userPaypal);
    // app.use('/account', userRouter);

    // app.use('/checkout', cartRouter);
    // app.use('/api/auth', authRouter);
    // app.use('/ecommerce', ecommerceRoutre);

    app.use('/', siteRouter);


}

module.exports = route;
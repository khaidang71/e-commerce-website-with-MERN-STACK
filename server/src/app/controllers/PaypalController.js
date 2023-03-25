


class PaypalController {
    async show(req, res, next) {
        res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
    };

}
module.exports = new PaypalController;
const router = require('express').Router();
const cart = require('../controllers/controller.cart');

router.get('/cart', cart.show_cart);

module.exports = router;

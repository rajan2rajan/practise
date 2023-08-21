const shopping = require('../controllers/controller.product');
const express = require('express');
const router = express.Router();

router.get('/product/create', shopping.show_create);
router.post('/product/create', shopping.create);
router.get('/', shopping.show_list);
router.get('/product/:id', shopping.product_detail);
router.get('/homepage', shopping.homepage);
// router.get('/product/edit/:id', shopping.product_edit);
router.get('/product/delete/:id', shopping.product_delete);

module.exports = router;

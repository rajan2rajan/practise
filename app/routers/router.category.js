const router = require('express').Router();
const category = require('../controllers/controller.category');

router.get('/category/create', category.show_create);
router.post('/category/create', category.category_create);
router.get('/category', category.show_category);

module.exports = router;

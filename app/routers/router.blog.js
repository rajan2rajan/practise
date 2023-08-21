const blog = require('../controllers/controller.blog');
const router = require('express').Router();

router.get('/blog/create', blog.show_create);
router.post('/blog/create', blog.blog_create);
router.get('/', blog.home);

router.get('/blog', blog.show_view);


module.exports = router;

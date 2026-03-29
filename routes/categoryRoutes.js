const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');

router.get('/categories', auth, categoryController.getCategories);
router.post('/category', auth, categoryController.addCategory);

module.exports = router;
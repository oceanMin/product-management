const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { body } = require('express-validator');

// 验证规则
const productValidate = [
  body('name').notEmpty().withMessage('商品名称不能为空'),
  body('price').isNumeric().withMessage('价格必须是数字'),
  body('stock').isInt({ min: 0 }).withMessage('库存必须是 ≥ 0 的整数')
];

// 接口
router.get('/products', productController.getProducts);
router.get('/product/:id', productController.getProduct);
router.post('/product', productValidate, productController.addProduct);
router.put('/product/:id', productValidate, productController.editProduct);
router.delete('/product/:id', productController.delProduct);

module.exports = router;
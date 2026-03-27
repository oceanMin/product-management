const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// 商品接口
router.get('/products', productController.getProducts);       // 查询所有
router.get('/product/:id', productController.getProduct);     // 查询单个
router.post('/product', productController.addProduct);        // 新增
router.put('/product/:id', productController.editProduct);    // 修改
router.delete('/product/:id', productController.delProduct); // 删除

module.exports = router;
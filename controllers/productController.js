const productService = require('../services/productService');
const logService = require('../services/logService');
const { validationResult } = require('express-validator');

// 获取商品列表
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const keyword = req.query.keyword || '';
    const data = await productService.getAllProducts(page, limit, keyword);
    res.json({ code: 200, msg: 'success', data });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};

// 获取单个商品
exports.getProduct = async (req, res) => {
  try {
    const data = await productService.getProductById(req.params.id);
    if (!data) return res.json({ code: 404, msg: '商品不存在' });
    res.json({ code: 200, data });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};

// 新增商品
exports.addProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ code: 400, msg: '参数错误', errors: errors.array() });
  }

  try {
    const { name, price, stock, category_id } = req.body;
    if (stock < 0) return res.json({ code: 400, msg: '库存不能小于0' });

    await productService.createProduct(name, price, stock, category_id);
    await logService.addLog(req.admin.id, '新增', 'product', null, `新增商品：${name}`);
    res.json({ code: 200, msg: '添加成功' });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};

// 修改商品
exports.editProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ code: 400, msg: '参数错误', errors: errors.array() });
  }

  try {
    const { name, price, stock, category_id } = req.body;
    const id = req.params.id;

    const exists = await productService.getProductById(id);
    if (!exists) return res.json({ code: 404, msg: '商品不存在' });

    await productService.updateProduct(id, name, price, stock, category_id);
    await logService.addLog(req.admin.id, '修改', 'product', id, `修改商品：${name}`);
    res.json({ code: 200, msg: '修改成功' });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};

// 删除商品
exports.delProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const exists = await productService.getProductById(id);
    if (!exists) return res.json({ code: 404, msg: '商品不存在' });

    await productService.deleteProduct(id);
    await logService.addLog(req.admin.id, '删除', 'product', id, `删除商品ID：${id}`);
    res.json({ code: 200, msg: '删除成功' });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};
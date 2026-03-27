const productService = require('../services/productService');

// 获取所有商品
exports.getProducts = async (req, res) => {
  try {
    const data = await productService.getAllProducts();
    res.json({ code: 200, msg: 'success', data });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};

// 获取单个商品
exports.getProduct = async (req, res) => {
  try {
    const data = await productService.getProductById(req.params.id);
    res.json({ code: 200, data });
  } catch (err) {
    res.status(500).json({ code: 500 });
  }
};

// 新增商品
exports.addProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    await productService.createProduct(name, price, stock);
    res.json({ code: 200, msg: '添加成功' });
  } catch (err) {
    res.status(500).json({ code: 500 });
  }
};

// 修改商品
exports.editProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    await productService.updateProduct(req.params.id, name, price, stock);
    res.json({ code: 200, msg: '修改成功' });
  } catch (err) {
    res.status(500).json({ code: 500 });
  }
};

// 删除商品
exports.delProduct = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ code: 200, msg: '删除成功' });
  } catch (err) {
    res.status(500).json({ code: 500 });
  }
};
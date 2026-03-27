const pool = require('../config/db');

// 1. 查询所有商品
exports.getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products');
  return rows;
};

// 2. 根据ID查询单个商品
exports.getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

// 3. 新增商品
exports.createProduct = async (name, price, stock) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
    [name, price, stock]
  );
  return result;
};

// 4. 修改商品
exports.updateProduct = async (id, name, price, stock) => {
  const [result] = await pool.query(
    'UPDATE products SET name=?, price=?, stock=? WHERE id=?',
    [name, price, stock, id]
  );
  return result;
};

// 5. 删除商品
exports.deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM products WHERE id=?', [id]);
  return result;
};
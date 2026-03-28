const pool = require('../config/db');

// 查询所有（分页 + 搜索）
exports.getAllProducts = async (page = 1, limit = 10, keyword = '') => {
  const offset = (page - 1) * limit;
  let sql = `
    SELECT * FROM products 
    WHERE name LIKE ? 
    ORDER BY id DESC 
    LIMIT ? OFFSET ?
  `;
  const [rows] = await pool.query(sql, [`%${keyword}%`, limit, offset]);

  const [[{ total }]] = await pool.query(
    `SELECT COUNT(*) AS total FROM products WHERE name LIKE ?`,
    [`%${keyword}%`]
  );

  return {
    list: rows,
    page,
    limit,
    total,
    pages: Math.ceil(total / limit)
  };
};

// 根据ID查询
exports.getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
  return rows[0];
};

// 新增
exports.createProduct = async (name, price, stock) => {
  const [result] = await pool.query(
    'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
    [name, price, stock]
  );
  return result;
};

// 修改
exports.updateProduct = async (id, name, price, stock) => {
  const [result] = await pool.query(
    'UPDATE products SET name=?, price=?, stock=? WHERE id=?',
    [name, price, stock, id]
  );
  return result;
};

// 删除
exports.deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM products WHERE id=?', [id]);
  return result;
};
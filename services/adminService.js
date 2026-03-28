const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// 登录查询
exports.findByUsername = async (username) => {
  const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
  return rows[0];
};

// 密码验证
exports.comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
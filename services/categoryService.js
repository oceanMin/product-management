const pool = require('../config/db');

exports.getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM categories');
  return rows;
};

exports.create = async (name) => {
  const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
  return result;
};
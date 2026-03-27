const mysql = require('mysql2/promise');

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',         // 你的MySQL用户名
  password: 'root123',     // 你的MySQL密码
  database: 'product_db',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
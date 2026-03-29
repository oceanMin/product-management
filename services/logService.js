const pool = require('../config/db');

exports.addLog = async (adminId, action, targetType, targetId, content) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO operation_logs (admin_id, action, target_type, target_id, content) VALUES (?, ?, ?, ?, ?)',
      [adminId, action, targetType, targetId, content]
    );
    return result;
  } catch (err) {
    console.log('日志记录失败', err);
  }
};
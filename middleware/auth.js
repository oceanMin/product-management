const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/jwt');

// 验证token中间件
module.exports = (req, res, next) => {
  try {
    // 获取请求头token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ code: 401, msg: "请先登录" });
    }

    // 验证token
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ code: 401, msg: "登录已过期，请重新登录" });
      }
      req.admin = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({ code: 401, msg: "身份验证失败" });
  }
};
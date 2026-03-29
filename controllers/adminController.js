const adminService = require('../services/adminService');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/jwt');

// 登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ code: 400, msg: "账号密码不能为空" });
    }

    // 查询管理员
    const admin = await adminService.findByUsername(username);
    if (!admin) {
      return res.json({ code: 400, msg: "账号不存在" });
    }

    console.log('login',req.body,admin.password);
    // 校验密码
    const isOk = await adminService.comparePassword(password, admin.password);
    if (!isOk) {
      return res.json({ code: 400, msg: "密码错误" });
    }

    // 生成token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      secretKey,
      { expiresIn }
    );

    res.json({
      code: 200,
      msg: "登录成功",
      data: { token, username: admin.username }
    });
  } catch (err) {
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};

// 修改密码
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id; // 从token中获取

    if (!oldPassword || !newPassword) {
      return res.json({ code: 400, msg: "旧密码和新密码不能为空" });
    }
    if (newPassword.length < 6) {
      return res.json({ code: 400, msg: "新密码长度不能少于6位" });
    }

    // 查询当前管理员
    const admin = await adminService.findById(adminId);
    if (!admin) {
      return res.json({ code: 400, msg: "管理员不存在" });
    }

    // 验证旧密码
    const isOk = await adminService.comparePassword(oldPassword, admin.password);
    if (!isOk) {
      return res.json({ code: 400, msg: "旧密码错误" });
    }

    // 加密新密码
    const bcrypt = require('bcryptjs');
    const newHash = bcrypt.hashSync(newPassword, 10);

    // 更新密码
    await adminService.updatePassword(adminId, newHash);
    res.json({ code: 200, msg: "密码修改成功" });
  } catch (err) {
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};
const adminService = require('../services/adminService');
const logService = require('../services/logService');
const jwt = require('jsonwebtoken');
const { secretKey, expiresIn } = require('../config/jwt');
const bcrypt = require('bcryptjs');

// 登录
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ code: 400, msg: "账号密码不能为空" });

    const admin = await adminService.findByUsername(username);
    if (!admin) return res.json({ code: 400, msg: "账号不存在" });

    const isOk = await adminService.comparePassword(password, admin.password);
    if (!isOk) return res.json({ code: 400, msg: "密码错误" });

    const token = jwt.sign({ id: admin.id, username: admin.username }, secretKey, { expiresIn });
    await logService.addLog(admin.id, '登录', 'admin', null, '管理员登录系统');
    res.json({ code: 200, msg: "登录成功", data: { token, username: admin.username } });
  } catch (err) {
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};

// 修改密码
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    if (!oldPassword || !newPassword) return res.json({ code: 400, msg: "参数不能为空" });
    if (newPassword.length < 6) return res.json({ code: 400, msg: "密码至少6位" });

    const admin = await adminService.findById(adminId);
    const isOk = await adminService.comparePassword(oldPassword, admin.password);
    if (!isOk) return res.json({ code: 400, msg: "旧密码错误" });

    const hash = bcrypt.hashSync(newPassword, 10);
    await adminService.updatePassword(adminId, hash);
    await logService.addLog(adminId, '修改密码', 'admin', null, '修改了登录密码');
    res.json({ code: 200, msg: "密码修改成功" });
  } catch (err) {
    res.status(500).json({ code: 500, msg: "服务器错误" });
  }
};
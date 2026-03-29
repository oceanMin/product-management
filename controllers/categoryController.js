const categoryService = require('../services/categoryService');

exports.getCategories = async (req, res) => {
  try {
    const data = await categoryService.getAll();
    res.json({ code: 200, data });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    await categoryService.create(name);
    res.json({ code: 200, msg: '分类添加成功' });
  } catch (err) {
    res.status(500).json({ code: 500, msg: '服务器错误' });
  }
};
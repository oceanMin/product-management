const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());        // 解决跨域
app.use(express.json());// 解析JSON请求体

// 挂载路由
app.use('/api', productRoutes);

// 启动服务
app.listen(PORT, () => {
  console.log(`服务器运行在：http://localhost:${PORT}`);
});
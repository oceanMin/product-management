# Node.js 简易商品管理系统
## 项目介绍
这是一个基于 Node.js + Express + MySQL 搭建的轻量级商品管理系统，采用经典三层架构，实现了商品的基础增删改查功能，适合新手入门学习后端开发、接口开发，代码简洁易懂，可直接运行、二次扩展。

## 技术栈
- **后端框架**：Node.js + Express
- **数据库**：MySQL
- **数据库连接**：mysql2
- **其他**：cors（解决跨域）

## 项目架构
```bash
product-management/
├── config/          # 配置文件（数据库连接）
│   └── db.js
├── controllers/     # 控制器（处理业务逻辑）
│   └── productController.js
├── routes/          # 路由（定义接口地址）
│   └── productRoutes.js
├── services/        # 服务层（数据库操作）
│   └── productService.js
├── .gitignore       # Git忽略文件
├── app.js           # 项目入口文件
├── package.json     # 项目依赖配置
└── README.md        # 项目说明文档
```

## 环境准备
运行本项目前，请确保本地已安装以下环境：
1. **Node.js**：LTS版本即可（推荐14及以上）
2. **MySQL**：5.7/8.0版本均可
3. **代码编辑器**：VS Code
4. **接口测试工具**：Postman/Apifox

检查环境是否安装成功：
```bash
node -v
npm -v
mysql -V
```

## 项目运行步骤
### 1. 克隆/下载项目
```bash
git clone https://github.com/oceanMin/product-management.git
cd product-management
```

### 2. 安装项目依赖
```bash
npm install
```

### 3. 数据库配置
1. 打开MySQL客户端，执行SQL语句创建数据库和数据表（SQL语句如下）
2. 打开 `config/db.js` 文件，修改MySQL用户名、密码，与本地数据库保持一致

#### 数据库SQL语句
```sql
-- 创建数据库
CREATE DATABASE product_db;

USE product_db;

-- 创建商品表
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT COMMENT '商品ID',
  name VARCHAR(100) NOT NULL COMMENT '商品名称',
  price DECIMAL(10,2) NOT NULL COMMENT '商品价格',
  stock INT NOT NULL COMMENT '商品库存',
  create_time DATETIME DEFAULT NOW() COMMENT '创建时间'
);
```

### 4. 启动项目
```bash
node app.js
```
启动成功后，控制台会输出：**服务器运行在：http://localhost:3000**

## 接口文档
接口统一前缀：`http://localhost:3000/api`

| 接口功能 | 请求方式 | 接口地址 | 请求参数 |
|---------|---------|----------|----------|
| 获取所有商品 | GET | /products | 无 |
| 根据ID获取单个商品 | GET | /product/:id | id（路径参数） |
| 新增商品 | POST | /product | name, price, stock（请求体JSON） |
| 修改商品 | PUT | /product/:id | id（路径参数），name, price, stock（请求体JSON） |
| 删除商品 | DELETE | /product/:id | id（路径参数） |

### 请求示例（新增商品）
- 请求地址：POST http://localhost:3000/api/product
- 请求头：Content-Type: application/json
- 请求体：
```json
{
  "name": "苹果手机",
  "price": 5999,
  "stock": 100
}
```

## 返回格式
```json
// 成功返回
{
  "code": 200,
  "msg": "success/操作成功",
  "data": 数据内容
}

// 失败返回
{
  "code": 500,
  "msg": "服务器错误"
}
```

## 注意事项
1. 运行项目前，务必启动本地MySQL服务，否则会连接数据库失败
2. `config/db.js` 中的数据库账号密码，必须改成自己本地的配置
3. `node_modules` 文件夹已写入.gitignore，不会上传至GitHub


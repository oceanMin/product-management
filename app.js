const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api', productRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', categoryRoutes);

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});
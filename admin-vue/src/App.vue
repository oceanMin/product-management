<template>
  <div class="app-container">
    <!-- 未登录 → 登录页 -->
    <div v-if="!token" class="login-box">
      <h2>管理员登录</h2>
      <el-input v-model="loginForm.username" placeholder="账号" style="margin-bottom:15px" />
      <el-input v-model="loginForm.password" type="password" placeholder="密码" style="margin-bottom:15px" />
      <el-button type="primary" @click="login" block>登录</el-button>
    </div>

    <!-- 已登录 → 管理页面 -->
    <div v-else class="main-page">
      <header class="header">
        <span>商品管理系统</span>
        <el-button @click="logout">退出登录</el-button>
      </header>

      <div class="content">
        <!-- 搜索栏 -->
        <div class="search-bar">
          <el-input v-model="searchKey" placeholder="搜索商品名称" style="width:250px" />
          <el-button type="primary" @click="getList" style="margin-left: 10px;">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="openAdd">新增商品</el-button>
        </div>

        <!-- 商品表格 -->
        <el-table :data="list" border style="width:100%">
          <el-table-column prop="id" label="ID" />
          <el-table-column prop="name" label="商品名称" />
          <el-table-column prop="price" label="价格" />
          <el-table-column prop="stock" label="库存" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="success" size="small" @click="openEdit(scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="delItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新增/编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="商品信息" width="500px">
      <el-form label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price" type="number" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="form.stock" type="number" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确认保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

const token = ref(localStorage.getItem('token') || '')
axios.defaults.baseURL = 'http://localhost:3000/api'
axios.interceptors.request.use(config => {
  if (token.value) config.headers.Authorization = 'Bearer ' + token.value
  return config
})

// 登录
const loginForm = ref({ username: 'admin', password: '123456' })
const login = async () => {
  const res = await axios.post('/admin/login', loginForm.value)
  if (res.data.code === 200) {
    token.value = res.data.data.token
    localStorage.setItem('token', token.value)
    ElMessage.success('登录成功')
    getList()
  } else {
    ElMessage.error(res.data.msg)
  }
}

// 退出
const logout = () => {
  token.value = ''
  localStorage.removeItem('token')
  ElMessage.success('已退出')
}

// 商品列表
const list = ref([])
const searchKey = ref('')
const getList = async () => {
  const res = await axios.get('/products?keyword=' + searchKey.value)
  list.value = res.data.data.list
}

const resetSearch = () => {
  searchKey.value = ''
  getList()
}

// 弹窗
const dialogVisible = ref(false)
const form = ref({ id: 0, name: '', price: 0, stock: 0 })
const isEdit = ref(false)

const openAdd = () => {
  isEdit.value = false
  form.value = { name: '', price: 0, stock: 0 }
  dialogVisible.value = true
}

const openEdit = (row) => {
  isEdit.value = true
  form.value = { ...row }
  dialogVisible.value = true
}

// 提交
const submit = async () => {
  if (isEdit.value) {
    await axios.put('/product/' + form.value.id, form.value)
  } else {
    await axios.post('/product', form.value)
  }
  ElMessage.success('保存成功')
  dialogVisible.value = false
  getList()
}

// 删除
const delItem = async (id) => {
  await ElMessageBox.confirm('确定删除？', '提示', { type: 'warning' })
  await axios.delete('/product/' + id)
  ElMessage.success('删除成功')
  getList()
}

onMounted(() => {
  if (token.value) getList()
})
</script>

<style scoped>
.app-container {
  padding: 20px;
}
.login-box {
  max-width: 400px;
  margin: 100px auto;
  padding: 30px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.search-bar {
  margin-bottom: 15px;
}
</style>
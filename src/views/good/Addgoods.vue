<template>
  <div class="addgoods">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>添加商品信息</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-form :model="addform"  label-width="80px" :rules="rules" ref="addform">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
          <el-tab-pane label="步骤一" name="first">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addform.username" autocomplete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="步骤二" name="second">
            <el-form-item label="密  码" prop="password">
              <el-input v-model="addform.password" autocomplete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="步骤三" name="third">
            <el-form-item label="邮  箱" prop="email">
              <el-input v-model="addform.email" autocomplete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="步骤四" name="fourth">
            <el-form-item label="电  话" prop="mobile">
             <el-input v-model="addform.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="完成" name="fifth">
            <el-form-item>
             <el-button type="primary" @click="submitForm('addform')">立即创建</el-button>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </template>
      <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
      <el-button @click="resetForm('addform')">重置</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 0,
      activeName: 'first',
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ],
        mobile: [
          { required: true, message: '电话不能为空' }
        ]
      }
    }
  },
  methods: {
    next () {
      if (this.active > 4) {
        this.active = 0
      }
      this.active++
      switch (this.active) {
        case 0:
          this.activeName = 'first'
          break
        case 1:
          this.activeName = 'second'
          break
        case 2:
          this.activeName = 'third'
          break
        case 3:
          this.activeName = 'fourth'
          break
        case 4:
          this.activeName = 'fifth'
          break
        default:
          this.activeName = 'first'
          break
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!!')
          this.$message({
            type: 'success',
            message: 'submit success'
          })
          ++this.active
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleClick (tab, event) {
      switch (tab.name) {
        case 'first':
          this.active = 0
          break
        case 'second':
          this.active = 1
          break
        case 'third':
          this.active = 2
          break
        case 'fourth':
          this.active = 3
          break
        case 'fifth':
          this.active = 4
          break
        default:
          this.active = 0
          break
      }
      console.log(tab, event)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

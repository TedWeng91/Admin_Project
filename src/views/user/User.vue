<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initlist">
          <el-button slot="append" icon="el-icon-search" @click="initlist"></el-button>
        </el-input>
        <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userlist"
      border
      style="width: 100%" class="mar">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeuserstate(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary" plain @click="showeditdialog(scope.row)"></el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" plain @click="showdeletedialog(scope.row)"></el-button>
          <el-button size="mini" class="el-icon-check" type="warning" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5 "
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="addform"  label-width="80px" :rules="rules" ref="addform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮  箱" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电  话" prop="mobile">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addusersubmit('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="editform"  label-width="80px" ref="editform">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editform.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮  箱" prop="email">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电  话" prop="mobile">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editusersubmit('editform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getuserlist, changestate, adduser, getuserbyid, edituser, deleteuser} from '../../api/index.js'

export default {
  data () {
    return {
      userlist: [],
      query: '',
      pagesize: '5',
      pagenum: '1',
      total: 0,
      addDialogFormVisible: false,
      addform: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editDialogFormVisible: false,
      editform: {
        username: '',
        email: '',
        mobile: '',
        id: ''
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
  created () {
    this.initlist()
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initlist()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.initlist()
    },
    initlist () {
      getuserlist({params: {query: this.query, pagesize: this.pagesize, pagenum: this.pagenum}}).then(res => {
        console.log(res)
        this.userlist = res.data.users
        this.total = res.data.total
      })
    },
    changeuserstate (row) {
      console.log(row)
      changestate({uId: row.id, type: row.mg_state}).then(res => {
        // console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: 'success'
          })
        } else {
          this.$message.error(res.meta.msg)
        }
      })
    },
    addusersubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          // console.log(123)
          adduser(this.addform).then(res => {
            console.log(res)
            if (res.meta.status === 201) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.addDialogFormVisible = false
              this.initlist()
            }
          })
        }
      })
    },
    showeditdialog (row) {
      this.editDialogFormVisible = true
      console.log(row)
      getuserbyid(row.id).then(res => {
        if (res.meta.status === 200) {
          this.editform.username = res.data.username
          this.editform.email = res.data.email
          this.editform.mobile = res.data.mobile
          this.editform.id = res.data.id
        }
      })
    },
    editusersubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          edituser(this.editform).then(res => {
            if (res.meta.status === 200) {
              this.editDialogFormVisible = false
              this.initlist()
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
            } else {
              this.$message({
                type: 'warning',
                message: res.meta.msg
              })
            }
          })
        }
      })
    },
    showdeletedialog (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteuser(row.id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initlist()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
    margin-top: 10px;
  }
}
.mar{
  margin-top: 10px;
}
</style>

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
        <el-button type="success" plain>添加用户</el-button>
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
          <el-button size="mini" class="el-icon-edit" type="primary" plain></el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" plain></el-button>
          <el-button size="mini" class="el-icon-check" type="warning" plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getuserlist, changestate} from '../../api/index.js'

export default {
  data () {
    return {
      userlist: [],
      query: '',
      pagesize: '10',
      pagenum: '1',
      total: 0
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

<template>
  <div class="roles">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain>添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      border
      :data="rolelist"
      style="width: 100%" class="mar">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(firstchildren, index) in scope.row.children" :key="index">
            <el-col :span="3">
              <el-tag closable class=".el-tag" @close="deleteroleright(scope.row, firstchildren.id)">{{firstchildren.authName}}</el-tag>
              <i class="el-icon-arrow-right" v-if="firstchildren.children.length !== 0"></i>
            </el-col>
            <el-col :span="21">
              <el-row v-for="(secondchildren, index) in firstchildren.children" :key="index">
                <el-col :span="4">
                  <el-tag type='success' closable class=".el-tag" @close="deleteroleright(scope.row, secondchildren.id)">{{secondchildren.authName}}</el-tag>
                  <i class="el-icon-arrow-right" v-if="secondchildren.children.length !== 0"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag type='warning' closable class=".el-tag" @close="deleteroleright(scope.row, thirdchildren.id)" v-for="(thirdchildren, index) in secondchildren.children" :key="index">{{thirdchildren.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">该角色没有分配权限，请前往分配！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        width="120">
      </el-table-column>
      <el-table-column
        label="描述"
        prop="roleDesc"
        width="120">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary" plain></el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" plain></el-button>
          <el-button size="mini" class="el-icon-check" type="warning" plain @click="showaddrightDialog(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="角色授权" :visible.sync="addrightDialogFormVisible">
      <el-tree
        :data="rightlist"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expand-all="true"
        :default-checked-keys="currights"
        :props="defaultProps"
        class="treedialog">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addrightDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantrightsubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {getroleslist, deleteright, getrightlist, grantright} from '../../api/index.js'
export default {
  data () {
    return {
      rolelist: [],
      addrightDialogFormVisible: false,
      rightlist: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      currights: [],
      curroleID: ''
    }
  },
  created () {
    this.initlist()
  },
  methods: {
    initlist () {
      getroleslist().then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.rolelist = res.data
        }
      })
    },
    deleteroleright (row, rightid) {
      // console.log(row)
      deleteright({roleId: row.id, rightId: rightid}).then(res => {
        if (res.meta.status === 200) {
          row.children = res.data
          // console.log(res)
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    },
    showaddrightDialog (row) {
      this.addrightDialogFormVisible = true
      console.log(row)
      this.currole = row
      getrightlist({type: 'tree'}).then(res => {
        if (res.meta.status === 200) {
          console.log(res)
          this.rightlist = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
      this.currights.length = 0
      this.currole.children.forEach(itemone => {
        if (itemone.children && itemone.children.length !== 0) {
          itemone.children.forEach(itemtwo => {
            if (itemtwo.children && itemtwo.children.length !== 0) {
              itemtwo.children.forEach(itemthree => {
                this.currights.push(itemthree.id)
              })
            }
          })
        }
      })
    },
    grantrightsubmit () {
      let rids = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys()).join(',')
      // console.log(this.$refs.tree.getCheckedKeys())
      // console.log(rids)
      grantright({roleId: this.currole.id, rids: rids}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.$message({
            type: 'success',
            message: res.meta.msg
          })
          this.addrightDialogFormVisible = false
          this.initlist()
        } else {
          this.$message({
            type: 'error',
            message: res.meta.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
.treedialog {
  height: 300px;
  overflow: auto;
}
</style>

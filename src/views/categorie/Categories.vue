<template>
  <div class="categories">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="success" plain @click="addDialogFormVisible=true">添加分类</el-button>
      </el-col>
    </el-row>
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory" class="mar">
    </tree-grid>
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
  </div>
</template>
<script>
import TreeGrid from '../../components/TreeGrid/TreeGrid'
import {getcategories} from '../../api/index.js'
export default {
  data () {
    return {
      pagesize: '5',
      pagenum: '1',
      total: 0,
      addDialogFormVisible: false,
      dataSource: [],
      columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
      }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
      }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
      }]
    }
  },
  components: {
    TreeGrid
  },
  created () {
    this.initlist()
  },
  methods: {
    deleteCategory (cid) {
      console.log(cid)
    },
    editCategory (cid) {
      console.log(cid)
    },
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
      getcategories({type: 3, pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.dataSource = res.data.result
          this.total = res.data.total
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 5px 0;
  background-color: #D3DCE6;
  margin-top: 10px;
}
</style>

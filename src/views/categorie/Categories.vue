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
        <el-button type="success" plain @click="addcategories">添加分类</el-button>
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
    <!-- 添加商品分类对话框 -->
    <el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
      <el-form :model="addform"  label-width="80px" :rules="rules" ref="addform">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addform.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            :options="options"
            :props="props"
            v-model="selectedOptions"
            @change="handleChange">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcategoriessubmit('addform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import TreeGrid from '../../components/TreeGrid/TreeGrid'
import {getcategories, addcategories} from '../../api/index.js'
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
      }],
      addform: {
        cat_pid: 0,
        cat_level: 0,
        cat_name: ''
      },
      rules: {
        cat_name: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      },
      options: [],
      selectedOptions: [],
      props: {
        value: 'cat_id',
        label: 'cat_name'
      }
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
    },
    handleChange (value) {
      console.log(value)
    },
    addcategories () {
      this.addDialogFormVisible = true
      getcategories({type: 2}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.options = res.data
        }
      })
    },
    addcategoriessubmit (formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          if (this.selectedOptions.length === 0) {
            this.addform.cat_level = 0
            this.addform.cat_pid = 0
          } else if (this.selectedOptions.length === 1) {
            this.addform.cat_level = 1
            this.addform.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
          } else {
            this.addform.cat_level = 2
            this.addform.cat_pid = this.selectedOptions[this.selectedOptions.length - 1]
          }
          addcategories(this.addform).then(res => {
            if (res.meta.status === 201) {
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
          this.addDialogFormVisible = false
          this.initlist()
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

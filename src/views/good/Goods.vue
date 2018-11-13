<template>
  <div class="goods">
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
        <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initlist">
          <el-button slot="append" icon="el-icon-search" @click="initlist"></el-button>
        </el-input>
        <el-button type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="goodlist"
      border
      style="width: 100%" class="mar">
      <el-table-column
        prop="goods_id"
        label="编号"
        width="60">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="360">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="100">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="100">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" class="el-icon-edit" type="primary" plain @click="showeditdialog(scope.row)"></el-button>
          <el-button size="mini" class="el-icon-delete" type="danger" plain @click="showdeletedialog(scope.row)"></el-button>
          <el-button size="mini" class="el-icon-check" type="warning" plain @click="showgrantdialog(scope.row)"></el-button>
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
  </div>
</template>
<script>
import {getgoods} from '../../api/index.js'
export default {
  data () {
    return {
      loading: false,
      goodlist: [],
      query: '',
      pagesize: '5',
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
      getgoods({query: '', pagenum: this.pagenum, pagesize: this.pagesize}).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.goodlist = res.data.goods
          this.total = res.data.total
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.goods {
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

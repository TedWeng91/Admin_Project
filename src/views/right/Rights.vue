<template>
  <div class="rights">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="rightlist"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span>{{scope.row.level | filterlevel}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {getrightlist} from '../../api/index.js'
export default {
  data () {
    return {
      rightlist: [],
      loading: true
    }
  },
  created () {
    this.loading = true
    getrightlist({type: 'list'}).then(res => {
      if (res.meta.status === 200) {
        this.rightlist = res.data
        this.loading = false
      }
    })
  },
  filters: {
    filterlevel (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else {
        return '三级'
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

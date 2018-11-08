<template>
  <div>登陆成功</div>
</template>
<script>
import {getuserlist} from '../api/index.js'
export default {
  mounted () {
    let params = {params: {query: '', pagenum: 1, pagesize: 5}}
    getuserlist(params).then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

</style>

<template>
  <el-card class="box-card">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">用户管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>-->
    <!-- 自定义面包 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>

    <el-table :data="rightList" border style="width: 100%" class="td">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
   data(){
       return{
           rightList:[
            //    authName: (...)
            //     id: (...)
            //     level: (...)
            //     path: (...)
            //     pid: (...)
           ]
       }
   },
   mounted() {
       this.showright()
   },
   methods:{
       async showright(){
        //    this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
           const res = await this.$http.get(`/rights/list`)
           console.log(res);
           const data = res.data
           console.log(data);
           this.rightList = data.data
           
       }
   }
}
</script>

<style>
.box-card{
  height: 100%;
  /* overflow: auto; */
}
.td{
  margin-top: 20px;
}
</style>

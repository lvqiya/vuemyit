<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input class="searchInput" clearable placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <!-- 序号 -->
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column label="创建日期" width="100">
             <template slot-scope="list">
               {{list.row.create_time | fmtdate}}
             </template>    
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <!-- scope.row就是当前绑定的数据对象 -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button icon="el-icon-search" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {create_time: ""},
        {email: ""},
        {id: ""},
        {mg_state: ""},
        {mobile: ""},
        {role_name: ""},
        {username: ""}
      ],
      query: ""
    };
  },
  mounted() {
    this.loadData();
  },

  methods: {
    async loadData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `/users?query=${this.query}&pagenum=1&pagesize=10 `
      );
      // {
      //   headers: { Authorization: window.localStorage.getItem("token") },

      //   params: {
      //     pagenum: 1,
      //     pagesize: 10
      //   }
      // });
      const data = res.data;
      console.log(res);

      const {
        meta: { msg, status },
        data: { total, users }
      } = data;
      if (status === 200) {
        const {
          data: { users }
        } = data;
        this.total = total
        this.list = users;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput {
  width: 350px;
}
</style>

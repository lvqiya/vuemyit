<template>
  <el-card class="box-card">
    <my-bread level1="权限管理" level2="角色管理"></my-bread>
    <el-row class="row-add">
      <el-col :span="24">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="list" style="width: 100%">
      <el-table-column type="index" width="50">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row>
                <!-- 一级权限 -->
                <el-col v-for="(item1,index) in scope.row.children" :key="index">
                    <el-tag>{{item1.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col>
                    <el-row>
                        <!-- 二级权限 -->
                        <el-col></el-col>
                        <!-- 三级权限 -->
                        <el-col></el-col>

                    </el-row>
                </el-col>

            </el-row>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const res = await this.$http.get('roles')
      const { data: resData } = res
      const { data, meta: { status, msg } } = resData
      if (status === 200) {
        this.list = data
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.row-add {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

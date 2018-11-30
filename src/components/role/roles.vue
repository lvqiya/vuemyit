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
            <el-row v-for="(item1,index) in scope.row.children" :key="index">
                <!-- 一级权限 -->
                <el-col :span='4'>
                    <el-tag closable @close="deleroles(scope.row.id,item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span='20'>
                    <el-row v-for="(item2,i) in item1.children" :key="i">
                        <!-- 二级权限 -->
                        <el-col :span='4'>
                            <el-tag closable @close="deleroles(scope.row.id,item2.id)" type="success">{{item2.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <!-- 三级权限 -->
                        <el-col :span="20">
                            <el-tag closable type="success" @close="deleroles(scope.row,item3.id)" v-for="(item3,ine) in item2.children" :key="ine">{{item3.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>

                    </el-row>
                </el-col>

            </el-row>
            <el-row v-if="scope.row.children.length ===0">未分配权限</el-row>
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
    async deleroles(role,rightID){
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightID}`)
      const {data:resData} = res
      const {meta:{status,msg},data} = resData
      if (status === 200) {
        // this.loadData()
        this.$message.success(msg)
        role.children = data
      }else{
        this.$message.error(msg)
      }
      console.log(res);
      
      
    },
    async loadData() {
      const res = await this.$http.get('roles')
      const { data: resData } = res
      const { data, meta: { status, msg } } = resData
      if (status === 200) {
        this.list = data
        console.log(this.list);
        
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

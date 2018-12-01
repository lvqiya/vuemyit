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
              <el-col :span="4">
                <el-tag closable @close="deleroles(scope.row.id,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-row v-for="(item2,i) in item1.children" :key="i">
                  <!-- 二级权限 -->
                  <el-col :span="4">
                    <el-tag
                      closable
                      @close="deleroles(scope.row.id,item2.id)"
                      type="success"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <!-- 三级权限 -->
                  <el-col :span="20">
                    <el-tag
                      closable
                      type="success"
                      @close="deleroles(scope.row,item3.id)"
                      v-for="(item3,ine) in item2.children"
                      :key="ine"
                    >{{item3.authName}}</el-tag>
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
          <el-button
            plain
            size="mini"
            type="success"
            icon="el-icon-check"
            @click.prevent="shoesetrole(scope.row)"
            circle
          ></el-button>
        </template>
      </el-table-column>

      <!-- 角色对话框 -->
      
      
    </el-table>

    <el-dialog title="分配权限" :visible.sync="dialogVisibleright" width="30%">
        <!-- :default-expanded-keys="[2, 3]" -->
          <!-- :default-checked-keys="[5]" -->
        <!-- <el-tree :data="treedata" :props="defaultProps" show-checkbox default-expand-all></el-tree> -->
        <el-tree
          ref = tree
          :data="treedata"
          show-checkbox
          node-key="id"
          :default-expanded-keys="arrexpent"
          :default-checked-keys="arrcheck"
          :props="defaultProps"
        ></el-tree>
        {{arrcheck}}
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleright = false">取 消</el-button>
          <el-button type="primary" @click="setroleright()">确 定</el-button>
        </span>
      </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      dialogVisibleright: false,
      list: [],
      treedata: [],
      defaultProps:{label:'authName',children:'children'},
      arrexpent:[],
      arrcheck:[],
      // 修改权限的角色id
      sroleid:1
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async setroleright(){
      console.log(this.sroleid);
      let arr2 = this.$refs.tree.getCheckedKeys()
      let arr3 = this.$refs.tree.getHalfCheckedKeys()
      // console.log(arr2,arr3);
      let arrall = [...arr2,...arr3]
      // console.log(arrall);
      
       
      const res = await this.$http.post(`roles/${this.sroleid}/rights`,{
        rids:arrall.join(',')
      })
      const {data:resData} = res
      const {meta:{status,msg}} = resData
      if (status === 200) {
        this.dialogVisibleright = false
        this.$message.success(msg)
        this.loadData()
      }else{
        this.$message.error(msg)
      }
    },
    async shoesetrole(role) {
      // console.log(role);
      this.sroleid = role.id
      const res = await this.$http.get(`rights/tree`)
      // console.log(res);
      this.treedata = res.data.data
      const arr = []
      this.treedata.forEach((item1) => {
        // arr.push(item1.id)
        item1.children.forEach((item2) => {
          // arr.push(item2.id)
            item2.children.forEach((item3) => {
            arr.push(item3.id)
          })
        });
      });
      // console.log(arr);
      this.arrexpent = arr
      
      // 获取角色权限
      const arr1 = []
      role.children.forEach((item1) => {
        arr1.push(item1.id)
        item1.children.forEach((item2) => {
          arr1.push(item2.id)
            item2.children.forEach((item3) => {
            arr1.push(item3.id)
          })
        });
      });
      this.arrcheck = arr1
      console.log(11111);

      this.dialogVisibleright = true
    },
    async deleroles(role, rightID) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightID}`)
      const {
        data: resData
      } = res
      const {
        meta: {
          status,
          msg
        },
        data
      } = resData
      if (status === 200) {
        // this.loadData()
        this.$message.success(msg)
        role.children = data
      } else {
        this.$message.error(msg)
      }
      console.log(res);

    },
    async loadData() {
      const res = await this.$http.get('roles')
      const {
        data: resData
      } = res
      const {
        data,
        meta: {
          status,
          msg
        }
      } = resData
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

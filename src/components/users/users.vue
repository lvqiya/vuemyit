<template>
<el-card class="box-card">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
            <a href="/">用户管理</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchArea">
        <el-col :span="24">
            <el-input class="searchInput" clearable placeholder="请输入内容" v-model="query" @clear="loadData()">
                <el-button slot="append" icon="el-icon-search" @click="searchUsers()" clearable></el-button>
            </el-input>
            <el-button type="success" plain @click="showAdd()">添加用户</el-button>
        </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="姓名" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
        <el-table-column label="创建日期" width="100">
            <template slot-scope="list">{{list.row.create_time | fmtdate}}</template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <!-- scope.row就是当前绑定的数据对象 -->
                <el-switch @change="change_state(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="300">
            <template slot-scope="scope">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="showEdit(scope.row)"></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="showdel(scope.row.id)"></el-button>
                <el-button size="mini" plain type="success" icon="el-icon-check" circle @click="showset(scope.row)"></el-button>
            </template>
        </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

    <!-- 添加对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
            <el-form-item label="用户名称" label-width="100">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="100">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="Adduser()">确 定</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
            <el-form-item label="ID">
                <el-input disabled v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="Editusers()">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="DialogFormVisiblesetRole">
        <el-form label-width="100px">
            <el-form-item label="用户名" prop:>
              {{cusername}}
                <!-- <el-input disabled auto-complete="off"></el-input> -->
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="cID">
                    <el-option disabled label="请选择" :value="-1"></el-option>
                    <el-option v-for="(item,i) in roles" :label="item.roleName" :value="item.id" :key="i"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="DialogFormVisiblesetRole = false">取 消</el-button>
            <el-button type="primary" @click="setRole()">确 定</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            list: [
                //  create_time: "" ,
                //  email: "" },
                // { id: '' },
                // { mg_state: "" },
                // { mobile: "" },
                // { role_name: "" },
                // { username: "" }
            ],
            query: "",
            pagenum: 1,
            pagesize: 2,
            total: 10,
            // 对话框添加
            dialogFormVisibleAdd: false,
            dialogFormVisibleEdit: false,
            DialogFormVisiblesetRole: false,
            cusername:'',
            cID:-1,
            uID:-1,
            form: {
                username: "",
                password: "",
                email: "",
                mobile: "",

            },
            roles:[]
        };
    },
    mounted() {
        this.loadData();
    },

    methods: {
        async setRole(){
            const res = await this.$http.put(`/users/${this.uID}/role`,{
              rid:this.cID             
            })
            // console.log(res);
            const {meta:{status,msg}} = res.data
            if (status === 200) {
              this.$message.success(msg)
              this.DialogFormVisiblesetRole = false
            }
        },

        async showset(user) {
            this.DialogFormVisiblesetRole = true
            // this.form = user
            this.uID = user.id
            this.cusername = user.username
            const res = await this.$http.get(`/roles`)
            // console.log(res);
            this.roles = res.data.data
            const res1 = await this.$http.get(`/users/${user.id}`)
            this.cID = res1.data.data.rid
            
        },

        async change_state(user) {
            const res = await this.$http.put(`/users/${user.id}/state/${user.mg_state}`)
            console.log(res);
            const {meta:{status,msg}} = res.data
            if (status === 200) {
              this.$message.success(msg)
            }else{
              this.$message.error(msg)
            }

        },

        async Editusers() {
            // console.log(this.form);
            const res = await this.$http.put(`/users/${this.form.id}`, {
                mobile: this.form.mobile,
                email: this.form.email,
                // id:this.form.id
            })
            console.log(res);

            const {
                meta: {
                    status,
                    msg
                }
            } = res.data
            if (status === 200) {
                this.$message.success(msg)
                this.dialogFormVisibleEdit = false
                this.loadData()
                // for(const key in this.form){
                //   this.form[key] = ''
                // }
            } else {
                this.$message.error(msg)
            }
        },

        showEdit(lit) {
            this.dialogFormVisibleEdit = true
            this.form = lit
            //  this.form.username = lit.username
            //  this.form.id = lit.id

        },

        showdel(userID) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                .then(async () => {
                    const res = await this.$http.delete(`/users/${userID}`);
                    // console.log(res);
                    const {
                        meta: {
                            status,
                            msg
                        }
                    } = res.data;
                    if (status === 200) {

                        this.loadData();
                    } else {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        })
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },

        async Adduser() {

            const res = await this.$http.post("/users", this.form);
            console.log(res);
            const {
                meta: {
                    status,
                    msg
                },
                data
            } = res.data;
            if (status === 201) {
                this.dialogFormVisibleAdd = false;

                this.$message.success(msg);
                this.loadData();
                for (const key in this.form) {
                    this.form[key] = "";
                }
            } else {
                this.$message.error(msg);
            }
        },
        showAdd() {
            this.form = {}
            this.dialogFormVisibleAdd = true;
        },
        searchUsers() {
            this.loadData();
            this.pagenum = 1;
        },
        async loadData() {
            const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res = await this.$http.get(
                `/users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
        this.pagesize
        } `
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
                meta: {
                    msg,
                    status
                },
                data: {
                    total,
                    users
                }
            } = data;
            if (status === 200) {
                const {
                    data: {
                        users
                    }
                } = data;
                this.total = total;
                this.list = users;
            } else {
                this.$message.error(msg);
            }
        },
        handleSizeChange(val) {
            // 条数发生变化
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
            this.loadData();
            this.pagenum = 1;
        },
        handleCurrentChange(val) {
            // 页码发生变化
            console.log(`当前页: ${val}`);
            this.pagenum = val;
            this.loadData();
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

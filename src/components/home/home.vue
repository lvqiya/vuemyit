<template>
    <el-container class="container">
        <el-header class="header">
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <img src="../../assets/logo.png" alt="">
                    </div>
                </el-col>
                <el-col :span="19" class="middle">
                    <h2>电商后台管理系统</h2>
                </el-col>
                <el-col :span="1">
                    <a href="#" class="loginout" @click.prevent="handlerLoginOut()">退出</a>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="aside" width="200px">
        
                <el-menu default-active="2-1" class="menu" :unique-opened="true" :router="true">
                    <!-- 用户管理-->
                    <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item1.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+item2.path" v-for="(item2,index) in item1.children" :key="index">
                            <i class="el-icon-location"></i>
                            {{item2.authName}}
                        </el-menu-item>
                    </el-submenu>
                    <!-- 权限管理-->
                    <!-- <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item index="/roles">
                            <i class="el-icon-menu"></i>
                            角色列表
                        </el-menu-item>
                        <el-menu-item index="/rights">
                            <i class="el-icon-view"></i>
                            权限列表
                        </el-menu-item>
                    </el-submenu> -->
                    <!-- 商品管理-->
                    <!-- <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item index="3-1">
                            <i class="el-icon-menu"></i>
                            商品列表
                        </el-menu-item>
                        <el-menu-item index="3-1">
                            <i class="el-icon-view"></i>
                            分类参数
                        </el-menu-item>
                        <el-menu-item index="3-1">
                            <i class="el-icon-view"></i>
                            商品分类
                        </el-menu-item>
                    </el-submenu> -->
                    <!--订单管理-->
                    <!-- <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item index="4-1">
                            <i class="el-icon-location"></i>
                            订单列表
                        </el-menu-item>
                    </el-submenu> -->
                    <!--数据统计-->
                    <!-- <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item index="5-1">
                            <i class="el-icon-location"></i>
                            数据列表
                        </el-menu-item>
                    </el-submenu> -->

                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            menus:[]
        }
    },
    beforeCreate() {
        const token = localStorage.getItem('token')
        if(!token){
           this.$router.push({name:'login'})
        }
    },
    created() {
        this.getslider()
    },
    methods:{
        // 获取侧边栏
        async getslider(){
            const res = await this.$http.get(`menus`)
            console.log(res);
            this.menus = res.data.data
            
        },
        handlerLoginOut(){
            this.$message.success('退出成功')
            this.$router.push({name:'login'})
            sessionStorage.clear()
        }
    }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
.header .middle {
  line-height: 60px;
  color: #fff;
  text-align: center;
}
.header .middle h2 {
  margin: 0;
}
.header .loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>

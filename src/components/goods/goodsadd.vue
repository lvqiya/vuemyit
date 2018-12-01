<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1='商品管理' level2='商品列表'></my-bread>
    <!-- 提示框 -->
    <el-alert class="alert" title="添加商品信息" type="info" center :closable="false" show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active-0" finish-status="success" simple style="margin-top: 20px">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab切换 -->
    <el-tabs class="tabs" v-model="active" tab-position="left" style="height: 200px;">
        <el-tab-pane name="1" label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
</el-card>
</template>

<script>
export default {
data(){
    return{
        active:"1"
    }
}
}
</script>

<style>
.alert {
    margin-top: 26px;
    margin-bottom: 10px;
}

.form {
    height: 400px;
    overflow: auto;
}
</style>

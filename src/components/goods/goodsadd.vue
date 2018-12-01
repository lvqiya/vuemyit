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
    <el-form class="form" label-position="top" :model="form" label-width="80px" style="height: 350px;">
        <!-- 为了提交所有信息添加form -->
        <el-tabs class="tabs" v-model="active" tab-position="left" @tab-click="tabchange()">
            <el-tab-pane name="1" label="基本信息">基本信息
                <el-form-item label="商品名称">
                    <el-input v-model="form.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.goods_price"></el-input>
                </el-form-item>
                <el-form-item label="商品重量">
                    <el-input v-model="form.goods_weight"></el-input>
                </el-form-item>
                <el-form-item label="商品数量">
                    <el-input v-model="form.goods_number"></el-input>
                </el-form-item>
                <!-- 级联选择器 -->
                <!-- :props:{label,value,children}数据来源于option绑定的数据名 -->
                <el-form-item label="商品数量">
                    <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange" :props="defaultProps">
                    </el-cascader>
                </el-form-item>

            </el-tab-pane>

            <el-tab-pane name="2" label="商品参数">商品参数
                <!-- 点击二tab获取数据 -->
                <el-form-item v-for="item in dynamicsParams" :key="item.attr_id" :label="item.attr_name">
                    <el-checkbox-group v-model="item.attr_vals">
                        <el-checkbox border v-for="item2 in item.attr_vals" :key="item2" :label="item2"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>


            <el-tab-pane name="3" label="商品属性">商品属性

            </el-tab-pane>
            <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
            <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            active: "1",
            form: {
                // goods_name	商品名称	不能为空
                // goods_cat	以为','分割的分类列表	不能为空
                // goods_price	价格	不能为空
                // goods_number	数量	不能为空
                // goods_weight	重量	不能为空
                // goods_introduce	介绍	可以为空
                // pics	上传的图片临时路径（对象）	可以为空
                // attrs	商品的参数（数组）
                goods_name: '',
                goods_cat: '',
                goods_pric: '',
                goods_numbe: '',
                goods_pricer: '',
                goods_weight: '',
                goods_introduce: '',
                pics: '',
                attrs: '',
            },
            // 三级分类的数据
            options: [],
            // v-model绑定的数据
            selectedOptions: [],
            defaultProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            // 动态参数数据
            dynamicsParams: [],
            // 静态参数数据
            arrStaticparams:[]

        }
    },
    created() {
        this.getgoodslist()
    },
    methods: {
        async tabchange() {
            // console.log(1111);
            if (this.selectedOptions.length !== 3) {
                this.$message.warning('请先选择三级分类')
                return
            }
            if (this.active === "2") {

                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
                // console.log(res);
                const {
                    data: resData
                } = res
                this.dynamicsParams = resData.data
                // console.log(this.dynamicsParams);

                this.dynamicsParams.forEach(item => {
                    item.attr_vals = item.attr_vals.trim().split(',')
                });

            } else if (this.active === "3") {
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
                console.log(res);
                this.arrStaticparams = res.data.data
            }

        },
        handleChange() {

        },
        async getgoodslist() {
            const res = await this.$http.get(`categories?type=3`)
            // console.log(res);
            this.options = res.data.data
            // console.log(this.options);

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

<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
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
                    <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions" @change="handleChange" :props="defaultProps"></el-cascader>
                </el-form-item>
            </el-tab-pane>

            <el-tab-pane name="2" label="商品参数">商品参数
                <!-- 点击二tab获取数据 -->
                <el-form-item v-for="(item,i) in dynamicsParams" :key="i" :label="item.attr_name">
                    <el-checkbox-group v-model="item.attr_vals">
                        <el-checkbox border v-for="(item2,index) in item.attr_vals" :key="index" :label="item2"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>

            <el-tab-pane name="3" label="商品属性">商品属性
                <el-form-item :label="item.attr_name" v-for="(item,i) in arrStaticparams" :key="i">
                    <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane name="4" label="商品图片">商品图片
                <el-upload action="http://127.0.0.1:8888/api/private/v1/upload" :on-remove="handleRemove" :on-success="handleSuccess" :on-preview="handlePreview" :headers="tokenHeader" list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane name="5" label="商品内容">
                <el-form-item>
                    <el-button type="primary" round @click="addgoods()" class="ff-btn">添加按钮</el-button>
                    <quill-editor v-model="form.goods_introduce"></quill-editor>
                </el-form-item>
            </el-tab-pane>
        </el-tabs>
    </el-form>
</el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    data() {
        return {
            active: "1",
            form: {
                // goods_name	商品名称	不能为空

                // goods_price	价格	不能为空
                // goods_number	数量	不能为空
                // goods_weight	重量	不能为空

                goods_name: '',
                goods_cat: '', // goods_cat	以为','分割的分类列表	不能为空一个组件级联选择器
                goods_pric: '',
                goods_numbe: '',
                goods_pricer: '',
                goods_weight: '',
                goods_introduce: '',
                pics: [], // pics	上传的图片临时路径（对象）	可以为空组件四
                attrs: [], // attrs	商品的参数（数组）
            },
            // 三级分类的数据
            options: [],

            // v-model绑定的数据
            selectedOptions: [1, 3, 6],
            defaultProps: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            // 动态参数数据
            dynamicsParams: [],
            // 静态参数数据
            arrStaticparams: [],
            //   图片上传头部信息
            tokenHeader: {
                Authorization: localStorage.getItem("token")
            }

        }
    },
    created() {
        this.getgoodslist()
    },
    methods: {
        async addgoods() {
            this.form.goods_cat = this.selectedOptions.join(',')
            // this.form.pics=''
            // attr开始
            const dy = this.dynamicsParams
            const ar = this.arrStaticparams
            // console.log(ar);

            const arr1 = dy.map((item1) => {
                item1.attr_vals = item1.attr_vals.join(',')
                return {
                    attr_id: item1.attr_id,
                    attr_value: item1.attr_vals
                }
            })
            const arr2 = ar.map((item2) => {
                // console.log(item2);

                // item2.attr_vals = item2.attr_vals.join(',')
                // return {attr_id:item2.attr_id,attr_value:item2.attr_vals}
                // item2.attr_vals = item2.attr_vals.join(',')
                return {
                    attr_id: item2.attr_id,
                    attr_value: item2.attr_vals
                }
            })
            this.form.attrs = [...arr1, ...arr2]
            console.log(this.form.attrs);
            const {
                data: {
                    meta: {
                        status,
                        msg
                    }
                }
            } = await this.$http.post('goods', this.form)
            if (status === 201) {
                this.$message.success(msg)
                this.$router.push({
                    name: 'goods'
                })
            } else {
                this.$message.error(msg)
            }
            // this.form.attrs=''
            const res = await this.$http.post(`goods`, this.form)
        },
        handlePreview(file) {

        },
        handleRemove(file, fileList) {
            const index = this.form.pics.findIndex((item) => {
                return item.pic === file.response.data.tmp_path
            })

            console.log(index);

            this.form.pics.splice(index, 1)
            console.log(this.form.pics);

        },

        handleSuccess(response, file, fileList) {
            const {
                meta,
                data
            } = response
            // this.form.pics.push({pic:response.data.tmp_path})

            if (meta.status === 200) {
                this.$message.success('图片上传成功')
                this.form.pics.push({
                    pic: response.data.tmp_path
                })
            } else {
                this.$message.error(meta.msg)
            }
        },
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
                    item.attr_vals = item.attr_vals.trim().length === 0 ? [] : item.attr_vals.trim().split(',')
                });

            } else if (this.active === "3") {
                const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
                // console.log(res);
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

.ff-btn {
    margin-top: 10px;
    margin-bottom: 20px;
}

.ql-editor {
    min-height: 300px;
}
</style>

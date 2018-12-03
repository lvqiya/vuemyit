<template>
<el-card class="box-card">
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning" :closable="false" show-icon></el-alert>
    <el-row>
        <el-col :span="24" class="col">
            <span>请选择商品分类</span>
            <el-cascader :options="options" v-model="selectedOptions" :show-all-levels="false" :props="{ label:'cat_name', value:'cat_id'}" expand-trigger="hover" @change="handleChange()"></el-cascader>
            <el-tabs>
                <el-tab-pane label="动态参数">
                    <el-button :disabled="isDisabled" type="primary" size="mini">设置动态参数</el-button>
                    <!-- 
                        <el-table-column type="expand" width="40">

                        </el-table-column>

                    </el-table> -->

                    <el-table :data="dynamicParams" style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="scope">
                                <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" :disable-transitions="false" @close="handleClose(scope.row,index)" closable>{{item}}</el-tag>
                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)"></el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="index" label="#" width="40"></el-table-column>
                        <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primany" icon="el-icon-edit" plain></el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            options: [],
            selectedOptions: [],
            dynamicParams: [],
            activeName: 'many',
            isDisabled: true,
            inputVisible: false,
            inputValue: '',

        }
    },
    created() {
        this.shoulist()
    },
    methods: {
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        async handleInputConfirm(attr) {
            let inputValue = this.inputValue;
            if (inputValue) {
                attr.attr_vals.push(inputValue);
                // 发送请求
                // categories/:id/attributes
                // attr_name	参数名称	不能为空
                // attr_sel	[only,many]	不能为空
                // attr_vals	如果是 many 就需要填写值的选项，以逗号分隔

                const res = await this.$http.post(
                    `categories/${this.selectedOptions[2]}/attributes`, {
                        attr_name: attr.attr_name,
                        attr_sel: "many",
                        attr_vals: attr.attr_vals.join(",")
                    }
                );
                console.log(res);
            }
            this.inputVisible = false;
            this.inputValue = "";
        },
        async handleClose(row, index) {
            row.attr_vals.splice(index, 1)
            const catid = row.cat_id
            const attrid = row.attr_id
            const putData = {
                attr_name: row.attr_name,
                attr_sel: row.attr_sel,
                attr_vals: row.attr_vals.join(',')
            }
            // 让数据一致
            row.attr_vals = putData.attr_vals
            const url = `/categories/${catid}/attributes/${attrid}`
            const res = await this.$http.put(url, putData)
            // console.log(res)
            if (res.data.meta.status === 200) {
                this.$message.success('更新成功')
                this.dynamicParams.forEach(item => {
                    item.attr_vals =
                        item.attr_vals.trim().length === 0 ? [] :
                        item.attr_vals.trim().split(",");

                    // item.attr_vals = item.attr_vals.trim().split(',')
                });
            } else {
                this.$message.error('更新失败')
            }
        },
        async handleChange() {
            if (this.selectedOptions.length === 3) {
                // 获取动态参数数据
                const res = await this.$http.get(
                    `categories/${this.selectedOptions[2]}/attributes?sel=many`
                );
                // console.log(res)
                this.dynamicParams = res.data.data;
                console.log(this.dynamicParams);
                this.dynamicParams.forEach(item => {
                    item.attr_vals =
                        item.attr_vals.trim().length === 0 ? [] :
                        item.attr_vals.trim().split(",");

                    // item.attr_vals = item.attr_vals.trim().split(',')
                });
            }
        },
        async shoulist() {
            const res = await this.$http.get(`categories?type=3`)
            this.options = res.data.data
        }

    }
}
</script>

<style>
</style>

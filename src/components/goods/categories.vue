<template>
<el-card class="box-card">
    <my-bread level1='商品管理' level2='分类参数'></my-bread>
    <el-alert class="alert" title="注意:只允许为第三级分类设置参数" type="warning" :closable="false" show-icon></el-alert>
    <el-row>
        <el-col :span="24" class="col">
            <span>请选择商品分类</span>
            <el-cascader :options="options" v-model="selectedOptions" :show-all-levels="false" :props="{ label:'cat_name', value:'cat_id'}" expand-trigger="hover" @change="handleChange">
            </el-cascader>
            <el-tabs v-model="activeName">
                <el-tab-pane label="动态参数" name="many">
                    <el-button :disabled="isDisabled" type="primary" size="mini">设置动态参数</el-button>
                    <el-table :data="dynamicParams" style="width: 100%">
                        <el-table-column type="expand" width="40">
                            <template slot-scope="scope">
                                <el-tag v-for="(item, index) in scope.row" :key="index" closable :disable-transitions="false" @close="handleClose(scope.row, index)">
                                    {{item}}
                                </el-tag>
                                <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small">
                                </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                            </template>
                        </el-table-column>

                        <el-table-column prop="index" label="#" width="40">
                        </el-table-column>

                        <el-table-column prop="attr_name" label="属性名称" width="180">
                        </el-table-column>

                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="primany" icon="el-icon-edit" plain></el-button>
                                <el-button size="mini" type="danger" icon="el-icon-delete" plain></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="静态参数" name="only">
                    <el-button :disabled="isDisabled" type="primary" size="mini">设置静态参数</el-button>
                    <el-table :data="staticParams" style="width: 100%">
                        <el-table-column type="expand" width="40">
                            <template slot-scope="scope"></template>
                        </el-table-column>
                        <el-table-column prop="index" label="#" width="40">
                        </el-table-column>
                        <el-table-column prop="attr_name" label="属性名称" width="180">
                        </el-table-column>
                        <el-table-column prop="attr_vals" label="属性值" width="180">
                        </el-table-column>
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
            activeName: 'many',
            dynamicParams: [],
            staticParams: [],
            isDisabled: true,
            inputVisible: false,
            inputValue: ''
        }
    },
    created() {
        this.loadOptions()
    },
    methods: {
        async handleClose(row, index) {
            // row.params.splice(index, 1)
            // // 准备请求的数据
            // // 准备url上需要的id
            // const catId = row.cat_id
            // const attrId = row.attr_id
            // // console.log(catId, attrId)
            // // put携带的对象
            // const putData = {
            //     attr_name: row.attr_name,
            //     attr_sel: row.attr_sel,
            //     attr_vals: row.params.join(',')
            // }
            // // 让数据一致
            // row.attr_vals = putData.attr_vals
            // // 发送请求
            // const url = `/categories/${catId}/attributes/${attrId}`
            // const res = await this.$http.put(url, putData)
            // // console.log(res)
            // if (res.data.meta.status === 200) {
            //     this.$message.success('更新成功')
            // } else {
            //     this.$message.error('更新失败')
            // }
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        async handleInputConfirm(row) {
            // // this.dynamicParams.push(attr_vals)
            // // row.attr_vals.puah(row.attr_vals)
            // console.log( row.attr_vals);

            // // 准备请求的数据
            // // 准备url上需要的id
            // const catId = row.cat_id
            // const attrId = row.attr_id
            // // console.log(catId, attrId)
            // // put携带的对象
            // const putData = {
            //     attr_name: row.attr_name,
            //     attr_sel: row.attr_sel,
            //     // attr_vals: row.attr_val.join(',')
            // }
            // // 让数据一致
            // row.attr_vals = putData.attr_vals
            // // 发送请求
            // const url = `/categories/${catId}/attributes/${attrId}`
            // const res = await this.$http.put(url, putData)
            // // console.log(res)
            // if (res.data.meta.status === 200) {
            //     this.$message.success('更新成功')
            // } else {
            //     this.$message.error('更新失败')
            // }
        },
        handleChange() {
            if (this.selectedOptions.length === 3) {
                this.isDisabled = false
                this.loadTableData()
            } else {
                this.isDisabled = true
            }
        },
        async loadOptions() {
            const {
                data: {
                    data,
                    meta: {
                        status,
                        msg
                    }
                }
            } = await this.$http.get(`categories?type=3`)
            if (status === 200) {
                this.options = data
                // console.log(this.options)
            } else {
                this.$message.error(msg)
            }
        },
        async loadTableData() {
            if (this.selectedOptions.length !== 3) {
                this.$message.warning('请选择三级分类')
                return
            }
            const {
                data: {
                    data,
                    meta: {
                        status,
                        msg
                    }
                }
            } =
            await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeName}`)
            if (status === 200) {
                this.dynamicParams = data
                // 动态参数attr_vals -> 数组
                // 在动态参数数组上添加一个属性params 保存
                this.dynamicParams.forEach((item) => {
                    console.log(item.attr_vals)
                    const arr = item.attr_vals.trim().split(',').length === 0 ? [] : item.attr_vals.trim().split(',')
                    console.log(arr);
                    this.$set(item, 'params', arr)
                    console.log(item.attr_vals)

                })
            } else {
                this.$message.error(msg)
            }
        }
    }
}
</script>

<style>
.alert {
    margin-top: 16px;
}

.col {
    margin-top: 16px;
    margin-bottom: 20px;
    font-size: 14px;
}
</style>

<template>
<el-card class="card-box">
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <el-row class="row-add">
        <el-col :span="24">
            <el-row class="searchArea">
                <el-col :span="24">
                    <el-input class="searchInput" clearable placeholder="请输入内容" v-model="query" @clear="loadData()">
                        <el-button slot="append" icon="el-icon-search" @click="searchUsers()" clearable></el-button>
                    </el-input>
                    <el-button type="success" plain>添加分类</el-button>
                </el-col>
            </el-row>
            
        </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table height="450px" :data="list" style="width: 100%">
        <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
        <el-table-column prop="cat_level" label="级别" width="180">
            <!-- 级别 -->
            <template slot-scope="scope">
                <span v-if="scope.row.cat_level === 0">一级</span>
                <span v-else-if="scope.row.cat_level === 1">二级</span>
                <span v-else-if="scope.row.cat_level === 2">三级</span>
            </template>
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效">
            <template slot-scope="scope">{{ scope.row.cat_deleted ? '无效' : '有效'}}</template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
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
    created() {
        this.loadData()
    },
    methods: {
        async loadData() {
            const {
                data: resData
            } = await this.$http.get('categories?type=3')
            const {
                data
            } = resData
            this.list = data
        }
    }
}
</script>

<style>
.searchArea {
    margin-top: 10px;
    margin-bottom: 10px;
}

.searchArea .searchInput {
    width: 350px;
}
</style>

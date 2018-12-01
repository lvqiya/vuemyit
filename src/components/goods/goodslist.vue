<template>
<el-card class="box-card">
    <my-bread level1='商品管理' level2='商品列表'></my-bread>

    <!-- 搜索框 -->
    <el-row class="searchArea">
        <el-col :span="24">
            <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
                <el-button @click="handleSearch()" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button @click="$router.push({name:'goodsadd'})" type="success" plain>添加商品</el-button>
        </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table height="450px" border stripe v-loading="loading" :data="list" style="width: 100%">

        <!-- 序号 -->
        <el-table-column type="index">
        </el-table-column>

        <el-table-column prop="goods_name" label="商品名称">
        </el-table-column>

        <el-table-column prop="goods_price" label="商品价格(元)" width="100">
        </el-table-column>

        <el-table-column prop="goods_weight" label="商品重量" width="80">
        </el-table-column>

        <el-table-column label="创建日期" width="120">
            <template slot-scope="scope">
                {{scope.row.add_time | fmtdate('YYYY-MM-DD')}}
            </template>
        </el-table-column>

        <el-table-column label="操作" width="100">
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
            searchValue: '',
            loading: false,
            list: []
        }
    },
    created() {
        this.loadData()
    },
    methods: {

        handleSearch() {

        },
        async loadData() {
            this.loading = true
            const {
                data: resData
            } = await this.$http.get(`goods?pagenum=1&pagesize=200`)
            this.loading = false
            this.list = resData.data.goods
            // console.log(this.list)
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

<template>
  <div class="union-bank">
    <el-dialog title="联行号查询"
               :before-close="handleClose"
               width="880px"
               :visible.sync="visible">
      <el-form :inline="true">
        <el-form-item label="省份">
          <el-select v-model="provinceName" placeholder="请选择省份">
            <el-option
              v-for="item in provinceList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="listQuery.city" placeholder="请选择城市">
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="listQuery.keyWords" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="query" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中">
        <el-table-column width="50" property="id" label="序号"></el-table-column>
        <el-table-column width="100" property="cnapsNo" label="联行行号"></el-table-column>
        <el-table-column width="260" property="bankName" label="银行名称"></el-table-column>
        <el-table-column width="320" property="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="selectUnionBank(scope.row.cnapsNo)" type="text">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 分页 -->
      <div class="pages" v-show="!listLoading">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNo"
          :page-size="listQuery.pageSize"
          layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchGetProvince, fetchGetCity, fetchGetUnionBank } from 'api/home/account'
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: false,
        provinceName: '',
        provinceList: [],
        cityList: [],
        listQuery: {
          province: '',
          city: '',
          keyWords: '',
          pageNo: 1,
          pageSize: 10
        }
      }
    },
    watch: {
      provinceName: function (val) { // eslint-disable-line
        this.getCity(val);
      }
    },
    methods: {
      getPageList() {
        this.listQuery.province = this.provinceName;
        fetchGetUnionBank(this.listQuery).then(response => {
          if (response.data.meta.code === 200) {
            this.list = response.data.data.data;
            this.total = response.data.data.count || 0;
          }
        })
      },
      handleClose() {
        this.$emit('close');
      },
      selectUnionBank(value) {
        this.$emit('select-union-bank', value);
        this.$emit('close');
      },
      getProvince() {
        fetchGetProvince().then(response => {
          if (response.data.meta.code === 200) {
            this.provinceList = response.data.data;
          }
        })
      },
      getCity(val) {
        if (!val) return;
        fetchGetCity(val).then(response => {
          if (response.data.meta.code === 200) {
            this.cityList = response.data.data;
          }
        })
      },
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      },
      query() {
        if (!this.provinceName) {
          this.$message({
            message: '请选择省份',
            type: 'warning'
          });
          return;
        }
        if (!this.listQuery.city) {
          this.$message({
            message: '请选择城市',
            type: 'warning'
          });
          return;
        }
        this.getPageList();
      }
    },
    created() {
      this.getProvince();
    }
  }
</script>

<style lang="scss">
  .union-bank {
    .el-form-item__label {
      padding: 0 3px 0 0;
    }
  }
</style>

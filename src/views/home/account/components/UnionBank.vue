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
          <el-select v-model="cityName" placeholder="请选择城市">
            <el-option
              v-for="item in cityList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关键词">
          <el-input v-model="keyWords" placeholder="请输入关键词"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="query" type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="list">
        <el-table-column property="id" label="序号"></el-table-column>
        <el-table-column property="cnapsNo" label="联行行号"></el-table-column>
        <el-table-column property="bankName" label="银行名称"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
        <el-table-column property="" label="选择"></el-table-column>
      </el-table>
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
    data() {
      return {
        list: null,
        keyWords: '',
        provinceName: '',
        provinceList: [],
        cityName: '',
        cityList: []
      }
    },
    watch: {
      provinceName: function (val) { // eslint-disable-line
        this.getCity(val);
        console.log(val);
      }
    },
    methods: {
      getUnionBank() {
        const requestData = {};
        requestData.province = this.provinceName;
        requestData.city = this.cityName;
        requestData.keyWords = this.keyWords;
        fetchGetUnionBank().then(response => {
          console.log(response);
        })
      },
      handleClose() {
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
      query() {
        this.getUnionBank();
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

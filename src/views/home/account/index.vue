<template>
  <div class="account-wrapper">
    <!-- 用户快捷操作工具栏 -->
    <div class="account-wrapper__top">
      <account-top></account-top>
    </div>
  
    <!-- 我的资产 -->
    <div class="account-wrapper__asset">
      <account-asset :data="assetData"></account-asset>
     </div>
    
    <div class="account-wrapper__invest receptacle-view">
      <h1>我的投资</h1>
      <invest-chart :data="chartData"
                    class="chart"
                    :options="chartOptions"
                    :width="200" :height="200"></invest-chart>
    </div>
  </div>
</template>

<script>
  import { fetchAsset } from '@/api/account';
  import InvestChart from './InvestChart.vue';
  import AccountTop from './account-top.vue';
  import AccountAsset from './account-asset.vue';
  
  export default {
    components: {
      InvestChart,
      AccountTop,
      AccountAsset
    },
    data() {
      return {
        dialogVisible: false,
        assetData: { },
        chartData: {
          labels: ['新手计划', '21天计划', '升薪宝量化', '升薪宝定期', '定期抵押'],
          datasets: [
            {
              backgroundColor: ['#f8e71c', '#ffa837', '#b8e986', '#50e3c2', '#06b7f0'],
              data: [40, 20, 80, 10, 50]
            }
          ]
        },
        chartOptions: {
          responsive: false,
          segmentShowStroke: false,
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          }
        }
      }
    },
    methods: {
      // 获取我的资产数据
      getAsset() {
        fetchAsset().then(response => {
          if (response.data.meta.code === 200) {
            this.assetData = response.data.data;
          }
        })
      }
    },
    created() {
      this.getAsset();
    }
  }
</script>

<style lang="scss">
  .receptacle-view {
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
  }
  
  .account-wrapper__top {
    margin-top: 8px;
  }
  
  .account-wrapper__asset {
    margin-top: 16px;
  }

  .account-wrapper__invest {
    width: 100%;
    height: 384px;
    margin-top: 16px;
    
    h1 {
      font-size: 20px;
      line-height: 1;
      color: rgb(39, 65, 97);
      padding-top: 20px;
      margin-left: 27px;
    }
    
    .chart {
      margin-left: 20px;
      margin-top: 60px;
      height: 200px;
      width: 200px;
    }
  }
</style>

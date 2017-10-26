<template>
  <div class="account-invest__wrapper">
    <h1>我的投资</h1>
    <invest-chart :data="chartData"
                  class="chart"
                  :options="chartOptions"
                  :width="200" :height="200"></invest-chart>
  </div>
</template>
<script>
  import InvestChart from './InvestChart.vue';
  
  export default {
    components: {
      InvestChart
    },
    data() {
      return {
        dialogVisible: false,
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
          },
          cutoutPercentage: 70
        }
      }
    }
  }
</script>

<style lang="scss">
  .account-invest__wrapper {
    width: 100%;
    height: 384px;
    margin-top: 16px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    
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

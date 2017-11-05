<template>
  <div class="account-invest__wrapper">
    <div class=""></div>
    <h1>我的投资</h1>
    <div class="fl">
      <invest-chart :chart-data="chartData"
                    class="chart"
                    :options="chartOptions"
                    :width="200" :height="200"></invest-chart>
    </div>
    <div class="fr">
      <table>
        <thead>
          <tr>
            <td class="td1"><i></i></td>
            <td class="td2">&nbsp本金</td>
            <td class="td3">收益</td>
            <td class="td4"><i></i></td>
          </tr>
        </thead>
        <tbody>
        <tr v-for="item in list" :key="item.order">
          <td class="td1">
            <span v-bind:style="{ background: item.color}"></span>{{item.label}}
          </td>
          <td class="td2">
            <span class="num">{{item.sum}}</span>元
          </td>
          <td class="td3">
            <span class="num">{{item.interest}}</span>元
          </td>
          <td class="td4">
            <button>立即投资</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
  import InvestChart from './InvestChart.vue';
  import { fetchInvest } from 'api/home/account';
  import { getInvestData } from 'utils/home/index';

  export default {
    components: {
      InvestChart
    },
    data() {
      return {
        dialogVisible: false,
        chartData: null,
        chartOptions: {
          responsive: true,
          segmentShowStroke: false,
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          },
          cutoutPercentage: 70
        },
        list: []
      }
    },
    methods: {
      getData() {
        fetchInvest().then(response => {
          const data = response.data;
          if (data.meta.code === 200 && data.data) {
            this.list = getInvestData(data.data);
            const chartData = {
              labels: [],
              datasets: [
                {
                  backgroundColor: [],
                  data: []
                }
              ]
            };
            if (this.list.length) {
              this.list.forEach(v => {
                chartData.labels.push(v.label);
                chartData.datasets[0].backgroundColor.push(v.color);
                chartData.datasets[0].data.push(v.sum);
              });
            }
            this.chartData = chartData;
          }
        })
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style lang="scss">
  .account-invest__wrapper {
    overflow: hidden;
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

    .fl {
      width: 232px;
    }

    .fr {
      width: 600px;
    }

    table {
      color: #394b67;

      thead {
        font-size: 20px;
      }

      tbody {
        font-size: 16px;
      }

      tr {
        height: 50px;
        line-height: 50px;
      }

      i {
        display: inline-block;
        position: relative;
        bottom: 5px;
        width: 100%;
        height: 4px;
        background-color: #dfe8f0;
      }

      .td1 {
        width: 137px;

        span {
          display: inline-block;
          width: 14px;
          height: 14px;
          margin-right: 10px;
          border-radius: 100px;
          background-color: #f8e71c;
        }
      }

      .td2 {
        width: 167px;
        color: #7c86a2;
        text-indent: 1em;
      }

      .td3 {
        width: 75px;
        color: #7c86a2;
      }

      .td4 {
        width: 160px;
        text-align: right;

        button {
          display: inline-block;
          width: 80px;
          height: 26px;
          margin-right: 20px;
          border-radius: 100px;
          background-color: #fff;
          border: solid 1px #378ff6;
          color: #0671f0;
          font-size: 14px;
        }
  
        button:hover {
          background-color: #0671f0;
          color: #fff;
        }
      }
    }
  }
</style>

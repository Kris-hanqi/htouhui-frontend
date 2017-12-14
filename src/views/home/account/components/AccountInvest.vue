<template>
  <div class="account-invest__wrapper">
    <hth-panel title="我的投资" v-loading="loading" element-loading-text="数据加载中...">
      <div class="col-row">
        <div class="col-md-4" style="padding: 40px">
          <invest-chart :chart-data="chartData"
                        style="margin-top: 50px"
                        v-show="showChart !== 0"
                        :options="chartOptions"
                        :width="160" :height="160"></invest-chart>
          <div style="margin-top: 40px;" v-show="showChart === 0">
            <i class="ku-icon icon-round"></i>
          </div>
        </div>
      </div>
      <div class="col-md-8" style="padding: 0">
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
              <span class="num">{{ item.sum | currency('') }}</span>元
          </td>
            <td class="td3">
              <span class="num">{{ item.interest | currency('') }}</span>元
          </td>
            <td class="td4">
              <el-button round
                         :disabled="item.disabled"
                         type="primary"
                         size="mini"
                         @click="toInvestPage(item.url)" plain>立即投资</el-button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </hth-panel>
  </div>
</template>
<script>
  import InvestChart from './InvestChart.vue';
  import HthPanel from 'common/Panel/index.vue';
  import { fetchInvest } from 'api/home/account';
  import { getInvestData } from 'utils/home/index';
  import { getLocationUrl } from 'utils/index';

  export default {
    components: {
      HthPanel,
      InvestChart
    },
    data() {
      return {
        loading: false,
        showChart: 0,
        dialogVisible: false,
        chartData: null,
        chartOptions: {
          responsive: true,
          segmentShowStroke: false,
          legend: {
            display: false
          },
          tooltips: {
            enabled: false // 关闭提示
          },
          cutoutPercentage: 70
        },
        list: []
      }
    },
    methods: {
      getData() {
        this.loading = true;
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
                this.showChart = v.sum + this.showChart;
              });
            }
            this.chartData = chartData;
          }
          this.loading = false;
        })
      },
      toInvestPage(url) {
        window.location.href = getLocationUrl() + url;
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style lang="scss">
  .account-invest__wrapper {
    .icon-round {
      font-size: 150px;
      color: #eee;
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
      }
    }
  }
</style>

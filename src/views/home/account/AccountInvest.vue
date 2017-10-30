<template>
  <div class="account-invest__wrapper">
    <div class=""></div>
    <h1>我的投资</h1>
    <div class="fl">
      <invest-chart :data="chartData"
                    class="chart"
                    :options="chartOptions"
                    :width="200" :height="200"></invest-chart>
    </div>
    <div class="fr">
      <table>
        <thead>
        <tr>
          <td class="td1">
            <i></i>
          </td>
          <td class="td2">&nbsp;本金</td>
          <td class="td3">收益</td>
          <td class="td4">
            <i></i>
          </td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="obj in tableData">
          <td class="td1">
            <span v-bind:style="{ background: obj.signColor}"></span>{{obj.label}}
          </td>
          <td class="td2">
            <span class="num">{{obj.capital}}</span>元
          </td>
          <td class="td3">
            <span class="num">{{obj.earnings}}</span>元
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
  import InvestChart from './components/InvestChart.vue';

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
        },
        tableData: [
          {label: '新手计划', signColor: '#f8e71c', capital: '1000.00', earnings: '20.00'},
          {label: '21天计划', signColor: '#ffa837', capital: '20,000.00', earnings: '130.00'},
          {label: '升薪宝量化', signColor: '#b8e986', capital: '30,000.00', earnings: '100.00'},
          {label: '升薪宝定期', signColor: '#50e3c2', capital: '5,000.00', earnings: '300.00'},
          {label: '定期抵押', signColor: '#06b7f0', capital: '11,390.00', earnings: '30.0'},
        ]
      }
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

    .num {
      font-family: Roboto;
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

          &:hover {
            background-color: #0671f0;
            color: #fff;
          }
        }
      }
    }

  }
</style>

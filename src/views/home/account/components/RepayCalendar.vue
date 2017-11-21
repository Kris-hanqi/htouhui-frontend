<template>
  <div class="repayment-calendar-wrapper">
    <hth-panel title="定期还款日历">
      <!-- 还款日历 -->
      <event-calendar :dates="dates" class="calendar"
                      @day-changed="handleDayChange"
                      @month-changed="handleMonthChanged"></event-calendar>
  
      <!-- 数据展示 -->
      <event-calendar-data :view-type="showViewType"
                           @switch-view-type="switchViewType"
                           :month-str="month"
                           :month-data="monthData"
                           :day-data="dayData"></event-calendar-data>
    </hth-panel>
  </div>

</template>

<script>
  import HthPanel from 'common/Panel/index.vue';
  import EventCalendar from 'common/event-calendar/index.vue';
  import EventCalendarData from './EventCalendarData.vue';
  import { fetchRepayCalendar } from 'api/home/account';
  import { formatDate } from 'utils/index';

  export default {
    components: {
      HthPanel,
      EventCalendar,
      EventCalendarData
    },
    data() {
      return {
        dates: [],
        events: null,
        showViewType: 'month',
        month: null,
        monthData: {
          collectMoney: '', // 待收
          receiptMoney: ''  // 已收
        },
        dayData: {
          investRepayInfo: []
        }
      }
    },
    methods: {
      repayCalendar() {
        this.dates = [];
        fetchRepayCalendar({ month: this.month })
          .then(response => {
            if (response.data.meta.code === 200) {
              const data = response.data.data;
              this.events = data.dayRepayInfo || [];
              this.monthData.collectMoney = data.totalColletedMoney || 0;
              this.monthData.receiptMoney = data.totalUncolletedMoney || 0;

              this.events.forEach(v => {
                this.dates.push(v.date);
              })
            }
          })
      },
      switchViewType() {
        this.showViewType = 'month';
      },
      handleDayChange(date) {
        if (this.dates.indexOf(date) !== -1) {
          this.events.forEach(v => {
            if (v.date === date) {
              this.dayData = v;
            }
          });
          this.showViewType = 'day';
        }
      },
      handleMonthChanged(date) {
        this.month = date;
        this.repayCalendar();
      }
    },
    created() {
      this.month = formatDate(null, 'YYYY-MM');
      this.repayCalendar();
    }
  }
</script>

<style lang="scss">
  .repayment-calendar-wrapper {
    .hth-panel-body {
      padding-bottom: 40px;
    }

    .event-calendar-wrapper {
      padding-left: 20px;
    }

    .event-detail__top {
      margin-bottom: 45px;
    }

    .event-detail,
    .event-detail2 {
      float: right;
      width: 360px;
      box-sizing: border-box;
      padding-top: 25px;
      text-align: center;

      .title {
        font-size: 18px;
        letter-spacing: 0.7px;
        text-align: center;
        color: #35385a;

        span {
          display: inline-block;
          vertical-align: middle;
          width: 40px;
          margin: 0 15px;
          border: solid 1px #ced9e4;
        }
      }

      .leftbtn {
        display: block;
        float: left;
        width: 15px;
        height: 15px;
        background: #fff;
      }

      .icon-left_ {
        font-size: 12px;
      }

      .icon-right_1 {
        font-size: 12px;
      }

      .rightbtn {
        display: block;
        float: right;
        width: 17px;
        height: 15px;
        background: #fff;
        margin-top: -17px;
      }

      .pages-content {
        width: 74.7px;
        height: 13px;
        margin: 22.2px auto;
      }

      .pagelist {
        width: 28px;
        height: 7.4px;
        margin-left: 30px;
        padding-top: 10px;
      }

      .pageRadios {
        float: left;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        margin: 0 4px 0 0;
        background: #a4b2d2;
      }
    }

    .event-detail2 {
      padding: 20px 25px;

      .event-detail__top {
        margin-bottom: 25px;
      }

      .event-detail__body img {
        width: 21px;
        height: 13px;
        cursor: pointer;
      }

      .title {
        width: 100%;

        span {
          float: left;
          width: 22px;
          height: 22px;
          margin: 0;
          border: none;
          background: url(../../../../assets/images/home/icon-left.png) no-repeat center;
          cursor: pointer;
        }
      }

      .box {
        width: 100%;
        margin-bottom: 20px;
        border-bottom: 1px solid #e4eef8;
        text-align: left;

        .title {
          margin-bottom: 15px;
          border-left: 4px solid #50e3c2;
          text-align: left;
          padding-left: 5px;
          font-size: 16px;
          color: #35385a;
        }

        .box-main {
          width: 100%;
          padding-left: 10px;
        }

        .box-main > div p {
          margin-bottom: 15px;
          font-size: 14px;
          color: #727e90;
        }

        .box-main > div p span {
          margin-left: 20px;
          font-size: 14px;
          color: #727e90;
        }

        .box-main > div.right-part p span {
          color: #ff4f38;
        }

        .pages {
          width: 233px;
          height: 70.5px;
          padding: 0 24.5px 0 31.5px;
        }

        .pages-top {
          width: 233px;
          height: 2px;
          margin: 0 auto;
          background: #a4b2d2;
        }
      }
    }

    .event-detail__body {
      img {
        display: inline-block;
        width: 207px;
        height: 64px;
      }

      p {
        margin-bottom: 35px;
        font-size: 16px;
        color: #727e90;

        i {
          display: inline-block;
          vertical-align: text-bottom;
          width: 26px;
          height: 21px;
          margin-right: 5px;
          background: url(../../../../assets/images/home/icon-calendar-01.png) no-repeat center;
        }

        span {
          font-size: 14px;
        }

        span.roboto-regular {
          font-size: 26px;
          color: #ff4a33;
        }
      }

      p.hasDone {
        i {
          width: 22px;
          height: 22px;
          background: url(../../../../assets/images/home/icon-calendar-02.png) no-repeat center;
        }

        span.roboto-regular {
          font-size: 26px;
          color: #727e90;
        }
      }
    }
  }
</style>


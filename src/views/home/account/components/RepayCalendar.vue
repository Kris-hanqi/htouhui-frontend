<template>
  <div class="repayment-calendar-wrapper">
    <panel :title="'定期还款日历'">
      <div>
        <event-calendar :dates="dates" class="calendar"
                        @day-changed="handleDayChange"
                        @month-changed="handleMonthChanged"></event-calendar>
        <div class="event-detail">
          <div class="event-detail__top">
            <p class="title"><span></span>{{ month }}收益账单<span></span></p>
          </div>
          <div class="event-detail__body">
            <p><i></i>本月待收 <span class="roboto-regular">{{ monthData.collectMoney | currency('') }}</span><span>元</span></p>
            <p class="hasDone"><i></i>本月已收 <span class="roboto-regular">{{ monthData.receiptMoney | currency('')}}</span><span>元</span></p>
            <img :src="img_icon_calendar"/>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
  import EventCalendar from 'common/event-calendar/index.vue';
  import Panel from '../../components/panel.vue';
  import img_icon_calendar from 'assets/images/home/icon-calendar.png';
  import { fetchRepayCalendar } from 'api/home/account';
  import { formatDate } from 'utils/index'

  export default {
    components: {
      EventCalendar,
      Panel
    },
    data() {
      return {
        img_icon_calendar,
        dates: [],
        events: null,
        month: null,
        monthData: {
          collectMoney: '', // 待收
          receiptMoney: ''  // 已收
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
            console.log(this.events);
            console.log(this.monthData);
            console.log(this.dates);
          })
      },
      handleDayChange(date) {
        console.log(date);
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
    height: 418px;

    .calendar {
      display: inline-block;
    }

    .event-detail__top {
      margin-bottom: 45px;
    }

    .event-detail {
      float: right;
      width: 360px;
      padding-top: 55px;
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


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
              this.monthData.collectMoney = data.totalUncolletedMoney || 0;
              this.monthData.receiptMoney = data.totalColletedMoney || 0;

              this.events.forEach(v => {
                this.dates.push(v.date);
              })
            }
            this.showViewType = 'month';
          })
      },
      switchViewType() {
        this.showViewType = 'month';
      },
      handleDayChange(date) {
        if (date) {
          const arr = date.split('-');
          if (arr[1].length === 1) {
            arr[1] = '0' + arr[1];
          }
  
          if (arr[2].length === 1) {
            arr[2] = '0' + arr[2];
          }
          date = arr.join('-');
          if (this.dates.indexOf(date) !== -1) {
            this.events.forEach(v => {
              if (v.date === date) {
                this.dayData = v;
              }
            });
            this.showViewType = 'day';
          }
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
  }
</style>


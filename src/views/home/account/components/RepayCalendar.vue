<template>
  <div class="repayment-calendar-wrapper">
    <panel :title="'定期还款日历'">
      <div>
        <event-calendar :dates="dates"
                        @day-changed="handleDayChange"
                        @month-changed="handleMonthChanged"></event-calendar>
        <div class="event-detail">
          <div class="event-detail__top">
            <h3 class="title">2017年11月收益账单</h3>
          </div>
          <div class="event-detail__body">
            <p>本月待收 3000元</p>
            <p>本月已收 6000元</p>
          </div>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
  import EventCalendar from 'common/event-calendar/index.vue';
  import Panel from '../../components/panel.vue';
  import { fetchRepayCalendar } from 'api/home/account';
  import { formatDate } from 'utils/index'
  
  export default {
    components: {
      EventCalendar,
      Panel
    },
    data() {
      return {
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
    
    .event-detail {
      float: right;
    }
  }
</style>


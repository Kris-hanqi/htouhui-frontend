<template>
  <div class="repayment-calendar-wrapper">
    <panel :title="'定期还款日历'">
      <div>
        <event-calendar></event-calendar>
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
        date: null,
        defaultDate: []
      }
    },
    methods: {
      repayCalendar(date) {
        fetchRepayCalendar({ month: date }).then(response => {
          console.log(response);
        })
      }
    },
    created() {
      const date = formatDate(null, 'YYYY-MM');
      console.log(date);
      this.repayCalendar(date);
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


<template>
  <div class="repayment-calendar-wrapper">
    <h1>定期还款日历</h1>
    <flat-pickr v-model="date"
                :config="config"></flat-pickr>
  </div>
</template>

<script>
  import FlatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import { fetchRepayCalendar } from '@/api/account';
  
  export default {
    components: {
      FlatPickr
    },
    data() {
      return {
        date: null,
        config: {
          inline: true
        }
      }
    },
    methods: {
      getRepayCalendarData(data) {
        fetchRepayCalendar(data).then(response => {
          if (response.data.meta.code === 200) {
            this.assetData = response.data.data;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .repayment-calendar-wrapper {
    width: 100%;
    height: 418px;
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
    
    .flatpickr-input {
      display: none;
    }
  
    .flatpickr-calendar {
      margin-top: 30px;
      margin-left: 40px;
    }
  }
</style>


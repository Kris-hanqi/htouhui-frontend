<template>
  <div class="cal-panel-wrapper">
    <div class="cal-panel__header">
      <span class="title"></span>
      <div class="menus">
        <button @click="preMonth" class="pre">
          <img :src="img_icon_left">
        </button>
        <button class="today">{{ yearMonthStr }}</button>
        <button @click="nextMonth" class="next">
          <img :src="img_icon_right">
        </button>
      </div>
    </div>
    <div class="cal-panel__body">
      <!-- 星期 -->
      <ul class="weeks">
        <li class="item"
              v-for="(name, index) in weekNames"
              :key="index">
          {{ weekNames[(index + calendar.options.weekStartOn) % 7]}}
        </li>
      </ul>
      <ul class="dates">
        <li class="item" :class="{
                'item-selected': date.status,
                'item-event-selected': date.date == selectedDate,
                'item-event': date.event && date.status
              }"
            @click="handleChangeCurDay(date)"
            v-for="date in list"
            :key="date.date">
          {{ date.status ? date.date.split('-')[2] : '&nbsp'}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import img_icon_left from '../img/icon-left.png';
  import img_icon_right from '../img/icon-right.png';
  import { configData, isEqualDateStr } from '../utils';
  
  export default {
    data() {
      return {
        img_icon_left,
        img_icon_right,
        selectedDate: '',
        weekNames: configData.weekNames,
        yearMonthStr: '',
        list: []
      }
    },
    props: {
      events: {
        type: Array,
        required: true
      },
      calendar: {
        type: Object,
        required: true
      }
    },
    computed: {
      today() {
        const date = new Date();
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      }
    },
    watch: {
      events: function() { // eslint-disable-line
        this.dayList();
      }
    },
    methods: {
      curYearMonth() {
        this.yearMonthStr = this.calendar.params.curYear + '-' + (this.calendar.params.curMonth + 1);
      },
      dayList() {
        // 获取该月的第一天
        const firstDay = new Date(this.calendar.params.curYear, this.calendar.params.curMonth, 1);
        // 获取属于第几周
        let dayOfWeek = firstDay.getDay();
        // 根据当前日期计算偏移量
        if (this.calendar.options.weekStartOn > dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn + 7
        } else if (this.calendar.options.weekStartOn < dayOfWeek) {
          dayOfWeek = dayOfWeek - this.calendar.options.weekStartOn
        }
        const startDate = new Date(firstDay);
        startDate.setDate(firstDay.getDate() - dayOfWeek);
        let item, status, tempItem;
        const tempArr = [];
        for (let i = 0; i < 42; i++) {
          item = new Date(startDate);
          item.setDate(startDate.getDate() + i);
          // 判断日期状态
          if (this.calendar.params.curMonth === item.getMonth()) {
            status = 1
          } else {
            status = 0
          }
          tempItem = {
            date: item.getFullYear() + '-' + (item.getMonth() + 1) + '-' + item.getDate(),
            status: status, // eslint-disable-line
            customClass: []
          };
          // 设置事件
          this.events.forEach(event => {
            if (isEqualDateStr(event, tempItem.date)) {
              tempItem.event = true;
            }
          });
          tempArr.push(tempItem)
        }
        this.list = tempArr;
      },
      nextMonth() {
        if (this.$parent.calendarOptions.params.curMonth < 11) {
          this.$parent.calendarOptions.params.curMonth++;
        } else {
          this.$parent.calendarOptions.params.curYear++;
          this.$parent.calendarOptions.params.curMonth = 0;
        }
        this.curYearMonth();
        this.$emit('month-changed', this.yearMonthStr);
        this.dayList();
      },
      preMonth() {
        if (this.$parent.calendarOptions.params.curMonth > 0) {
          this.$parent.calendarOptions.params.curMonth--;
        } else {
          this.$parent.calendarOptions.params.curYear--;
          this.$parent.calendarOptions.params.curMonth = 11;
        }
        this.curYearMonth();
        this.$emit('month-changed', this.yearMonthStr);
        this.dayList();
      },
      handleChangeCurDay(data) {
        if (data.status) {
          this.selectedDate = data.date;
          this.$emit('cur-day-changed', data.date)
        }
      }
    },
    created() {
      this.dayList();
      this.curYearMonth();
    }
  }
</script>

<style lang="scss">
  .cal-panel-wrapper {
    width: 361px;
    background-color: #fff;
    border: 1px solid #ecf4fd;
    padding: 19px 0;
    border-top: 4px solid #ecf4fd;
    
    .cal-panel__header {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      
      .menus {
        position: absolute;
        top: -2px;
        right: 25px;
      }
  
      span.title {
        width: 100px;
      }
      
      span {
        display: block;
        width: 22px;
        height: 22px;
        cursor: pointer;
      }
  
      .pre,
      .next {
        margin-top: 2px;
        padding: 0;
        background-color: transparent;
      }
      
      button {
        cursor: pointer;
      }
  
      [disabled='disabled'] {
        cursor: not-allowed;
      }
      
      button.today {
        width: auto;
        height: 22px;
        font-size: 16px;
        background-color: transparent;
        text-align: center;
        color: #717e9c;
        cursor: auto;
      }
    }
  
    .cal-panel__body {
      width: 100%;
  
      .weeks {
        overflow: hidden;
        font-size: 15.7px;
        line-height: 1.21;
        color: #7c86a2;
      }
      
      .weeks .item {
        float: left;
        width: 36px;
        height: 36px;
        margin: 0 7px;
        line-height: 36px;
        color: #bfc1c4;
        text-align: center;
      }
      
      .dates {
        overflow: hidden;
        
        .item {
          float: left;
          border-radius: 50%;
          font-size: 14px;
          width: 30px;
          height: 30px;
          margin: 3px 10px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
        }
  
        .item-event {
          background-color: #fff;
          box-sizing: border-box;
          border: solid 1px #50e3c2;
          text-align: center;
          color: #50e3c2;
        }
  
        .item-event-selected,
        .item-selected:hover {
          background-color: #50e3c2;
          border: none;
          color: white;
        }
      }
    }
  }
</style>


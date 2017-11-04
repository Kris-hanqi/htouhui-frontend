<template>
  <div class="cal-panel-wrapper">
    <div class="cal-panel__header">
      <span class="title">{{ yearMonthStr }}</span>
      <div class="menus">
        <span @click="preMonth" class="pre"></span>
        <button>今天</button>
        <span @click="nextMonth" class="next"></span>
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
                 today: date.status ? (today == date.date) : false
              }" v-for="date in list" :key="date.date">
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
        return date.getFullYear() + '-' + date.getMonth() + 1 + '-' + date.getDate();
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
            date: item.getFullYear() + '-' + item.getMonth() + 1 + '-' + item.getDate(),
            status: status, // eslint-disable-line
            customClass: []
          };
          //
          this.events.forEach(event => {
            if (isEqualDateStr(event.date, tempItem.date)) {
              tempItem.title = event.title;
              tempItem.desc = event.desc || '';
              if (event.customClass) tempItem.customClass.push(event.customClass)
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
        this.dayList();
        this.curYearMonth();
      },
      preMonth() {
        if (this.$parent.calendarOptions.params.curMonth > 0) {
          this.$parent.calendarOptions.params.curMonth--;
        } else {
          this.$parent.calendarOptions.params.curYear--;
          this.$parent.calendarOptions.params.curMonth = 11;
        }
        this.dayList();
        this.curYearMonth();
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
    margin: 33px 0 0 39px;
    background-color: #fff;
    border: 1px solid #ecf4fd;
    padding: 19px 0;
    border-top: 4px solid #ecf4fd;
    
    .cal-panel__header {
      position: relative;
      padding-left: 20px;
      margin-bottom: 10px;
      
      .title {
        display: inline-block;
        font-size: 18px;
        color: #717e9c;
      }
      
      .menus {
        position: absolute;
        top: 0;
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
  
      span.pre {
        float: left;
        margin-right: 6px;
        background: url(../img/icon-left.png) no-repeat;
      }
  
      span.next {
        float: right;
        margin-left: 6px;
        background: url(../img/icon-right.png) no-repeat;
      }
      
      button {
        width: 51px;
        height: 22px;
        border-radius: 100px;
        background-color: #ebf2ff;
        font-size: 14px;
        text-align: center;
        color: #7b8fbe;
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
        
        .today {
          background-color: #0671f0;
          border: none;
          color: white;
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


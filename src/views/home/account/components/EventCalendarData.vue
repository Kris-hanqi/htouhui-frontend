<template>
  <div class="event-calendar-data-wrapper">
    <!-- 月视图 -->
    <div class="event-detail-month" v-show="viewType === 'month'">
      <!-- 展示月份 -->
      <div class="month-header">
        <span></span>{{ monthStr }}收益账单<span></span>
      </div>
      <div class="event-detail__body month-body">
        <p>
          <i class="iconfont icon-money-pig"></i>本月待收
          <span class="roboto-regular" style="color: #ff4a33;">{{ monthData.collectMoney | currency('') }}</span><span>元</span>
        </p>
        <p>
          <i class="iconfont icon-save-money"></i>本月已收
          <span class="roboto-regular">{{ monthData.receiptMoney | currency('')}}</span><span>元</span>
        </p>
      </div>
      <div class="month-footer">
        <img :src="img_icon_calendar"/>
      </div>
    </div>
  
    <!-- 日视图 -->
    <div class="event-detail-day" v-show="viewType !== 'month'">
      <div class="day-header">
        <span class="return-btn">
           <i @click="switchViewType" class="iconfont icon-left-1"></i>
        </span>
        {{ dayData.date }}账单
      </div>
      <div class="event-detail__body day-body">
        <div class="box">
          <div class="title">{{ dataOne.loanName }}</div>
          <div class="box-main row">
            <div class="col-xs-4" style="padding-right: 0;">
              <p>投资金额</p>
              <p>本&nbsp;&nbsp;&nbsp;&nbsp;金</p>
              <p>利&nbsp;&nbsp;&nbsp;&nbsp;息</p>
              <p>平台奖励</p>
            </div>
            <div class="col-xs-8" style="padding-left: 0;">
              <p>{{ dataOne.investMoeny | currency('') }}元</p>
              <p>{{ dataOne.corpus | currency('') }}元</p>
              <p>{{ dataOne.interest | currency('') }}元</p>
              <p>{{ dataOne.extraEarning | currency('') }}元</p>
            </div>
          </div>
        </div>
      </div>
      <div class="pages day-footer" v-show="dayData.investRepayInfo && dayData.investRepayInfo.length > 1">
        <div class="pages-content">
          <el-button type="text" @click="handleDisableLeft">
            <i class="iconfont icon-left-1"></i>
          </el-button>
          <span v-for="value in length"
                :key="value"
                :class="{'pagination-bullet-active': (value - 1) === index}"
                class="pagination-bullet"></span>
          <el-button type="text" @click="handleDisableRight">
            <i class="iconfont icon-right-1"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import img_icon_calendar from 'assets/images/home/icon-calendar.png';
  
  export default {
    props: {
      // 需要显示的视图
      viewType: {
        type: String,
        default: 'month'
      },
      monthStr: {
        type: String,
        required: true
      },
      monthData: {
        type: Object,
        required: true
      },
      dayData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        img_icon_calendar,
        index: 0,
        length: 0,
        dataOne: {
          loanName: '',
          investMoeny: '',
          corpus: '',
          interest: '',
          extraEarning: ''
        }
      }
    },
    watch: {
      index(val) {
        if (val >= 0 && this.index < this.length) {
          this.dataOne = this.dayData.investRepayInfo[val];
        }
      },
      dayData(val) {
        this.dataOne = val.investRepayInfo[0];
        this.length = val.investRepayInfo.length;
      }
    },
    methods: {
      switchViewType() {
        this.index = 0;
        this.$emit('switch-view-type');
      },
      handleDisableRight() {
        if (!this.length) return;
        if (this.index >= this.length - 1) {
          this.index = 0;
        } else {
          this.index++;
        }
      },
      handleDisableLeft() {
        if (!this.length) return;
        if (this.index <= 0) {
          this.index = this.length - 1;
        } else {
          this.index--;
        }
      }
    }
  }
</script>

<style lang="scss">
  .event-calendar-data-wrapper {
    display: inline-block;
  
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
          margin-right: 5px;
        }
      
        span {
          font-size: 14px;
        }
      
        span.roboto-regular {
          font-size: 26px;
        }
      }
    }
    
    .event-detail-month {
      overflow: hidden;
      height: auto;
      width: 360px;
      padding: 20px 25px;
  
      .month-header {
        margin-bottom: 45px;
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
  
      .month-body {
        padding-left: 70px;
      }
      
      .month-body .iconfont {
        font-size: 25px;
      }
      
      .month-footer {
        text-align: center;
      }
    }
    
    .event-detail-day {
      float: right;
      width: 360px;
      height: auto;
      box-sizing: border-box;
      text-align: center;
      
      .day-header {
        width: 100%;
        margin-bottom: 25px;
        font-size: 18px;
        letter-spacing: 0.7px;
        text-align: center;
        color: #35385a;
  
        span.return-btn {
          display: inline-block;
          position: relative;
          overflow: hidden;
          text-align: center;
          vertical-align: middle;
          width: 25px;
          height: 25px;
          white-space: nowrap;
          line-height: 25px;
          background: #ebf2ff;
          color: #8b93ad;
          border-radius: 16px;
          cursor: pointer;
        }
        
        i {
          font-size: 20px;
          color: #b2b2b2;
        }
      }
  
      .day-body {
        padding-left: 40px;
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
  
      .day-footer {
        text-align: center;
        
        .iconfont {
          font-size: 20px;
          color: #989292;
        }
        
        button {
          background-color: transparent;
        }
  
        .pagination-bullet {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 2px;
          border-radius: 100%;
          background: #ccc;
        }
  
        .pagination-bullet-active {
          background: #50e3c2;
        }
      }
    }
  }
</style>

<template>
  <div class="event-calendar-data-wrapper">
    <!-- 月视图 -->
    <div class="event-detail" v-show="viewType === 'month'">
      <div class="event-detail__top">
        <p class="title"><span></span>{{ monthStr }}收益账单<span></span></p>
      </div>
      <div class="event-detail__body">
        <p><i></i>本月待收 <span class="roboto-regular">{{ monthData.collectMoney | currency('') }}</span><span>元</span></p>
        <p class="hasDone"><i></i>本月已收 <span class="roboto-regular">{{ monthData.receiptMoney | currency('')}}</span><span>元</span></p>
        <img :src="img_icon_calendar"/>
      </div>
    </div>
  
    <!-- 日视图 -->
    <div class="event-detail2" v-show="viewType !== 'month'">
      <div class="event-detail__top">
        <p class="title">
          <span @click="switchViewType"></span>{{ dayData.date }}账单
        </p>
      </div>
      <div class="event-detail__body">
        <div class="box">
          <div class="title">{{ dataOne.loanName }}</div>
          <div class="box-main">
            <div class="left-part">
              <p>投资金额<span class="roboto-regular">{{ dataOne.investMoeny | currency('') }}</span>元</p>
              <p>本&nbsp;&nbsp;&nbsp;&nbsp;金<span class="roboto-regular">{{ dataOne.corpus | currency('') }}</span>元</p>
            </div>
            <div class="right-part">
              <p>利&nbsp;&nbsp;&nbsp;&nbsp;息<span class="roboto-regular">{{ dataOne.interest | currency('') }}</span>元</p>
              <p>平台奖励<span class="roboto-regular">{{ dataOne.extraEarning | currency('')}}</span>元</p>
            </div>
          </div>
          <div class="pages" v-if="dayData.investRepayInfo && dayData.investRepayInfo.length > 1">
            <div class="pages-top"></div>
            <div class="pages-content">
              <button @click="handleDisableLeft" class="leftbtn" :disabled="isLeftDisabled"><i class="iconfont icon-left-1"></i></button>
              <ul class="pagelist">
                <li class="pageRadios"></li>
                <li class="pageRadios"></li>
                <li class="pageRadios"></li>
              </ul>
              <button @click="handleDisableRight" class="rightbtn" :disabled="isRightDisabled"><i class="iconfont icon-right-1"></i></button>
            </div>
          </div>
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
        isRightDisabled: true,
        isLeftDisabled: false,
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
      dayData: function (val) { // eslint-disable-line
        this.index = 0;
        this.dataOne = val.investRepayInfo[this.index];
      }
    },
    methods: {
      switchViewType() {
        this.index = 0;
        this.$emit('switch-view-type');
      },
      handleDisableRight() {
        this.index++;
        this.dataOne = this.dayData.investRepayInfo[this.index];
        this.isLeftDisabled = false;
        if (this.index === this.dayData.investRepayInfo.length - 1) {
          this.isRightDisabled = true;
        } else {
          this.isRightDisabled = false;
        }
      },
      handleDisableLeft() {
        this.index --;
        this.testData = this.dayData.investRepayInfo[this.index];
        this.isRightDisabled = false;
        if (this.index === 0) {
          this.isLeftDisabled = true;
        } else {
          this.isLeftDisabled = false;
        }
      }
    }
  }
</script>

<style lang="scss">
  .event-calendar-data-wrapper {
    display: inline-block;
  }
</style>

<template>
  <div class="account-asset-wrapper">
    <hth-panel title="我的资产">
      <div id="showAmount" class="ku-icon" :class="{'icon-eye': amountShow, 'icon-eye-close': !amountShow}"
           @click="toggleAmountShow()"></div>
      <div class="list">
        <div class="item">
          <p class="title">总资产</p>
          <p>
            <i class="num-font" v-if="amountShow">{{ (data.sumCapital || 0) | currency('') }}</i>
            <i class="num-font" v-if="!amountShow">****</i>
            元
            <span class="home-ico-arrow">
              <i class="ku-icon icon-bottom-01 " v-if="amountShow" @mouseenter="messageBoxShow = true" @mouseout="messageBoxShow = false"></i>
            </span>
          </p>

          <div class="message-box" v-if="messageBoxShow">
            <P>可用余额：<span class="roboto-regular">{{ (data.balance || 0) | currency('') }}</span>元</P>
            <P>待收本金：<span class="roboto-regular">{{ (data.waitRepayCorpus || 0) | currency('') }}</span>元</P>
            <P>待收利息：<span class="roboto-regular">{{ (data.waitRepayInterest || 0) | currency('') }}</span>元</P>
            <P>冻结金额：<span class="roboto-regular">{{ (data.frozenMoney || 0) | currency('') }}</span>元</P>
          </div>
        </div>
        <div class="item">
          <p class="title">累计收益</p>
          <p>
            <i class="num-font" v-if="amountShow">{{ (data.accumulatedIncome || 0) | currency('') }}</i>
            <i class="num-font" v-if="!amountShow">****</i>
            元
          </p>
        </div>
        <div class="item">
          <p class="title">可用余额</p>
          <p>
            <i class="num-font" v-if="amountShow">{{ (data.balance || 0) | currency('') }}</i>
            <i class="num-font" v-if="!amountShow">****</i>
            元
          </p>
        </div>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import HthPanel from 'common/Panel/index.vue';

  export default {
    data() {
      return {
        messageBoxShow: false,
        amountShow: true
      }
    },
    methods: {
      toggleAmountShow() {
        this.amountShow = !this.amountShow;
        localStorage.setItem('amountShow', this.amountShow ? 'open' : 'close');
      }
    },
    created() {
      if (localStorage.hasOwnProperty('amountShow')) {
        this.amountShow = localStorage.getItem('amountShow') === 'open';
      }
    },
    components: {
      HthPanel
    },
    props: ['data']
  }
</script>

<style lang="scss">
  .account-asset-wrapper {
    position: relative;

    #showAmount {
      position: absolute;
      top: 20px;
      right: 28px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 100%;
      font-size: 25px;
      color: #8991ab;
      background-color: #edf1fe;
      cursor: pointer;
    }

    .list {
      height: 100%;
      padding-bottom: 10px;

      .item {
        float: left;
        position: relative;
        width: 31%;
      }
    }

    p {
      line-height: 1;
      text-align: center;
      font-size: 14px;
      color: #394b67;
      margin-top: 23px;

      i {
        font-size: 26px;
        color: #ff4c35;
      }

      &.title {
        font-size: 16px;
        color: #7c86a2;
      }

      .home-ico-arrow {
        display: block;
        position: relative;
        top: -15px;
        height: 16px;
        margin: 20px auto 0;
        line-height: 16px;
        cursor: pointer;
      }
    }

    .message-box {
      position: absolute;
      left: 5%;
      top: 110%;
      z-index: 1;
      min-width: 217px;
      height: auto;
      padding: 20px;
      padding-top: 0;
      background-color: #fff;
      box-shadow: 0 2px 9px 0 rgba(67, 135, 186, 0.3);

      p {
        font-size: 16px;
        color: #7e87a3;
        text-align: left;
      }
    }
  }
</style>

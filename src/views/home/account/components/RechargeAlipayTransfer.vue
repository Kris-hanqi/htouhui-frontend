<template>
  <div class="alipay-transfer-wrapper">
    <div class="recharge-wrapper__steps">
      <p>步骤一：点击转账</p>
      <img :src="img_alipay_step1" alt="">
      <p>步骤二：完成转账</p>
      <img :src="img_alipay_step2" alt="">
      <p>您可以使用您的银行卡，通过支付宝转账的方式将资金充值到您的江西银行存管帐户（支付宝APP更方便）</p>
    </div>
    <div class="split-line"></div>
    <div class="alipay-transfer__main">
      <p>转账时所需信息如下</p>
      <div class="transferNeedUl clearFix">
        <ul class="transferNeedMsgLeft fl">
          <li>
            <span>收款方姓名</span>
          </li>
          <li>
            <span>收款方帐号</span>
          </li>
          <li>
            <span>收款方开户行</span>
          </li>
        </ul>
        <ul class="transferNeedMsgRight fl">
          <li>
            <span>{{ accountData.realName || '无' }}</span>
          </li>
          <li>
            <span>{{ accountData.accountId }}</span>
            <button class="copyBtn" v-clipboard:copy="accountData.accountId" v-clipboard:success="handleSuccess">复制</button>
          </li>
          <li>
            <span>{{ bankName }}</span>
            <button class="copyBtn" v-clipboard:copy="bankName" v-clipboard:success="handleSuccess">复制</button>
          </li>
        </ul>
      </div>
      <table border="0" cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>支付方式</th>
            <th>PC端限额</th>
            <th>App端限额</th>
            <th>限额共享</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>余额</th>
            <th>单笔5万，单月20万，单日20万</th>
            <th>单笔5万，单月20万，单日20万</th>
            <th>共享</th>
          </tr>
          <tr>
            <th>余额宝</th>
            <th>暂不支持余额宝转账</th>
            <th>暂不支持余额宝转账</th>
            <th>/</th>
          </tr>
          <tr>
            <th>储蓄卡快捷</th>
            <th colspan="2" class="colspan-th">储蓄卡快捷支付限额表</th>
            <th>共享</th>
          </tr>
          <tr>
            <th>储蓄卡卡通</th>
            <th class="long-th">有证书：最大为每家银行卡通本身的支付额度<br> 无证书：不支持，收银台页面不显示账户中绑定的卡通<br> 具体以收银台显示额度为准</th>
            <th>具体以收银台显示额度为准</th>
            <th>共享</th>
          </tr>
          <tr>
            <th>储蓄卡网银</th>
            <th class="long-th">单笔5万元、单日20万元、单月20万元（若银行端限额低于该限额，则以银行限额为准）</th>
            <th>不支持</th>
            <th>/</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="split-line"></div>
    <div class="hth-tips">
      <h3>温馨提示</h3>
      <p>1、严禁信用卡充值、套现等行为。</p>
      <p>2、选择支付宝、网银转账方式充值后请在个人中心手动刷新余额。</p>
      <p>3、线下充值流水请在“资金流水”中查看。线下充值流水，会在24小时之内生成。</p>
      <p>4、在向电子账户转账过程中，若无法查找到“江西银行”，您可换查“南昌银行”，由于在2015年底中国银监会批复南昌银行吸收合并景德镇市商业银行，更名为江西银行。</p>
      <p>5、在向电子账户转账时，必须为银行借记卡，平台暂不支持存折、信用卡转账。</p>
      <p>6、根据银行收费标准，在转账过程可能会收取费用。平台目前不收取任何手续费。</p>
    </div>
  </div>
</template>

<script>
  import img_alipay_step1 from '@/assets/images/home/recharge/alipay-step1.png';
  import img_alipay_step2 from '@/assets/images/home/recharge/alipay-step2.png';
  export default {
    props: ['accountData'],
    data() {
      return {
        img_alipay_step1,
        img_alipay_step2,
        bankName: '江西银行'
      }
    },
    methods: {
      handleSuccess() {
        this.$message('拷贝成功');
      }
    }
  }
</script>

<style lang="scss">
  .alipay-transfer-wrapper {
    padding: 0 20px;
  }

  .alipay-transfer__main {
    .transferNeedUl {
      margin-top: 14px;
      margin-bottom: 55px;

      span {
        font-size: 16px;
        line-height: 2.88;
        color: #7c86a2;
      }

      .copyBtn {
        width: 80px;
        height: 32px;
        border: solid 1px #0671f0;
        border-radius: 100px;
        font-size: 14px;
        text-align: center;
        color: #0671f0;
        background-color: #fff;
        cursor: pointer;
      }

      .copyBtn:hover {
        background-color: #0671f0;
        color: #fff;
      }
    }

    ul.transferNeedMsgLeft {
      width: 145px;
      text-align: right;
      margin-right: 35px;
    }

    table {
      th {
        border: solid 1px #ced9e4;
        border-top: none;
        border-right: none;
        padding: 10px 0;
        font-size: 14px;
        color: #727e90;
      }

      th:last-child {
        width: 110px;
        border-right: solid 1px #ced9e4;
      }

      th:first-child {
        width: 90px;
      }

      th.colspan-th {
        text-align: left;
        padding-left: 100px;
      }

      th.long-th {
        text-align: left;
        padding-left: 3px;
      }
    }

    thead {
      th {
        height: 40px;
        line-height: 40px;
        border-top: solid 1px #ced9e4;
        background-color: #f6f9fe;
      }

      th:nth-child(3) {
        width: 206px;
      }
    }
  }
</style>

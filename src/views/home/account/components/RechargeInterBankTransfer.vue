<template>
  <div class="inter-bank-transfer-wrapper">
    <div class="recharge-wrapper__steps">
      <p>操作流程（以招商银行为例）</p>
      <img :src="img_inter_bank_step" alt="">
      <p>您可通过银行转账至您的江西银行电子账户中，转账方式包括：银行柜台转账、网银转账、手机银行转账。</p>
    </div>
    <div class="split-line"></div>
    <div class="transferNeedMsg">
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
            <span>收款方银行选择</span>
          </li>
          <li>
            <span>收款方开户地</span>
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
            <span>{{ accountData.accountId || '无' }}</span>
            <button class="copyBtn" v-clipboard:copy="accountData.accountId" v-clipboard:success="handleSuccess">复制</button>
          </li>
          <li>
            <span>江西银行或城市商业银行</span>
          </li>
          <li>
            <span>江西省南昌市</span>
          </li>
          <li>
            <span>{{ bankAddress }}</span>
            <button class="copyBtn" v-clipboard:copy="bankAddress" v-clipboard:success="handleSuccess">复制</button>
          </li>
        </ul>
      </div>
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
  import img_inter_bank_step from 'assets/images/home/recharge/inter-bank-step.png';
  
  export default {
    props: ['accountData'],
    data() {
      return {
        img_inter_bank_step,
        bankAddress: '江西银行股份有限公司总行营业部'
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
  .inter-bank-transfer-wrapper {
    padding: 0 20px;
  }
</style>

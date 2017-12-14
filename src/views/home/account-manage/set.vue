<template>
  <div class="account-set-wrapper">
    <hth-panel title="账户设置">
      <table border="0" cellspacing="0" cellpadding="0" class="accountSetTable">
        <tr v-if="status !== 0"><td>真实姓名</td><td>{{ realName || '无' }}</td><td>已认证</td></tr>
        <tr v-if="status !== 0"><td>身份证</td><td>{{ IDNumber || '无' }}</td><td>已认证</td></tr>
        <tr v-if="status !== 0"><td>存管手机</td><td>{{ mobile }}</td><td>已认证</td></tr>
        <tr v-if="status !== 0">
          <td>银行卡</td>
          <td>
            <i>{{ bankCard ? bankCard : '未绑定' }}</i>
            <span v-if="bankCard">（此卡是默认提现卡）</span>
          </td>
          <td>
            <button class="hth-btn"
                    @click="operationBackCard"
                    :class="{ 'btn-blue': !bankCard }">
              {{ bankCard ? '解绑' : '绑定' }}</button></td>
        </tr>
        <tr v-if="status !== 0">
          <td>电子账号</td>
          <td>{{ accountId }} &nbsp;&nbsp;
              <button v-clipboard:copy="accountId"
                      v-clipboard:success="handleCopySuccess"
                      class="btnBlue hth-btn">复制</button>
          </td>
          <td>
            <button v-if="!accountId" class="hth-btn"
                    @click="operationAccount"
                    :class="{ 'btn-blue': !accountId }">开户</button>
            <span v-else>已认证</span>
          </td>
        </tr>
        <tr v-if="status !== 0" class="borderNone">
          <td>已授权的服务</td>
          <td>自动投标授权</td>
          <td>
            <button @click="automaticBidding"
                    :class="{ 'btn-blue': !isAutomaticBidding }"
                    v-if="!isAutomaticBidding" class="hth-btn">授权</button>
            <span v-else>已授权</span>
          </td>
        </tr>
        <tr v-if="status !== 0" class="borderNone">
          <td></td>
          <td>自动债权转让授权</td>
          <td>
            <button @click="automaticDebtTransfer"
                    :class="{ 'btn-blue': !isAutomaticDebtTransfer }"
                    v-if="!isAutomaticDebtTransfer" class="hth-btn">授权</button>
            <span v-else>已授权</span>
          </td>
        </tr>
        <tr v-if="status !== 0">
          <td></td>
          <td>自动还款授权</td>
          <td><button class="hth-btn" @click="automaticRepayment">{{ isAutomaticRepayment ? '解约' : '授权' }}</button></td>
        </tr>
        <tr v-if="status !== 0" class="borderNone">
          <td>交易密码</td>
          <td>{{ transactionPasswordStatus ? '已设置' : '未设置'}}</td>
          <td rowspan="2" class="borderLine">
            <el-button class="hth-btn" size="small" @click="updateTransactionPassword" v-if="transactionPasswordStatus" round>修改</el-button>
            <el-button class="hth-btn btn-blue" type="primary" @click="setTransactionPassword" v-else plain round>设置</el-button>
          </td>
        </tr>
        <tr v-if="status !== 0">
          <td colspan="2" class="tableSmallFontColor textAlignLeft tablePadding">保障资金安全，转入、转出、投资等资金相关操作时使用</td>
        </tr>
        <tr class="borderNone">
          <td>手机认证</td>
          <td>{{ mobile || '无' }}</td>
          <td rowspan="2" class="borderLine">
            <router-link to="/accountManage/set/updateMobileStep1">
              <button class="hth-btn">修改</button>
            </router-link>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="tableSmallFontColor textAlignLeft tablePadding">保障资金安全，转入、转出、投资等资金相关操作时使用</td>
        </tr>
        <tr class="borderNone">
          <td>登录密码</td>
          <td>已设置</td>
          <td rowspan="2" class="borderLine">
            <router-link to="/accountManage/set/updateLoginPassword">
              <button class="hth-btn">修改</button>
            </router-link>
          </td>
        <tr>
          <td colspan="2" class="tableSmallFont textAlignLeft tablePadding">登录密码已设置 上次登录时间： {{ lastLoginTime }}</td>
        </tr>
        <tr class="borderNone">
          <td>邮箱认证<i class="iconDangerous" v-if="!email"></i></td>
          <td :class="{ 'text-warning': email }">{{ email ? email : '未绑定' }}</td>
          <td rowspan="2">
            <router-link to="/accountManage/set/updateEmailStep1" v-if="email">
              <button class="hth-btn" :class="{ 'btn-blue': !email }">{{ email ? '修改' : '绑定'  }}</button>
            </router-link>
            <router-link to="/accountManage/set/bindEmail" v-else>
              <button class="hth-btn" :class="{ 'btn-blue': !email }">{{ email ? '修改' : '绑定'  }}</button>
            </router-link>
          </td>
        </tr>
        <tr class="borderNone">
          <td colspan="2" class="tableSmallFont textAlignLeft tablePadding">可用于获取账户资金变动通知和投资讯息</td>
        </tr>
      </table>
    </hth-panel>
    
    <!-- 解绑银行卡 -->
    <unlock-bank-card :visible="dialogUnlockBankCardVisible"
                      @close="closeUnlockBankCard"></unlock-bank-card>
    
    <!-- 网关接口调用组件 -->
    <request-bank-from :request-data="requestBankData"></request-bank-from>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import UnlockBankCard from '../components/UnlockBankCard.vue';
  import RequestBankFrom from '../components/RequestBankFrom.vue';
  import { getLocationUrl } from 'utils/index';
  import { fetchAutomaticBidding, fetchAutomaticDebtTransfer, fetchAutomaticRepayment, fetchResetTransactionPassword } from 'api/home/account-set';
  
  export default {
    components: {
      HthPanel,
      UnlockBankCard,
      RequestBankFrom
    },
    computed: {
      ...mapGetters([
        'realName',
        'mobile',
        'email',
        'status',
        'IDNumber',
        'uuid',
        'bankCard',
        'accountId',
        'lastLoginTime',
        'transactionPasswordStatus',
        'isAutomaticBidding',
        'isAutomaticDebtTransfer',
        'isAutomaticRepayment'
      ])
    },
    data() {
      return {
        dialogUnlockBankCardVisible: false,
        signingData: {
          source: 'pc',
          callbackUrl: getLocationUrl() + '/user/home.html#/accountManage/set/index',
          sessionId: ''
        },
        updateTransactionPasswordData: {
          source: 'pc',
          callbackUrl: getLocationUrl() + '/user/home.html#/accountManage/set/index',
          sessionId: ''
        },
        requestBankData: {}
      }
    },
    methods: {
      operationBackCard() {
        if (this.bankCard) {
          this.dialogUnlockBankCardVisible = true;
        } else {
          this.$router.push('/accountManage/set/bindBackCard');
        }
      },
      operationAccount() {
        if (this.status === 0) {
          this.dialogOpenAccountVisible = true
        }
      },
      closeUnlockBankCard() {
        this.dialogUnlockBankCardVisible = false;
      },
      setTransactionPassword() {
        this.$router.push('/accountManage/set/transactionPassword');
      },
      // 修改交易密码
      updateTransactionPassword() {
        this.updateTransactionPasswordData.sessionId = this.uuid;
        fetchResetTransactionPassword(this.updateTransactionPasswordData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.requestBankData = response.data.data;
            }
          })
      },
      automaticBidding() {
        if (this.status === 0) {
          this.$notify({
            title: '操作失败',
            message: '原因: 请先开户',
            type: 'error'
          });
          return;
        }
        if (!this.transactionPasswordStatus) {
          this.$notify({
            title: '操作失败',
            message: '原因: 请先设置交易密码',
            type: 'error'
          });
          return;
        }
        this.requestBankData = {};
        this.signingData.sessionId = this.uuid;
        fetchAutomaticBidding(this.signingData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.requestBankData = response.data.data;
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '操作失败',
                message: '原因:' + response.data.meta.message,
                type: 'error'
              });
            }
          })
      },
      handleCopySuccess() {
        this.$message('拷贝成功');
      },
      automaticDebtTransfer() {
        if (!this.isAutomaticBidding) {
          this.$notify({
            title: '操作失败',
            message: '原因: 请先授权自动投标签约',
            type: 'error'
          });
          return;
        }
        this.requestBankData = {};
        this.signingData.sessionId = this.uuid;
        fetchAutomaticDebtTransfer(this.signingData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.requestBankData = response.data.data;
            }
            if (response.data.meta.code === 9999) {
              this.$notify({
                title: '操作失败',
                message: '原因:' + response.data.meta.message,
                type: 'error'
              });
            }
          })
      },
      automaticRepayment() {
        fetchAutomaticRepayment()
          .then(response => {
            if (response.data.meta.code) {
              this.$store.commit('SET_IS_AUTOMATIC_REPAYMENT', !this.isAutomaticRepayment);
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .account-set-wrapper {
    width: 832px;
    padding-bottom: 75px;
    
    button.hth-btn {
      width: 91px;
      font-size: 14px;
      font-weight: 400;
      padding: 4px 12px;
    }
    
    button.hth-btn {
      width: 91px;
      height: 28px;
      border-radius: 100px;
      background-color: #fff;
      border: solid 1px #727e90;
      padding: 4px 12px;
      color: #727e90;
      cursor: pointer;
      
      &:hover {
        background-color: #7c86a2;
        border: solid 1px #727e90;
        color: #fff;
      }
      
      &.btn-blue {
        background-color: #fff;
        border: solid 1px #0671f0;
        color: #0671f0;
        
        &:hover {
          background-color: #0671f0;
          color: #fff;
        }
      }
    }
    
    .accountSetTable {
      width: 755px;
      margin-left: 20px;
      
      td {
        font-size: 14px;
        color: #35385a;
        border-bottom: solid 2px #dfe8f0;
        padding-top: 18px;
        padding-bottom: 18px;
      }
      
      td:first-child {
        font-size: 16px;
      }
      
      td.tableSmallFont {
        font-size: 12px;
        color: #727e90;
      }
      
      td.tableSmallFontColor {
        font-size: 12px;
        color: #e75456;
      }
      
      td.tableSmallFontColor01 {
        color: #ff7900;
      }
      
      td.borderLine {
        border-bottom: solid 2px #dfe8f0 !important;
      }
      
      td.tablePadding {
        padding-top: 3px;
      }
      
      .iconDangerous {
        display: inline-block;
        vertical-align: bottom;
        width: 20px;
        height: 18px;
        background: url(../../../assets/images/home/center-ico-dangerous.png) no-repeat;
        margin-left: 5px;
      }
      
      td:last-child {
        width: 100px;
        text-align: center;
      }
      
      td.textAlignLeft {
        text-align: left;
      }
      
      tr.borderNone td {
        border-bottom: none;
      }
    }
  }
</style>

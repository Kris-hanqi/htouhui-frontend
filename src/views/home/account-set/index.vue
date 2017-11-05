<template>
  <div class="accountSet">
    <h1>账户设置</h1>
    <table border="0" cellspacing="0" cellpadding="0" class="accountSetTable">
      <tr>
        <td>真实姓名</td>
        <td>{{ realName }}</td>
        <td>已认证</td>
      </tr>
      <tr>
        <td>身份证</td>
        <td>010***********330</td>
        <td>已认证</td>
      </tr>
      <tr>
      </tr>
        <td>存管手机</td>
        <td>137*****330</td>
        <td>已认证</td>
      <tr>
        <td>银行卡</td>
        <td><i>{{ email ? email : '未绑定' }}</i><span v-if="email">（此卡是默认提现卡）</span></td>
        <td><button :class="{ 'btn-blue': !bankCard }">{{ bankCard ? '解绑' : '绑定' }}</button></td>
      </tr>
      <tr>
        <td>电子账号</td>
        <td>{{ accountId }}<button class="btnBlue">复制</button></td>
        <td>已认证</td>
      </tr>
      <tr class="borderNone">
        <td>已授权的服务</td>
        <td>自动投标授权</td>
        <td>已授权</td>
      </tr>
      <tr class="borderNone">
        <td></td>
        <td>自动债权转让授权</td>
        <td>已授权</td>
      </tr>
      <tr>
        <td></td>
        <td>自动还款授权</td>
        <td><button>解约</button></td>
      </tr>
      <tr class="borderNone">
        <td>交易密码</td>
        <td>{{ transactionPasswordStatus ? '已设置' : '未设置'}}</td>
        <td rowspan="2" class="borderLine"><router-link to="transactionPassword"><button>{{ transactionPasswordStatus ? '修改' : '设置' }}</button></router-link></td>
      </tr>
      <tr>
        <td colspan="2" class="tableSmallFontColor textAlignLeft tablePadding">保障资金安全，转入、转出、投资等资金相关操作时使用</td>
      </tr>
      <tr class="borderNone">
        <td>手机认证</td>
        <td>{{ mobile || '无' }}</td>
        <td rowspan="2" class="borderLine"><router-link to="updateMobile"><button>修改</button></router-link></td>
      </tr>
      <tr>
        <td colspan="2" class="tableSmallFontColor textAlignLeft tablePadding">保障资金安全，转入、转出、投资等资金相关操作时使用</td>
      </tr>
      <tr class="borderNone">
        <td>登录密码</td>
        <td>已设置</td>
        <td rowspan="2" class="borderLine"><router-link to="updateLoginPassword"><button>修改</button></router-link></td>
      <tr>
        <td colspan="2" class="tableSmallFont textAlignLeft tablePadding">登录密码已设置 上次登录时间： 2017-08-29 14:27:24</td>
      </tr>
      <tr class="borderNone">
        <td>邮箱认证<i class="iconDangerous" v-if="!email"></i></td>
        <td :class="{ 'text-warning': email }">{{ email ? email : '未绑定' }}</td>
        <td rowspan="2">
          <router-link to="updateMobileStep1" v-if="email">
            <button :class="{ 'btn-blue': !email }">{{ email ? '修改' : '绑定'  }}</button>
          </router-link>
          <router-link to="bindEmail" v-else>
            <button :class="{ 'btn-blue': !email }">{{ email ? '修改' : '绑定'  }}</button>
          </router-link>
        </td>
      </tr>
      <tr class="borderNone">
        <td colspan="2" class="tableSmallFont textAlignLeft tablePadding">可用于获取账户资金变动通知和投资讯息</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters([
        'realName',
        'mobile',
        'email',
        'bankCard',
        'accountId',
        'transactionPasswordStatus'
      ])
    },
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .accountSet {
    width: 832px;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    background-color: #fff;
    padding-top: 21px;
    padding-bottom: 75px;

    button {
      width: 91px;
      height: 28px;
      border-radius: 100px;
      background-color: #fff;
      border: solid 1px #727e90;
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

    h1 {
      line-height: 1;
      font-size: 20px;
      color: #274161;
      margin-left: 28px;
      margin-bottom: 10px;
    }

    .accountSetTable {
      width: 755px;
      margin-left: 42px;

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

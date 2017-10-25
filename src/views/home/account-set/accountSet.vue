<template>
  <div class="accountSet">
    <h1>账户设置</h1>
    <table border="0" cellspacing="0" cellpadding="0" class="accountSetTable">
      <tr>
        <td>真实姓名</td>
        <td>哈哈哈</td>
        <td>已认证</td>
      </tr>
      <tr>
        <td>身份证</td>
        <td>010***********330</td>
        <td>已认证</td>
      </tr>
      <tr>
        <td>存管手机</td>
        <td>137*****330</td>
        <td>已认证</td>
      </tr>
      <tr>
        <td>银行卡</td>
        <td><i>**** **** **** 0974</i>（此卡是默认提现卡）</td>
        <td><button>解绑</button></td>
      </tr>
      <tr>
        <td>电子账号</td>
        <td>6212 4620 0000 0330 361 <button class="btnBlue">复制</button></td>
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
        <td>已设置</td>
        <td rowspan="2" class="borderLine"><router-link to="amendLoginSetJyPwd"><button>修改</button></router-link></td>
      </tr>
      <tr>
        <td colspan="2" class="tableSmallFontColor textAlignLeft tablePadding">保障资金安全，转入、转出、投资等资金相关操作时使用</td>
      </tr>
      <tr class="borderNone">
        <td>手机认证</td>
        <td>哈哈哈</td>
        <td rowspan="2" class="borderLine"><router-link to="amendLoginPhoneNum"><button>修改</button></router-link></td>
      </tr>
      <tr>
        <td colspan="2" class="tableSmallFontColor textAlignLeft tablePadding">保障资金安全，转入、转出、投资等资金相关操作时使用</td>
      </tr>
      <tr class="borderNone">
        <td>登录密码</td>
        <td>已设置</td>
        <td rowspan="2" class="borderLine"><router-link to="amendLoginPassword"><button>修改</button></router-link></td>
      </tr>
      <tr>
        <td colspan="2" class="tableSmallFont textAlignLeft tablePadding">登录密码已设置 上次登录时间： 2017-08-29 14:27:24</td>
      </tr>
      <tr class="borderNone">
        <td>邮箱认证<i class="iconDangerous"></i></td>
        <td class="tableSmallFontColor01">未绑定</td>
        <td rowspan="2"><router-link to="amendLoginEmailBind"><button class="btnBlue">绑定</button></router-link></td>
      </tr>
      <tr class="borderNone">
        <td colspan="2" class="tableSmallFont textAlignLeft tablePadding">登录密码已设置 上次登录时间： 2017-08-29 14:27:24</td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss">
  .accountSet {
    width: 832px;
    -webkit-box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    background-color: #fff;
    padding-top: 21px;
    padding-bottom: 75px;

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

        button {
          width: 91px;
          height: 28px;
          border-radius: 100px;
          background-color: #fff;
          border: solid 1px #727e90;
          color: #727e90;
          cursor: pointer;
        }

        button:hover {
          background-color: #7c86a2;
          border: solid 1px #727e90;
          color: #fff;
        }

        button.btnBlue {
          background-color: #fff;
          border: solid 1px #0671f0;
          color: #0671f0;
        }

        button.btnBlue:hover {
          background-color: #0671f0;
          color: #fff;
        }
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
        background: url("../../../assets/images/home/center-ico-dangerous.png") no-repeat;
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

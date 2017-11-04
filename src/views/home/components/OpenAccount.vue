<template>
  <!-- 开户组件 -->
  <div class="open-account-wrapper">
    <el-dialog title="平台开户"
               :before-close="handleClose"
               :visible.sync="visible">
      <el-steps :space="200" :active="stepActive">
        <el-step title="注册"></el-step>
        <el-step title="开户"></el-step>
        <el-step title="交易密码"></el-step>
      </el-steps>
      <el-form label-position="right" label-width="90px" v-if="stepActive === 2">
        <el-form-item label="姓名">
          <el-input v-model="openAccountData.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="openAccountData.idCard"></el-input>
        </el-form-item>
        <el-form-item label="绑定银行卡">
          <el-input v-model="openAccountData.cardNo"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox>江西银行存管协议</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="openAccount">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form label-position="right" label-width="90px" v-if="stepActive === 3">
        <el-form-item label="手机号码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="openAccount">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchOpenAccount } from 'api/home/account-set'
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    data() {
      return {
        dialogOpenAccountVisible: false,
        stepActive: 2,
        openAccountData: {
          realName: '',
          idCard: '',
          cardNo: ''
        }
      }
    },
    methods: {
      handleClose() {
        this.$parent.dialogBankLimitVisible = false;
      },
      openAccount() { // 开户操作
        fetchOpenAccount(this.openAccountData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.stepActive = 3;
            }
            console.log(response);
          })
      }
    }
  }
</script>

<style lang="scss">
  .open-account-wrapper {
    .el-dialog__body {
      padding-left: 85px;
    }
    
    input {
      width: 320px;
      background-color: #fff;
      border: solid 1px #bfc1c4;
    }
    
    button {
      width: 310px;
      height: 48px;
      border-radius: 100px;
      background-color: #0671f0;
      
      span {
        width: 48px;
        height: 16px;
        font-size: 16px;
        color: #fff;
      }
    }
  }
</style>

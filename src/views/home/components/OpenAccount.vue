<template>
  <div class="open-account-wrapper">
    <el-dialog title="平台开户"
               :before-close="handleClose"
               :visible.sync="visible">
      <el-steps :space="200" :active="2">
        <el-step title="注册"></el-step>
        <el-step title="开户"></el-step>
        <el-step title="交易密码"></el-step>
      </el-steps>
      <el-form label-position="right" label-width="90px">
        <el-form-item label="姓名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="绑定银行卡">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-checkbox>江西银行存管协议</el-checkbox>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false,
        required: true
      }
    },
    computed: {
      ...mapGetters([
        'mobile'
      ])
    },
    data() {
      return {}
    },
    methods: {
      handleClose() {
        this.$parent.dialogBankLimitVisible = false;
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

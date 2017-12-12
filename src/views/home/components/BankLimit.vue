<template>
  <el-dialog class="bank-limit-wrapper"
             title="支持快捷支付的银行与限额参考表"
             width="750px"
             :before-close="handleClose"
             :visible.sync="visible">
    <table class="table table-hover">
      <thead>
        <tr>
          <td>支持银行</td>
          <td colspan="2">交易限额</td>
          <td>备注</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list">
          <td>{{ item.name }}</td>
          <td>{{ '单笔' + item.singleLimit }}</td>
          <td>{{ '单日' + item.dayLimit }}</td>
          <td>{{ item.remarks }}</td>
        </tr>
        <tr>
          <td colspan="4" style="color: #FF4949;">
            <p>充值金额可参考上表，具体的额度以发卡银行为准。</p>
            <p>如果您在发卡银行设置的支付金额低于此表额度，以您的设置为准。</p>
          </td>
        </tr>
      </tbody>
    </table>
  </el-dialog>
</template>

<script>
  import { fetchBankLimit } from 'api/home/public';
  
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
        list: null
      }
    },
    methods: {
      getList() {
        fetchBankLimit().then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data;
          }
        });
      },
      handleClose() {
        this.$emit('close');
      }
    },
    created() {
      this.getList();
    }
  }
</script>

<style lang="scss">
  .bank-limit-wrapper {
    .table td {
      text-align: center;
      font-size: 14px;
      color: #727e90;
    }
    
    .table thead {
      color: #878d99;
      background: #f5f7fa;
      font-weight: 500;
    }
  }
</style>

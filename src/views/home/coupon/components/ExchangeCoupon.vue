<template>
  <el-dialog title="兑换优惠券"
             size="tiny"
             :before-close="handleClose"
             :visible.sync="visible">
    <el-form class="exchange-coupon hth-from" label-position="right" label-width="60px">
      <el-form-item label="兑换码">
        <el-input v-model="exchangeCode"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="handleClose" :plain="true" type="info">取消</el-button>
        <el-button @click="exchangeCoupon"
                   :loading="loading"
                   :disabled="!exchangeCode" type="primary">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { fetchExchangeCoupon } from 'api/home/coupon';
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loading: false,
        exchangeCode: ''
      }
    },
    methods: {
      exchangeCoupon() { // 兑换优惠券
        this.loading = true;
        fetchExchangeCoupon({ cdkey: this.exchangeCode })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$emit('add-success');
            } else {
              this.$message.error('兑换优惠券失败:' + response.data.meta.message);
            }
            this.loading = false;
          })
      },
      handleClose() {
        this.$emit('close');
      }
    }
  }
</script>

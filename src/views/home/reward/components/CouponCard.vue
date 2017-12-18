<template>
  <div class="coupon-container">
    <div class="coupon-wrapper__box-open-account" v-if="status === 0">
      <a @click.stop="toOpenAccount">立即开户激活</a>
    </div>
    <div class="coupon-wrapper__box-top"
         :class="data.status === 'expire' ? 'expire' : ''">
      <i class="icon-new" v-if="data.isNew === 1"></i>
      <p class="title">
        <span v-if="data.type === 'plus_coupon'">
          <span class="roboto-regular">{{ data.rate }}</span>%
        </span>
        <span v-else>
          <span class="roboto-regular">{{ data.money }}</span>元
        </span>
      </p>
      <p class="detail">{{ data.type | keyToValue(typeList) }}劵<span>［满{{ data.lowerLimitMoney }}可用］</span></p>
      <p class="time">{{ data.getTime }} - {{ data.endTime }}</p>
    </div>
    <div class="coupon-wrapper__box-body">
      <div class="content" v-if="data.type === 'plus_coupon'">
        <p class="money" v-if="data.maxInterestMoney != 0">最高计息金额：<span class="roboto-regular">{{ data.maxInterestMoney }}</span>元</p>
        <p class="money" v-if="data.interestDeadline != 0">最高计息天数：<span class="roboto-regular">{{ data.interestDeadline }}</span>天</p>
        <p style="line-height: 1.67;">使用说明：{{ data.description }}</p>
      </div>
      <div class="content" v-else>
        <p style="line-height: 1.67;">使用说明：{{ data.description }}</p>
      </div>
      <a v-if="data.status === 'unused'" class="newUse" @click="toIndexPage">立即使用</a>
      <i v-if="data.status === 'used'" class="status-sign ku-icon icon-mark-used"></i>
      <i v-if="data.status === 'expire'" class="status-sign ku-icon icon-mark-expired"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { getLocationUrl } from 'utils/index';
  import { couponTypeList } from 'utils/home/index';

  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        typeList: couponTypeList
      }
    },
    computed: {
      ...mapGetters([
        'status'
      ])
    },
    methods: {
      toIndexPage() {
        window.location.href = getLocationUrl();
      },
      toOpenAccount() {
        this.$router.push('/accountManage/set/openAccount');
      }
    }
  }
</script>

<style lang="scss">
  .coupon-wrapper__box-body {
    position: relative;

    .status-sign {
      position: absolute;
      top: 20px;
      right: 20px;
      color: #808080;
      font-size: 80px;
    }
  }
</style>

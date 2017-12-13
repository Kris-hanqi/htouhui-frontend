<template>
  <div class="index-page">
    <hth-header></hth-header>
    <!-- 个人中心 -->
    <div class="home-wrapper">
      <!-- 面包屑导航 -->
      <div class="home-wrapper__breadcrumb">
        <hth-breadcrumb></hth-breadcrumb>
      </div>
      <div class="home-wrapper__account">
        <!-- 左侧菜单 -->
        <div class="home-wrapper__account-menu">
          <hth-sidebar :show-novice-plan="novicePlanStatus !== 3"
                       :show-loan="isBorrower"></hth-sidebar>
        </div>
        <div class="main-container">
          <!-- 步骤操作区域 -->
          <div class="prompt-message" v-if="operationTips">
            <span>{{ operationTips.title }}</span>
            <el-button @click="operationTips.fun">{{ operationTips.btnText }}</el-button>
          </div>
          <!-- 广告位 -->
          <div v-if="!operationTips && ARecommend" class="prompt-ad">
            <a :href="ARecommend.address" target="_blank">
              <img :src="ARecommend.pictureUrl">
            </a>
          </div>
          <div class="main-container__router">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <hth-slider-bar></hth-slider-bar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthHeader from 'components/header';
  import HthSliderBar from 'components/slider-bar';
  import HthBreadcrumb from './breadcrumb';
  import HthSidebar from './Sidebar';
  import { fetchAdRecommend, fetchGetBankMessage } from 'api/home/public';

  export default {
    components: {
      HthHeader,
      HthSliderBar,
      HthBreadcrumb,
      HthSidebar
    },
    computed: {
      ...mapGetters([
        'novicePlanStatus',
        'isBorrower',
        'baseUrl',
        'uuid'
      ]),
      operationTips() {
        return this.operationTipsArray[this.$store.state.user.status]
      }
    },
    data() {
      return {
        status: this.$store.state.user.status,
        operationTipsArray: [
          {
            status: 0,
            title: '您还未开通江西银行存管账户，即刻开通确保您的正常使用和资金安全。',
            btnText: '开通江西银行存管账户',
            fun: this.showOpenAccount
          },
          {
            status: 1,
            title: '设置交易密码可提高账号安全。',
            btnText: '立即设置',
            fun: this.toTransactionPassword
          },
          {
            status: 2,
            title: ' 您可以去充值投资啦，请绑定银行卡。',
            btnText: '去绑卡',
            fun: this.toBindBackCard
          }
        ],
        ARecommend: {}
      }
    },
    methods: {
      getARecommend() {
        fetchAdRecommend().then(response => {
          if (response.data.meta.code === 200) {
            this.ARecommend = response.data.data;
          }
        })
      },
      showOpenAccount() {
        if (this.$store.getters.thirdPartyName === 'KONG_ZHONG') {
          if (!this.$store.getters.mobile) {
            window.location.href = this.$store.getters.baseUrl + '/jixin/addNewUserMoblie';
            return;
          }
          window.location.href = this.baseUrl + '/jixin/open-account';
          return;
        }
        this.$router.push('/accountManage/set/openAccount');
      },
      toTransactionPassword() {
        if (this.$store.getters.thirdPartyName === 'KONG_ZHONG') {
          window.location.href = this.baseUrl + '/setCashPassword';
          return;
        }
        this.$router.push('/accountManage/set/transactionPassword');
      },
      toBindBackCard() {
        this.$router.push('/accountManage/set/bindBackCard');
      }
    },
    created() {
      this.getARecommend();
      this.$store.dispatch('GetUserInfo');
      if (this.uuid) {
        fetchGetBankMessage({ uuid: this.uuid })
          .then(response => {
            if (response.data.meta.code === 200) {
              const data = response.data.data;
              if (data && data.length) {
                this.$message(data[0].msg);
              }
            }
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home-wrapper {
    width: 1000px;
    margin: 0 auto;
  }

  .home-wrapper__breadcrumb {
    margin: 20px 0;
    font-size: 16px;
    color: #274161;
  }

  .home-wrapper__account-menu {
    float: left;
  }

  .main-container {
    float: right;
    width: 832px;

    .prompt-message {
      width: 100%;
      height: 54px;
      margin-bottom: 15px;
      background-color: #fcf8e3;
      line-height: 54px;

      span {
        font-size: 14px;
        color: #ce9764;
        margin-left: 9px;
      }

      button {
        float: right;
        height: 36px;
        border-color: #ff7900;
        padding: 0 15px;
        border-radius: 100px;
        background-color: #ff7900;
        text-align: center;
        font-size: 16px;
        color: #fff;
        margin-right: 11px;
        margin-top: 10px;
      }
    }

    .prompt-ad {
      overflow: hidden;
      width: 832px;
      height: 54px;
      cursor: pointer;
      margin-bottom: 15px;
    }
  }
</style>

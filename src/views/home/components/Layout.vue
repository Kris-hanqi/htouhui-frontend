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
          <hth-sidebar :show-novice-plan="showNovicePlan" :show-loan="isBorrower"></hth-sidebar>
        </div>
        <div class="main-container">
          <div class="prompt-message" v-if="operationTips">
            <span>{{ operationTips.title }}</span>
            <el-button @click="operationTips.fun">{{ operationTips.btnText }}</el-button>
          </div>
          <div class="prompt-message" v-else>
            <!--<span>{{ operationTips.title }}</span>-->
            <!--<el-button>{{ operationTips.btnText }}</el-button>-->
          </div>
          <div class="main-container__router">
          
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <open-account :visible="dialogOpenAccountVisible" @close="closeOpenAccount"></open-account>
    <hth-slider-bar></hth-slider-bar>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthHeader from 'components/header';
  import HthSliderBar from 'common/slider-bar';
  import HthBreadcrumb from './breadcrumb';
  import OpenAccount from './OpenAccount.vue';
  import HthSidebar from './Sidebar';
  import { fetchARecommend } from '@/api/home/public';

  export default {
    components: {
      HthHeader,
      HthSliderBar,
      HthBreadcrumb,
      HthSidebar,
      OpenAccount
    },
    computed: {
      ...mapGetters([
        'showNovicePlan',
        'isBorrower'
      ]),
      operationTips() {
        return this.operationTipsArray[this.$store.state.user.status]
      }
    },
    data() {
      return {
        status: this.$store.state.user.status,
        dialogOpenAccountVisible: false,
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
            fun: this.showOpenAccount
          },
          {
            status: 2,
            title: '您可以去充值投资啦，请在提现前绑定银行卡。',
            btnText: '去绑卡',
            fun: this.showOpenAccount
          }
        ],
        ARecommend: {}
      }
    },
    methods: {
      getARecommend() {
        fetchARecommend().then(response => {
          if (response.data.meta.code === 200) {
            this.ARecommend = response.data.data;
          }
        })
      },
      showOpenAccount() {
        this.dialogOpenAccountVisible = true;
      },
      closeOpenAccount() {
        this.dialogOpenAccountVisible = false;
      }
    },
    watch: {
      status(val, oldVal) {
        console.log(val);
        console.log(oldVal);
      }
    },
    created() {
      if (this.status === 3) {
        this.getARecommend();
      }
      this.$store.dispatch('GetUserInfo');
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
  
    .main-container__router {
      margin-top: 8px;
    }
  }
</style>

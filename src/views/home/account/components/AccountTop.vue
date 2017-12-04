<template>
  <div class="account-top-wrapper">
    <hth-panel>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload">
        <avatar size="large" icon="icon-avatar"></avatar>
      </el-upload>
      <span class="text">你好，<i class="num-font">{{ realName || username }}</i></span>
      <a @click.stop="operationAccount"
         style="margin-right: 8px;"
         :class="{ active: status }">
        <i class="ku-icon icon-user"></i>
      </a>
      <a @click.stop="operationBankCard" :class="{ active: bankCard }">
        <i class="ku-icon icon-bank-card"></i>
      </a>
      <el-button class="recharge-bth"
                 :round="true"
                 :plain="true"
                 @click="toRouter('account/withdraw')"
                 type="primary">提现</el-button>
      <el-button class="withdraw-btn"
                 :round="true"
                 type="primary"
                 @click="toRouter('account/recharge')">充值</el-button>
    </hth-panel>

    <!-- 开户组件 -->
    <guide-operational :visible="dialogOpenAccountVisible"
                  @close="closeOpenAccount"></guide-operational>

    <!-- 解绑银行卡 -->
    <unlock-bank-card :visible="dialogUnlockBankCardVisible"
                      @close="closeUnlockBankCard"></unlock-bank-card>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import Avatar from 'common/components/avatar/index';
  import GuideOperational from '../../components/GuideOperational.vue';
  import UnlockBankCard from '../../components/UnlockBankCard.vue';
  import { uploadimghead } from 'api/home/uploadimghead';

  export default {
    components: {
      HthPanel,
      Avatar,
      GuideOperational,
      UnlockBankCard
    },
    computed: {
      ...mapGetters([
        'realName',
        'username',
        'status',
        'bankCard'
      ])
    },
    data() {
      return {
        dialogOpenAccountVisible: false,
        dialogUnlockBankCardVisible: false
      }
    },
    methods: {
      // 操作银行卡
      operationBankCard() {
        if (this.status === 0) {
          this.isOpenAccount();
          return;
        }
        if (!this.bankCard) {
          this.$router.push('/accountManage/set/bindBackCard');
        } else {
          this.dialogUnlockBankCardVisible = true;
        }
      },
      operationAccount() {
        if (this.status === 0) {
          this.dialogOpenAccountVisible = true
        }
      },
      isOpenAccount() {
        this.$alert('你尚未开户，请先开户', '提示', {
          confirmButtonText: '去开户',
          type: 'warning',
          callback: action => {
            if (action === 'confirm') {
              this.dialogOpenAccountVisible = true;
            }
          }
        });
      },
      toRouter(path) {
        if (this.status === 0) {
          this.isOpenAccount();
          return;
        }
        this.$router.push('/' + path);
      },
      closeOpenAccount() {
        this.dialogOpenAccountVisible = false;
      },
      closeUnlockBankCard() {
        this.dialogUnlockBankCardVisible = false;
      },
      // element-ui upload组件方法
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isPNG = file.type === 'image/png';
        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG或者PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        const fromData = new FormData();
        fromData.append('file', file);
        uploadimghead(fromData)
          .then(response => {
            console.log(response);
          });
        return false;
      }
    }
  }
</script>

<style lang="scss">
  .account-top-wrapper {
    .hth-panel-body {
      height: 73px;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 73px;
    }
  
    .ku-icon {
      font-size: 20px;
    }

    button.top {
      float: right;
    }

    .iconfont {
      font-size: 23px;
    }

    .active {
      color: #409eff;
    }

    .recharge-bth,
    .withdraw-btn {
      float: right;
      margin-top: 17px;
    }

    .withdraw-btn {
      margin-right: 16px;
    }

    span.text {
      margin-right: 20px;
      font-size: 16px;
      vertical-align: middle;
    }

    a {
      display: inline-block;
      vertical-align: middle;
      width: 23px;
    }

    .avatar-uploader {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 40px;
    }

    .kui-avatar {
      vertical-align: top;
    }

    .avatar-uploader .el-upload {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }

    .el-upload__input {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
</style>

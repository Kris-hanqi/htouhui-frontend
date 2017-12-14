<template>
  <div class="pullOut">
    <p class="title">{{ exitInfoData.planName }}申请退出</p>
    <div class="canPullMoney">
      <p class="inTimeLimitMoney">锁定期内可退金额<span class="roboto-regular">{{ exitInfoData.lockExitMoney | currency('') }}</span><span>元</span></p>
      <p class="outTimeLimitMoney">锁定期外可退出金额<span class="roboto-regular">{{ exitInfoData.unlockExitMoney | currency('') }}</span><span>元</span></p>
    </div>
    <div class="main">
      <span>申请退出</span>
      <input type="number" class="putOutMoney" v-model.number="exitMoney">
      <el-button type="text" @click="showExitModal"><p class="btn-out">退出</p></el-button>
      <el-button type="text" @click="showExitModal('all')"><p class="btn-allOut">全部退出</p></el-button>
    </div>
    
    <!-- 退出提示 -->
    <el-dialog title="退出金额中" :visible.sync="dialogVisible" width="600px">
      <div class="dialog-main">
        <div>
          <p class="first-p"><span class="roboto-regular">{{ exitMoney | currency('')  }}</span>元</p>
          <p>退出金额</p>
        </div>
        <div>
          <p class="first-p"><span class="roboto-regular">{{ exitRate | currency('')  }}</span>元</p>
          <p>退出手续费</p>
        </div>
        <div class="txt">
          <p>圣上！不要退出！</p>
          <p>放在里面可以继续<span>钱滚钱</span>啊！</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exitPlan" :loading="exitButLoading">确 定</el-button>
      </div>
    </el-dialog>
    
    <div class="hint">
      <p class="hint-title">温馨提示</p>
      <div class="hint-txt">
        <p>1.申请退出后，T+3个工作日为您处理，实际到账时间取决于银行自动债权转让的速度；</p>
        <p>2.退出金额中属于锁定期内的金额，收取退出金额的{{ exitInfoData.feeRateFormat }}%手续费，属于锁定期外的金额，免手续费，退出时系统将优先退出锁定期外金额。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchGetExitInfo, fetchExitPlan } from 'api/home/investment';

  /**
   * 退出逻辑
   *    优先退出锁定期外
   *    锁定期内需要收取手续费
   *    例子: 锁定期内可退出金额 500; 锁定期外可退出金额 500; 退出金额600; 手续费 (600-500)*退出利率
   */
  export default {
    data() {
      return {
        planId: '',                 // 标的ID
        dialogVisible: false,       // 是否打开退出弹窗
        exitInfoData: {
          planId: '',               // 计划id
          planName: '',             // 计划名称,
          lockExitMoney: '',        // 锁定期内可退出金额,
          unlockExitMoney: '',      // 锁定期外可退出金额,
          totalAllowExitMoney: '',  // 总的可退出金额
          feeRate: '',              // 退出手续费利率,
          feeRateFormat: ''         // 百分比的手续费利率
        },
        exitMoney: '',              // 退出金额
        exitRate: '',               // 退出手续费
        exitButLoading: false       // 退出按钮加载
      }
    },
    methods: {
      // 获取退出信息
      getExitInfo(id) {
        fetchGetExitInfo({ planId: id })
          .then(response => {
            if (response.data.meta.code === 200) {
              this.exitInfoData.planId = response.data.data.planId;
              this.exitInfoData.planName = response.data.data.planName;
              this.exitInfoData.lockExitMoney = response.data.data.lockExitMoney;
              this.exitInfoData.unlockExitMoney = response.data.data.unlockExitMoney;
              this.exitInfoData.totalAllowExitMoney = response.data.data.totalAllowExitMoney;
              this.exitInfoData.feeRate = response.data.data.feeRate;
              this.exitInfoData.feeRateFormat = response.data.data.feeRateFormat;
            }
          })
      },
      // 打开退出modal -- 计算利息
      showExitModal(type) {
        if (type === 'all') {
          this.exitMoney = this.exitInfoData.lockExitMoney + this.exitInfoData.unlockExitMoney;
        } else {
          if (!this.exitMoney) {
            this.$message({
              message: '退出金额不能为空',
              type: 'error'
            });
            return;
          }
        }
        if (this.exitMoney > this.exitInfoData.lockExitMoney + this.exitInfoData.unlockExitMoney) {
          this.$message({
            message: '退出金额大于总可退出金额',
            type: 'error'
          });
          return;
        }
        // 计算手续费
        if (this.exitMoney <= this.exitInfoData.unlockExitMoney) {
          this.exitRate = 0;
        } else {
          this.exitRate = (this.exitMoney - this.exitInfoData.unlockExitMoney) * this.exitInfoData.feeRate;
        }
        this.dialogVisible = true;
      },
      exitPlan() {
        this.exitButLoading = true;
        const exitPlanData = {};
        exitPlanData.planId = this.exitInfoData.planId;
        exitPlanData.exitMoney = this.exitMoney;
        exitPlanData.source = 'pc';
        fetchExitPlan(exitPlanData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.dialogVisible = false;
              // 跳转加入记录页面 -- 退出tab
              this.$router.push({ path: '/investment/quantify/transactionRecord/' + this.planId, query: { tabName: 'second' } });
            }
            this.exitButLoading = false;
          })
      }
    },
    created() {
      this.planId = this.$route.params.id;
      this.getExitInfo(this.planId);
    }
  };
</script>

<style lang="scss" scoped>
  .pullOut {
    width: 100%;
    height: 845px;
    box-sizing: border-box;
    padding: 20px 50px 25px 25px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    .title {
      margin-bottom: 50px;
      font-size: 20px;
      color: #274161;
    }

    .canPullMoney {
      margin-bottom: 30px;

      p {
        display: inline-block;
        font-size: 16px;
        color: #727e90;

        &:first-child {
          margin-right: 80px;
        }

        span {
          margin-left: 5px;
          font-size: 20px;
        }

        .roboto-regular {
          font-size: 30px;
        }
      }

      .inTimeLimitMoney .roboto-regular {
        color: #ff4a33;
      }
    }

    .main {
      padding-bottom: 70px;
      border-bottom: 1px dashed #aab2c9;
      margin-bottom: 2px;

      span {
        font-size: 16px;
        color: #727e90;
        margin-right: 10px;
      }

      .putOutMoney {
        width: 350px;
        height: 50px;
        box-sizing: border-box;
        background-color: #fff;
        border: solid 1px #bfc1c4;
        padding-left: 10px;
      }

      p {
        display: inline-block;
        width: 125px;
        height: 45px;
        box-sizing: border-box;
        border-radius: 100px;
        margin-left: 15px;
        line-height: 46px;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
      }

      .btn-out {
        background-color: #378ff6;
        border: 1px solid #378ff6;
        color: #fff;
      }

      .btn-allOut {
        background-color: #fff;
        border: solid 1px #979797;
        color: #9b9b9b;
      }
    }

    .hint {
      padding-top: 20px;
      border-top: 1px dashed #aab2c9;

      .hint-title {
        margin-bottom: 15px;
        font-size: 16px;
        color: #394b67;
      }

      .hint-txt {
        width: 688px;
        margin: 0 auto;

        p {
          font-size: 14px;
          line-height: 1.79;
          color: #727e90;
        }
      }
    }
  }

  .pullOut .dialog-main {
    > div {
      display: inline-block;
      text-align: center;
      margin-left: 95px;

      p {
        display: block;
        width: 100%;
        height: auto;
        margin: 0;
        line-height: normal;
        color: #7c86a2;
        font-size: 16px;
        cursor: auto;
      }

      .first-p {
        color: #394b67;
        font-size: 18px;

        span {
          margin: 0;
          font-size: 30px;
        }
      }
    }

    .txt {
      display: block;
      margin: 0 auto;
      margin-top: 25px;
      text-align: center;

      p {
        font-size: 18px;
        color: #ff4a33;

        span {
          color: #ff4a33;
          font-size: 30px;
        }
      }
    }
  }
</style>

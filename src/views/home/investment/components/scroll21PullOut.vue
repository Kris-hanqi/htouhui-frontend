<template>
  <div class="pullOut">
    <p class="title">{{ reservationExitData.planName }}申请退出</p>
    <div class="canPullMoney">
      <p class="inTimeLimitMoney">可退出金额<span class="roboto-regular">{{ reservationExitData.canExitMoney | currency('') }}</span><span>元</span></p>
      <p class="outTimeLimitMoney">预期退出时间<span class="roboto-regular">{{ reservationExitData.appointmentExitTime }}</span></p>
    </div>
    <div class="main">
      <span>申请退出</span>
      <input type="text" v-model.number="exitMoney" class="putOutMoney">
      <el-button type="text" @click="showReservationExit"><p class="btn-out">退出</p></el-button>
      <el-button type="text" @click="showReservationExit('all')"><p class="btn-allOut">全部退出</p></el-button>
    </div>
  
    <el-dialog title="退出金额中" :visible.sync="dialogVisible" width="500px">
      <div class="dialog-main">
        <div>
          <p class="first-p"><span class="roboto-regular">{{ exitMoney }}</span>元</p>
          <p>退出金额</p>
        </div>
        <div class="txt">
          <p>圣上！不要退出！</p>
          <p>放在里面可以继续<span>钱滚钱</span>啊！</p>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="exitButLoading" @click="reservationExit">确 定</el-button>
      </div>
    </el-dialog>
    
    <div class="hint">
      <p class="hint-title">温馨提示</p>
      <div class="hint-txt">
        <p>1.申请预约退出后，可退出时间内为您处理，实际到账时间取决于银行还款到账的速度。</p>
        <p>2.退出申请操作完成后，该期不再自动续投，本金及利息到期后返还至您的账户。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchGetReservationExitInfo, fetchReservationExit } from 'api/home/investment-scroll21';

  export default {
    data() {
      return {
        planId: '',
        dialogVisible: false,
        reservationExitData: {
          joinPlanId: '',              // 加入计划ID
          canExitMoney: '',            // 可退出金额
          appointmentExitTime: '',     // 预期退出时间
          planName: '',                // 计划名称
          incrMoney: '',               // 退出递增金额(预约退出金额必须为该金额倍数)
          canAppointExit: ''           // 是否可预约退出
        },
        exitMoney: '',
        exitButLoading: false
      }
    },
    methods: {
      getReservationExitInfo(id) {
        fetchGetReservationExitInfo(id)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.reservationExitData.joinPlanId = response.data.data.joinPlanId;
              this.reservationExitData.canExitMoney = response.data.data.canExitMoney;
              this.reservationExitData.appointmentExitTime = response.data.data.appointmentExitTime;
              this.reservationExitData.planName = response.data.data.planName;
              this.reservationExitData.incrMoney = response.data.data.incrMoney;
              this.reservationExitData.canAppointExit = response.data.data.canAppointExit;
            }
          })
      },
      showReservationExit(type) {
        if (type === 'all') {
          this.exitMoney = this.reservationExitData.canExitMoney;
        }
        // 数据校验
        if (!this.exitMoney) return;
        if (this.exitMoney > this.reservationExitData.canExitMoney) {
          this.$message({
            message: '退出金额大于总可退出金额',
            type: 'error'
          });
          return;
        }
        if (this.exitMoney % this.reservationExitData.incrMoney !== 0) {
          this.$message({
            message: `退出金额必须是${this.reservationExitData.incrMoney}的倍数`,
            type: 'error'
          });
          return;
        }
        this.dialogVisible = true;
      },
      reservationExit() {
        this.exitButLoading = true;
        const exitData = {};
        exitData.money = this.exitMoney;
        exitData.joinPlanId = this.reservationExitData.joinPlanId;
        fetchReservationExit(exitData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$message({
                message: '预约退出成功!',
                type: 'success'
              });
              this.exitMoney = '';
              // 跳转加入记录页面
              this.$router.push({ path: '/investment/scroll21/index', query: { tagName: 'second' } });
            }
  
            if (response.data.meta.code === 9999) {
              this.$notify.error({
                title: '操作失败',
                message: response.data.meta.message
              });
            }
            this.dialogVisible = false;
            this.exitButLoading = false;
          })
      }
    },
    created() {
      this.planId = this.$route.params.id;
      this.getReservationExitInfo(this.planId);
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
      text-align: center;

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

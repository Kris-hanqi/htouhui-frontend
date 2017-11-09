<template>
  <div class="pullOut">
    <p class="title">{{ messageList.planName }}申请退出</p>
    <div class="canPullMoney">
      <p class="inTimeLimitMoney">可退出金额<span class="roboto-regular">{{ messageList.canExitMoney | currency('') }}</span><span>元</span></p>
      <p class="outTimeLimitMoney">预期退出时间<span class="roboto-regular">{{ messageList.appointmentExitTime }}</span></p>
    </div>
    <div class="main">
      <span>申请退出</span>
      <input type="number" class="putOutMoney">
      <el-button type="text" @click="dialogVisible = true"><p class="btn-out">退出</p></el-button>
      <el-button type="text" @click="dialogVisible = true"><p class="btn-allOut">全部退出</p></el-button>

      <el-dialog title="退出金额中" :visible.sync="dialogVisible" width="30%">
        <div class="dialog-main">
          <div>
            <p class="first-p"><span class="roboto-regular">900</span>元</p>
            <p>退出金额</p>
          </div>
          <div>
            <p class="first-p"><span class="roboto-regular">18.00</span>元</p>
            <p>退出手续费</p>
          </div>
          <div class="txt">
            <p>圣上！不要退出！</p>
            <p>放在里面可以继续<span>钱滚钱</span>啊！</p>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
  import { getAppointmentExitInfo } from 'api/home/getAppointmentExitInfo';

  export default {
    data() {
      return {
        dialogVisible: false,
        listQuery: {
          joinPlanId: this.$route.params.id
        },
        messageList: {}
      }
    },
    methods: {
      getMessageList() {
        getAppointmentExitInfo(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.messageList = data.data;
            console.log('21天申请退出页面' + this.messageList);
            console.log(this.messageList);
          }
        })
      }
    },
    created() {
      this.getMessageList();
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

<template>
  <!-- 收益计算器组件 -->
  <div class="gain-calculator">
    <div class="header">
      <p>收益计算器</p>
    </div>
    <div class="body">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-xs-4 control-label">投资金额</label>
          <div class="col-xs-7">
            <input type="text" v-model.number="gainData.money" class="form-control" placeholder="请输入投资金额">
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-4 control-label">期&nbsp;&nbsp;&nbsp;限</label>
          <div class="col-xs-7">
            <div class="radio">
              <label>
                <input type="radio" v-model="gainData.deadline" name="time" value="1">
                1个月  <span><i>7.2</i>%</span>
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" v-model="gainData.deadline" name="time" value="3">
                3个月 <span><i>8.0</i>%</span>
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" v-model="gainData.deadline" name="time" value="6">
                6个月 <span><i>9.5</i>%</span>
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" v-model="gainData.deadline" name="time" value="12">
                12个月 <span><i>11.0</i>%</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-4 control-label">享受收益</label>
          <div class="col-xs-7">
            <p class="form-control-static box">{{ gain }}元</p>
          </div>
        </div>
        <div class="form-group" style="margin: 0 40px; text-align: center;">
          <el-button type="primary" @click="getGain" style="width: 100%" round>计算收益</el-button>
          <p style="margin-top: 20px">以上结果为先息后本计算方式</p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { feachGainCalculator } from 'api/public';
  export default {
    data() {
      return {
        gainData: {
          money: '',
          type: 'loan_type_3',
          rate: '',
          deadline: 1
        },
        configData: [
          { time: 1, rate: 7.2 },
          { time: 3, rate: 8 },
          { time: 6, rate: 9.5 },
          { time: 12, rate: 11 }
        ],
        gain: 0
      }
    },
    methods: {
      getGain() {
        if (!this.gainData.money) return;
        this.configData.forEach(v => {
          if (v.time.toString() === this.gainData.deadline.toString()) {
            this.gainData.rate = v.rate;
          }
        });
        feachGainCalculator(this.gainData).then(response => {
          if (response.data.meta.code === 200) {
            this.gain = response.data.data.anticipatedInterest;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  $gain-calculator-bg: #4181dc;
  
  .gain-calculator {
    .header {
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: $gain-calculator-bg;
    }
    
    .header p {
      font-size: 20px;
      font-weight: 400;
      color: #fff;
    }
    
    .body {
      padding: 20px 0;
    }
    
    i {
      color: #ff5f5f;
    }
    
    .box {
      width: 176px;
      background-color: #ebf3ff;
      outline: none;
      text-align: center;
    }
  }
</style>

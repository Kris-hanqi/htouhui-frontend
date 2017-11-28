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
            <input type="text" class="form-control" placeholder="请输入投资金额">
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-4 control-label">期&nbsp;&nbsp;&nbsp;限</label>
          <div class="col-xs-7">
            <div class="radio">
              <label>
                <input type="radio" name="optionsRadios" value="option1">
                1个月
              </label>
            </div>
            <div class="radio">
              <label>
                <input type="radio" name="optionsRadios" value="option2">
                3个月
              </label>
            </div>
            <div class="radio disabled">
              <label>
                <input type="radio" name="optionsRadios" value="option3">
                6个月
              </label>
            </div>
            <div class="radio disabled">
              <label>
                <input type="radio" name="optionsRadios" value="option3">
                12个月
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-xs-4 control-label">享受收益</label>
          <div class="col-xs-7">
            <input type="text" class="form-control" placeholder="请输入投资金额">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
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
  }
</style>

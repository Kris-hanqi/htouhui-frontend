<template>
  <div class="help-container">
    <shortcut></shortcut>
    <!-- banner图 -->
    <div class="banner"></div>
    
    <!-- 平台介绍 -->
    <div class="platform-introduction hth-container">
      <div class="platform-introduction__txt">
        <h1>01.平台介绍</h1>
        <p>北京冠城瑞富信息技术有限公司创办于2015年4月，注册资本5000万元人民币，实缴资本5000万元人民币，
        总部位于北京，拥有完整的产品、研发、风控、财务、市场以及客服等职能体系，是一家具备优秀的自主研发能力的金融创新型企业。</p>
        <p>海投汇的核心团队来自于国内的金融投资及互联网企业，凭借丰富的投资管理和金融风控经验以及互联网信息管理技术，
        为投资者提供透明、灵活、便捷的金融产品和金融服务，也为中小微企业提供融资服务。</p>
      </div>
      <img src="../assets/img/help/platform-introduction.jpg" alt="">
    </div>
    
    <!-- 我们的优势 -->
    <div class="advantage">
      <h1>02.我们的优势</h1>
    </div>
    
    <!-- 投资流程 -->
    <div class="investment-process">
      <h1>03.投资流程</h1>
    </div>
  </div>
</template>

<script>
  import Shortcut from '~/components/Shortcut.vue'
  
  export default {
    components: {
      Shortcut
    }
  }
</script>

<style lang="scss">
  .help-container {
    .banner {
      width: 100%;
      height: 639px;
      background: #6eccfc url(../assets/img/help/banner.jpg) no-repeat center;
    }
  
    h1 {
      font-size: 44px;
      font-weight: 300;
      color: #49a3f1;
    }
    
    .platform-introduction {
      padding: 80px 0;
    }
    
    .platform-introduction__txt {
      float: left;
      width: 450px;
      margin-left: 50px;
      margin-right: 200px;
      color: #bfbebe;
      font-size: 16px;
      line-height: 32px;
  
      p {
        text-indent: 2em;
        margin-top: 15px;
      }
    }
    
    .advantage {
      background-color: #f9f9f9;
      padding: 80px 0;
      
      h1 {
        text-align: center;
      }
    }
    
    .investment-process {
      padding: 80px 0;
  
      h1 {
        text-align: center;
      }
    }
  }
</style>

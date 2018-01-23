<template>
  <div class="footer-container">
    <div class="footer-container__top hth-container">
      <el-row :gutter="20">
        <el-col :span="3">
          <h3><a href="">关于海投汇</a></h3>
          <ul>
            <li><a href="">公司介绍</a></li>
            <li><a href="">团队介绍</a></li>
            <li><a href="">联系我们</a></li>
            <li><a href="">加入我们</a></li>
          </ul>
        </el-col>
        <el-col :span="3">
          <h3><a href="">法律法规</a></h3>
          <ul>
            <li><a href="">法律顾问</a></li>
            <li><a href="">法律协议</a></li>
            <li><a href="">法律声明</a></li>
            <li><a href="">法律政策</a></li>
          </ul>
        </el-col>
        <el-col :span="3">
          <h3><a href="">帮助中心</a></h3>
          <ul>
            <li><a href="">投资人必读</a></li>
            <li><a href="">新手指引</a></li>
            <li><a href="">充值提现指导</a></li>
          </ul>
        </el-col>
        <el-col :span="8">
          <h3><a href="">联系我们</a></h3>
          <ul>
            <li>客服电话：400-698-8810（工作日 9:00-18:00）</li>
            <li>客服邮箱：callcenter@htouhui.com</li>
            <li>公司地址：北京市朝阳区东三环北路19号中青大厦18层</li>
            <li>我要合作：bd@htouhui.com</li>
          </ul>
        </el-col>
        <el-col style="text-align: center;" :span="6">
          <img src="../assets/img/components/qr_code_download.jpg" alt="">
          <p>市场有风险，投资需谨慎</p>
        </el-col>
      </el-row>
    </div>
    <div class="footer-container__info hth-container">
      <div class="text">
        版权所有 © 北京冠城瑞富信息技术有限公司 Copyright Reserved&nbsp;&nbsp;|&nbsp;&nbsp;京ICP证B2-20171701号 京ICP备15020986
        <span style="padding-left: 20px">信息安全等级保护三级：11010517098-00001</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .footer-container {
    background-color: #3b495b;
  }
  
  .footer-container__top {
    padding: 36px 0 5px 60px;
  
    h3 a {
      font-size: 14px;
      color: #fff;
    }
    
    li {
      font-size: 12px;
      color: #87a2c9;
    }
    
    ul a {
      font-size: 12px;
      color: #87a2c9;
      
      &:hover {
        color: #fff;
      }
    }
    
    p {
      margin-top: 10px;
      font-size: 10px;
      color: #dfe8f0;
    }
  }
  
  .footer-container__info {
    padding: 10px 0;
    border-top: 1px solid #495a70;
    
    .text {
      font-size: 12px;
      color: #6882a1;
    }
  }
</style>

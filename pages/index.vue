<template>
  <div class="index-container">
    <!-- 轮播图 -->
    <el-carousel height="300px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    
    <div class="index-container__main">
      <!-- 平台介绍 -->
      <div class="platform-introduction">
        <div class="hth-container">
          <div class="announcement">
            <i class="ku-icon icon-bulletin"></i>
            <span class="title">最新公告</span>
            <a href="">
              <span>融资方还款情况报告【2018-1-22日】</span>
            </a>
            <a href="" style="margin-left: 50px;">
              <span>查看更多 <i class="ku-icon icon-right"></i></span>
            </a>
            <span class="float-right">市场有风险，投资需谨慎</span>
          </div>
          <br><br><br><br><br><br>
        </div>
      </div>
      {{ token }}
      <div class="hth-container">
        <div class="product">
          <!-- 标的 -->
          <product-card></product-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import ProductCard from '~/components/ProductCard.vue';
  
  export default {
    layout: 'full',
    components: {
      ProductCard
    },
    computed: {
      token() { return this.$store.state.user.token }
    },
    
  }
</script>

<style lang="scss">
  .index-container {
    .platform-introduction {
      width: 100%;
      height: 190px;
      background-color: #ffffff;
      box-shadow: 0 2px 4px 1px rgba(114, 155, 198, 0.14);
    }
    
    .index-container__main {
      width: 100%;
      background-color: #F7FAFE;
    }
    
    .announcement {
      height: 54px;
      border-bottom: 1px solid #efefef;
      line-height: 54px;
      
      .title {
        font-size: 16px;
        color: #394b67;
        margin-right: 6px;
      }
      
      .icon-bulletin {
        color: #4E92F4;
        font-size: 23px;
        margin-right: 10px;
      }
      
      span {
        font-size: 14px;
        color: #7c86a2;
      }
    }
    
    .product {
      margin: 30px 0;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    text-align: center;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

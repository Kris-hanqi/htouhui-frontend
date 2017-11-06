<template>
  <div class="coupon-wrapper">
    <div class="coupon-wrapper__top">
      <p>优惠券</p>
      <el-button type="text">优惠券使用说明</el-button>
      <el-button :plain="true" @click="showExchangeCoupon" type="info">兑换优惠券</el-button>
    </div>
    
    <!-- 兑换优惠券组件 -->
    <exchange-coupon :visible="exchangeCouponVisible"
                     @add-success="successExchangeCoupon"
                     @close="closeExchangeCoupon"></exchange-coupon>
    
    <div class="coupon-wrapper__body">
      <el-tabs v-model="listQuery.type" @tab-click="handleTabClick" type="card">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="现金券" name="cash"></el-tab-pane>
        <el-tab-pane label="加息券" name="plus_coupon"></el-tab-pane>
        <el-tab-pane label="礼金券" name="lijin"></el-tab-pane>
      </el-tabs>
      
      <div v-loading="listLoading" element-loading-text="拼命加载中">
        <div class="coupon-wrapper__menu">
          <a href="javascript:void(0)" @click="switchStatus('unused')" :class="{ active: listQuery.status === 'unused'}">未使用</a>
          <a href="javascript:void(0)" @click="switchStatus('used')" :class="{ active: listQuery.status === 'used'}">已使用</a>
          <a href="javascript:void(0)" @click="switchStatus('expire')" :class="{ active: listQuery.status === 'expire'}">已过期</a>
        </div>
  
        <!-- 无数据显示 -->
        <no-data v-if="!list"></no-data>
  
        <!-- 优惠券 -->
        <div class="coupon-wrapper__list">
          <div class="coupon-wrapper__box" v-for="coupon in list" :key="coupon.id">
            <!--未开户-->
            <!--<div class="coupon-wrapper__box-open-account">-->
            <!--<a href="#">立即开户激活</a>-->
            <!--</div>-->
            <div class="coupon-wrapper__box-top">
              <i class="icon-new" v-if="coupon.isNew === 1"></i>
              <p class="title">
                <span v-if="coupon.type === 'plus_coupon'"><span class="roboto-regular">{{ coupon.rate }}</span>%</span>
                <span v-else=""><span class="roboto-regular">{{ coupon.money }}</span>元</span>
              </p>
              <p class="detail">现金券<span>［满{{ coupon.lowerLimitMoney }}可用］</span></p>
              <p class="time">2017.07.01-2017.7.30</p>
            </div>
            <div class="coupon-wrapper__box-body">
              <div class="content" v-if="coupon.type === 'plus_coupon'">
                <p class="money">最高计息金额：<span class="roboto-regular">{{ coupon.maxInterestMoney }}</span>元</p>
                <p class="money">最高计息天数：<span class="roboto-regular">{{ coupon.interestDeadline }}</span>天</p>
                <p class="message" style="line-height: 1.67;">使用说明：{{ coupon.description }}</p>
              </div>
              <div class="content" v-else>
                <p class="money">计息金额：<span class="roboto-regular">{{ coupon.maxInterestMoney }}</span>元</p>
                <p class="message" style="line-height: 1.67;">使用说明：{{ coupon.description }}</p>
              </div>
              <a class="newUse" href="#">立即使用</a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 分页 -->
      <div class="pages" v-show="!listLoading">
        <p class="total-pages">共计<span class="roboto-regular">{{ total }}</span>条记录（共<span class="roboto-regular">{{ getPageSize }}</span>页）</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="listQuery.pageNo"
          :page-size="listQuery.pageSize"
          layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import NoData from '../components/NoData.vue';
  import ExchangeCoupon from './components/ExchangeCoupon.vue';
  import { fetchPageList } from 'api/home/coupon';
  
  export default {
    components: {
      ExchangeCoupon,
      NoData
    },
    data() {
      return {
        list: null,
        total: 0,
        listLoading: true,
        listQuery: {
          pageNo: 1,
          pageSize: 6,
          type: 'all',
          status: 'unused'
        },
        exchangeCouponVisible: false,
        exchangeCode: ''
      }
    },
    computed: {
      getPageSize() {
        return Math.ceil(this.total / this.listQuery.pageSize);
      }
    },
    methods: {
      // 切换优惠券列表
      getPageList() {
        this.listLoading = true;
        fetchPageList(this.listQuery).then(response => {
          const data = response.data;
          if (data.meta.code === 200) {
            this.list = data.data.data || null;
            this.total = data.data.count || 0;
          }
          this.listLoading = false
        })
      },
      // 切换优惠券类型
      handleTabClick(tab) {
        this.listQuery.type = tab.name;
        this.listQuery.status = 'unused';
        this.getPageList();
      },
      // 优惠券分页
      handleCurrentChange(val) {
        this.listQuery.pageNo = val;
        this.getPageList();
      },
      // 切换优惠券状态
      switchStatus(data) {
        this.listQuery.status = data;
        this.getPageList();
      },
      // 打开兑换优惠券modal
      showExchangeCoupon() {
        this.exchangeCouponVisible = true;
      },
      // 兑换成功事件
      successExchangeCoupon() {
        this.exchangeCouponVisible = false;
        this.getPageList();
      },
      // 关闭兑换优惠券modal
      closeExchangeCoupon() {
        this.exchangeCouponVisible = false;
      }
    },
    created() {
      this.getPageList();
    }
  }
</script>

<style lang="scss">
  .coupon-wrapper {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  
  .coupon-wrapper__top {
    width: 100%;
    height: 30px;
    margin-bottom: 15px;
    line-height: 30px;
    padding-left: 5px;
  
    p {
      display: inline-block;
      font-size: 20px;
      color: #274161;
    }
  
    .el-button--info {
      float: right;
      border-radius: 100px;
      margin-right: 10px;
    }
  
    .el-button--text {
      float: right;
    }
  }

  .coupon-wrapper__menu {
    padding-left: 30px;
    
    a {
      margin-right: 20px;
      color: #394b67;
    }
  
    a.active {
      height: 26px;
      padding: 4px 15px;
      line-height: 26px;
      color: #fff;
      border-radius: 100px;
      background-color: #0671f0;
    }
  }
  
  .coupon-wrapper__list {
    width: 100%;
    box-sizing: border-box;
    margin-top: 20px;
    padding-left: 30px;
  }

  .coupon-wrapper__box {
    display: inline-block;
    vertical-align: top;
    position: relative;
    width: 230px;
    height: 330px;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .coupon-wrapper__box-top {
    width: 230px;
    height: 133px;
    box-sizing: border-box;
    padding-top: 20px;
    background: url(../../../assets/images/home/quan-1.png) no-repeat center;
  
    .icon-new {
      display: block;
      position: absolute;
      top: 0;
      left: 12px;
      width: 19px;
      height: 39px;
      background: url(../../../assets/images/home/icons/icon-new.png) no-repeat center;
    }
  
    .title {
      text-align: center;
      font-size: 20px;
      color: #fff;
    
      span {
        font-size: 50px;
      }
    }
  
    .detail {
      font-size: 12px;
      text-align: center;
      color: #7d1010;
      margin-bottom: 20px;
    
      span {
        color: #fff;
      }
    }
  
    .time {
      font-size: 12px;
      text-align: center;
      color: #7d1010;
    }
  }

  .coupon-wrapper__box-body {
    width: 100%;
    height: 197px;
    box-sizing: border-box;
    padding: 20px 15px;
    background-color: #f9f9f9;
    
    .content {
      overflow: hidden;
      height: 120px;
    }
  
    p {
      margin-bottom: 10px;
      font-size: 12px;
      color: #727e90;
    }
  
    .newUse {
      display: block;
      width: 111px;
      height: 30px;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 100px;
      border: solid 1px #eb5145;
      line-height: 30px;
      font-size: 12px;
      text-align: center;
      color: #eb5145;
    }
  
    .pass {
      display: block;
      position: absolute;
      right: 20px;
      width: 63px;
      height: 64px;
    }
  }

  .coupon-wrapper__box-open-account {
    display: block;
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url(../../../assets/images/home/quan-3.png) no-repeat center;
  
    a {
      display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      width: 185px;
      height: 46px;
      box-sizing: border-box;
      margin: 0 auto;
      margin-left: -92px;
      margin-top: -23px;
      border-radius: 100px;
      border: solid 1px #fff;
      line-height: 46px;
      font-size: 18px;
      text-align: center;
      color: #fff;
    }
  }
</style>

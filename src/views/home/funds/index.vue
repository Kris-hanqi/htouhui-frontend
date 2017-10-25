<template>
  <div class="funds-wrapper">
    <div class="funds-wrapper__menus clearFix">
      <h1>资金流水</h1>
      <div class="fl">
        <ul class="nav">
          <li>选择时间：</li>
          <li><a href="javascript:void(0)" @click="switchDateType('3day')" :class="{ active: dateType === '3day'}">近三天</a></li>
          <li><a href="javascript:void(0)" @click="switchDateType('1months')" :class="{ active: dateType === '1months'}">近一个月</a></li>
          <li><a href="javascript:void(0)" @click="switchDateType('3months')" :class="{ active: dateType === '3months'}">近三个月</a></li>
          <li><a href="javascript:void(0)" @click="switchDateType('other')" :class="{ active: dateType === 'other'}">自定义时间</a></li>
        </ul>
        <ul class="nav allChooseCalendar">
        
        </ul>
        <ul class="nav">
          <li>项目类型：</li>
          <li><a href="javascript:void(0)" @click="switchProjectType('all')" :class="{ active: projectType === 'all'}">全部</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('plan')" :class="{ active: projectType === 'plan'}">投资</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('recharge')" :class="{ active: projectType === 'recharge'}">充值</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('withdraw')" :class="{ active: projectType === 'withdraw'}">提现</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('repayment')" :class="{ active: projectType === 'repayment'}">还款</a></li>
          <li><a href="javascript:void(0)" @click="switchProjectType('other')" :class="{ active: projectType === 'other'}">其他</a></li>
        </ul>
      </div>
      <div class="fr">
        <button class="query-btn">查询</button>
      </div>
    </div>
  
    <!-- table区域 -->
    <div class="table-container">
      <div class="funds-wrapper__menus assetRunWaterTable personalCenterBoxShadow">
        <el-table :data="list" style="width: 100%">
          <el-table-column prop="date" label="交易时间" width="180"></el-table-column>
          <el-table-column prop="name" label="项目名称" width="180"></el-table-column>
          <el-table-column prop="address" label="类型"></el-table-column>
          <el-table-column prop="address" label="变动金额"></el-table-column>
          <el-table-column prop="address" label="管理平台"></el-table-column>
          <el-table-column prop="address" label="备注"></el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="40">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: null,
        dateType: '3day',
        projectType: 'all',
        value6: '',
        value7: '',
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    },
    methods: {
      switchDateType(type) {
        this.dateType = type;
      },
      switchProjectType(type) {
        this.projectType = type;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="scss">
  .funds-wrapper {
    .personalCenterBoxShadow {
      box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);
    }

    h1 {
      font-size: 20px;
      color: #274161;
      margin-left: 27px;
      padding-top: 20px;
    }
    
    .table-container {
      margin-top: 20px;
    }
  }
  
  .funds-wrapper__menus {
    padding-bottom: 10px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(67, 135, 186, 0.14);

    ul.nav {
      margin: 15px 0 15px 57px;

      li {
        display: inline-block;
        font-size: 14px;
        margin: 0 8px;
        color: #394b67;

        a {
          display: inline-block;
          padding: 5px 10px;
          line-height: 1;
          font-size: 14px;
          color: #394b67;
        }

        a.active {
          border-radius: 100px;
          background-color: #0573f4;
          color: #fff;
        }
      }

      li:first-child,
      li:nth-child(2) {
        margin-left: 0;
      }
    }

    .query-btn {
      width: 157px;
      height: 46px;
      border-radius: 100px;
      background-color: #378ff6;
      font-size: 18px;
      text-align: center;
      color: #fff;
      margin-right: 64px;
      margin-top: 25px;
      cursor: pointer;
    }
  }
</style>

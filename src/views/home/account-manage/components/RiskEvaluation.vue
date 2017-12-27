<template>
  <div class="risk-assessment" v-loading="displayLoading">
    <hth-panel title="风险测评">
      <p class="risk-description">通过风险评测可了解您对投资风险的承受意愿，同时我们会根据您的承受意愿推荐符合您的投资产品。</p>
      <div class="split-line"></div>
      <!--问题-->
      <div class="question-box" v-for="(question, index) in questionnaireData.elements">
        <div class="question-title">{{index + 1}}、{{question.stem}}</div>
        <div class="row">
          <!--答案选项-->
          <div :class="{'col-md-5': question.orderType === 'vl'}">
            <div v-for="option in question.selections">
              <div class="radio q-spacing">
                <label>
                  <input type="radio" v-model="queryData['answerId' + index]" :value="option.id">
                  {{option.seq}}: {{option.description}}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <el-button class="submit-btn" :loading="submitLoading" @click="submitQuestionnaire">提 交</el-button>
      </div>
    </hth-panel>

    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="625px">
      <p style="text-align: center">
        <img :src="oTypeImg[userType]" alt="">
      </p>
      <p class="result-title-text">适合您的产品风险等级</p>
      <p style="font-size: 22px; color: #37455a; text-align: center; font-weight: 600">{{ typeList[userType].text }}</p>
      <p class="result-footer">
        <el-button type="primary" @click="handleClose" round>确 定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
  import img_v1 from 'assets/images/risk/v1.png';
  import img_v2 from 'assets/images/risk/v2.png';
  import img_v3 from 'assets/images/risk/v3.png';
  import img_v4 from 'assets/images/risk/v4.png';
  import HthPanel from 'common/Panel/index.vue';
  import { fetchGetQuestionnaire, fetchSubmitQuestionnaire } from 'api/home/account-set';

  export default {
    components: {
      HthPanel
    },
    data() {
      return {
        oTypeImg: {
          A1: img_v1,
          B1: img_v2,
          C1: img_v3,
          D1: img_v4
        },
        userType: 'A1',  // 用户的风险测评类型
        queryData: {
          warehouseId: null
        },
        typeList: {
          A1: {
            text: '低风险'
          },
          B1: {
            text: '低风险、中等风险'
          },
          C1: {
            text: '低风险、中等风险、中高风险'
          },
          D1: {
            text: '低风险、中等风险、中高风险、高风险'
          }
        },
        dialogVisible: false,
        displayLoading: true,
        submitLoading: false,
        questionnaireData: {}
      }
    },
    methods: {
      getQuestionnaire() {
        fetchGetQuestionnaire().then(response => {
          if (response.data.meta.code === 200) {
            this.queryData.warehouseId = response.data.data.id;
            this.questionnaireData = response.data.data;     // 题目列表数据
            this.displayLoading = false;
          }
        })
      },
      submitQuestionnaire() {
        const keys = Object.keys(this.queryData);
        if (keys.length < 11) {
          this.$message({
            message: '尚有评测项未选择！',
            type: 'warning'
          });
          return;
        }
        this.submitLoading = true;
        fetchSubmitQuestionnaire(this.queryData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.userType = response.data.data.type;
              this.$store.commit('SET_IS_JOIN_RISK_ASSESSMENT', this.userType);
              this.dialogVisible = true;
            }
            this.submitLoading = false;
          })
      },
      handleClose() {
        this.$router.go(-1);
      }
    },
    created() {
      this.getQuestionnaire();
    }
  }
</script>

<style lang="scss">
  .risk-assessment {
    width: 832px;
    height: 797px;
    color: #35385a;
    font-size: 16px;

    .footer {
      text-align: center;
    }

    .submit-btn {
      width: 240px;
      margin-bottom: 60px;
      padding: 12px 23px;
      border-radius: 20px;
      color: #fff;
      background: #409eff;
    }

    .submit-btn:hover {
      background: #66b1ff;
    }

    .risk-description {
      text-indent: 2em;
    }

    .question-box {
      margin-bottom: 25px;
      text-indent: 2em;
    }

    .q-spacing {
      margin: 10px 0 0;
      text-indent: 2em;
    }

    .result-title-text {
      margin: 13px 0 10px;
      font-size: 16px;
      color: #7c86a2;
      text-align: center;
    }

    .result-footer {
      margin-top: 30px;
      text-align: center;

      .el-button--primary {
        width: 187px;
        font-size: 18px;
      }
    }

    .el-dialog__title {
      display: none;
    }
  }
</style>

<template>
  <div class="risk-evaluation-password-wrapper">
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

      <p class="conclusion">评测完成，感谢您的参与！</p>

      <div class="footer">
        <button class="submit-btn" @click="submitQuestionnaire();">提 交</button>
      </div>
    </hth-panel>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <img src="" alt="">
      <span class="conclusion">恭喜您完成测评</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" round>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import HthPanel from 'common/Panel/index.vue';
  import { fetchGetQuestionnaire, fetchSubmitQuestionnaire } from 'api/home/account-set';

  export default {
    components: {
      HthPanel
    },
    data() {
      return {
        queryData: {
          warehouseId: null
        },
        dialogVisible: false,
        questionnaireData: {}
      }
    },
    methods: {
      getQuestionnaire() {
        fetchGetQuestionnaire()
          .then(res => {
            console.dir(res);
            if (res.data.meta.code === 200) {
              this.queryData.warehouseId = res.data.data.id;
              this.questionnaireData = res.data.data;
              console.dir(res.data);
            } else {
              console.error(res.meta.code + ':' + res.meta.message);
            }
          })
      },
      submitQuestionnaire() {
        const vm = this;
        console.dir(vm.queryData);
        fetchSubmitQuestionnaire(this.queryData)
          .then(res => {
            if (res.status === 200) {
              return res.data;
            } else {
              console.error('接口调用不成功');
            }
          })
          .then(data => {
            if (data.meta.code === 200) {
              console.log('先别管别的，反正是调用成功了');
              this.dialogVisible = true;
            } else {
              console.error(data.meta.code + ':' + data.meta.message)
            }
          })
      }
    },
    created() {
      this.getQuestionnaire();
    }
  }
</script>

<style lang="scss">
  .risk-evaluation-password-wrapper {
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
      color: #66b1ff;
    }
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

  .conclusion {
    display: block;
    margin: 36px 0 34px;
    text-align: center;
    font-size: 20px;
    color: #7c86a2;
  }
</style>

<template>
  <div class="update-login-password-wrapper">
    <hth-panel title="修改登录密码">
      <el-form style="width: 370px;"
               :model="passwordData"
               :rules="rules" label-width="80px">
        <el-form-item label="用户名">
          <span>{{ username || '无' }}</span>
        </el-form-item>
        <el-form-item label="原密码" prop="oldPassword">
          <el-input type="password" v-model="passwordData.oldPassword" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="passwordData.newPassword" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input type="password" v-model="passwordData.confirmPassword" placeholder="请重新输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="UpdatePassword" style="width: 200px" round>提交</el-button>
        </el-form-item>
      </el-form>
      <div class="split-line"></div>
      <div class="hth-tips">
        <h3>温馨提示</h3>
        <p>请定期更换密码，并确保登录密码的设置与交易密码不同。</p>
      </div>
    </hth-panel>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HthPanel from 'common/Panel/index.vue';
  import { validatePassword } from 'utils/validate';
  import { fetchUpdatePassword } from 'api/public';
  
  export default {
    computed: {
      ...mapGetters([
        'username'
      ])
    },
    components: {
      HthPanel
    },
    data() {
      const validatePW = (rule, value, callback) => {
        if (!validatePassword(value)) {
          callback(new Error('密码为6-16为数字与字母组合'))
        } else {
          callback()
        }
      };
      const validateConfirmPassword = (rule, value, callback) => {
        if (this.newPassword !== this.confirmPassword) {
          callback(new Error('两次输入不一致'))
        } else {
          callback()
        }
      };
      return {
        passwordData: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, trigger: 'blur', validator: validatePW }
          ],
          confirmPassword: [
            { required: true, trigger: 'blur', validator: validateConfirmPassword }
          ]
        }
      }
    },
    methods: {
      UpdatePassword() {
        fetchUpdatePassword(this.passwordData)
          .then(response => {
            if (response.data.meta.code === 200) {
              this.$router.push('/accountManage/set/index');
              this.$message({
                message: '登录密码修改成功,请牢记你的登录密码!',
                type: 'success'
              });
            }
          })
      }
    }
  }
</script>

<style lang="scss">
  .update-login-password-wrapper {
    width: 832px;
    height: 797px;
  }
</style>

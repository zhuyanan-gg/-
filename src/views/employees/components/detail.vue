<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">

            <!-- 放置表单 -->
            <el-form ref="formDateRef" label-width="110px" :model="formDate" :rules="formDataRules">
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="formDate.username" />
              </el-form-item>
              <el-form-item label="密码:" prop="psd">
                <el-input v-model="formDate.psd" type="password" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="savaUserInfo">更新信息</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <component :is="UserInfo" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <component :is="JobInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/employees'
import UserInfo from './userinfo.vue'
import JobInfo from './job-info.vue'

export default {
  name: 'EmployeeDetail',
  props: {
    userId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      UserInfo,
      JobInfo,
      formDate: {},
      formDataRules: {
        username: [
          {
            required: true, message: '姓名不能为空', trigger: 'blur'
          },
          {
            min: 2, max: 10, message: '姓名应该是2-10个字符之间', trigger: 'blur'
          }
        ],
        psd: [
          {
            required: true, message: '密码不能为空', trigger: 'blur'
          },
          {
            min: 5, max: 15, message: '密码应该为5-15位之间', trigger: 'blur'
          }

        ]
      }
    }
  },
  mounted() {
    this.loadDetail()
  },
  methods: {
    async loadDetail() {
      this.formDate = await getUserDetailById(this.userId)
    },
    async savaUserInfo() {
      try {
        this.$refs.formDateRef.validate()
        // this.formDate.password = this.formDate.psd
        await saveUserDetailById({ ...this.formDate, password: this.formDate.psd })
        console.log(this.formDate)
        this.$message.success('修改员工信息成功')
      } catch (error) {
        this.$message.info('校验未通过')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-input {
    width: 300px;
}
.el-form {
    margin-top: 50px;
}
.el-button {
    margin-left: 230px;
}
</style>

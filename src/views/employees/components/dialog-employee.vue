<template>
  <el-dialog title="新增员工" :visible="showDialog" :before-close="onClose" width="35%">
    <!-- 表单 -->
    <el-form ref="employeeFormRef" label-width="120px" :rules="rules" :model="formDate">

      <el-form-item label="姓名" prop="username">
        <el-input v-model="formDate.username" placeholder="请输入姓名" />
      </el-form-item>

      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formDate.mobile" placeholder="请输入手机号" />
      </el-form-item>

      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formDate.timeOfEntry" placeholder="请选择入职时间" />
      </el-form-item>

      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formDate.formOfEmployment" placeholder="请选择聘用形式">
          <el-option v-for="hire in hireType" :key="hire.id" :label="hire.value" :value="hire.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formDate.workNumber" placeholder="请输入工号" />
      </el-form-item>

      <!-- ###### -->
      <!-- 部门 -->
      <el-form-item label="部门" prop="departmentName">
        <el-cascader
          v-model="deptName"
          placeholder="请选择部门"
          :options="depts"
          :props="{ label: 'name' , value:'name' , checkStrictly: true }"
          @change="handleChange"
        />
      </el-form-item>

      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formDate.correctionTime" placeholder="请选择转正时间" />
      </el-form-item>

    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="right">
        <el-col :span="24">
          <el-button size="small" @click="onClose">取消</el-button>
          <el-button type="primary" size="small" @click="confirm">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import HireType from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { list2tree } from '@/utils/index'
import { addEmployee } from '@/api/employees'

export default {
  name: 'EmployeeDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      depts: [],
      deptName: [],
      hireType: HireType.hireType,
      formDate: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          {
            required: true, message: '用户姓名不能为空', trigger: 'blur'
          },
          {
            min: 2, max: 4, message: '用户姓名为2-4位', trigger: 'blur'
          }],
        mobile: [
          {
            required: true, message: '手机号不能为空', trigger: 'blur'
          },
          {
            pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
          }],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ],
        correctionTime: [
          { required: true, message: '转正时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.loadDepart()
  },
  methods: {
    onClose() {
      // this.formDate = {
      //   username: '',
      //   mobile: '',
      //   formOfEmployment: '',
      //   workNumber: '',
      //   departmentName: '',
      //   timeOfEntry: '',
      //   correctionTime: ''
      // }
      this.deptName = []
      this.$refs.employeeFormRef.resetFields()
      this.$emit('update:show-dialog', false)
    },
    async loadDepart() {
      const res = await getDepartments()
      this.depts = list2tree(res.depts, '')
    },
    handleChange(value) {
      this.formDate.departmentName = value[value.length - 1]
    },
    async confirm() {
      try {
        this.$refs.employeeFormRef.validate()
        await addEmployee(this.formDate)
        this.$message.success('添加员工成功')
        this.onClose()
        this.$emit('update-list')
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.el-cascader,
.el-input,
.el-select {
  width: 80%;
}
</style>

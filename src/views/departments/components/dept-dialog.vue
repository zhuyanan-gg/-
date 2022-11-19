<template>
  <el-dialog
    :title="title"
    :visible="isShow"
    width="35%"
    :before-close="onClose"
  >
    <el-form ref="deptFormRef" :model="deptForm" label-width="90px" :rules="deptRules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="deptForm.name" placeholder="请选择部门名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="deptForm.code" placeholder="请选择部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="deptForm.manager" placeholder="请选择部门负责人" @focus="onFocus">
          <el-option v-for="item in simpleList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="deptForm.introduce" type="textarea" placeholder="请选择部门介绍" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" @click="onClose">取 消</el-button>
      <el-button type="primary" size="small" @click="onConfirm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getEmployeeSimple, getDepartments, addDepartment, getDepartDetail, editDepartments } from '@/api/departments.js'
export default {
  props: {
    isShow: Boolean,
    deptId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    const checkDeptName = async(rule, value, cb) => {
      const { depts } = await getDepartments()
      let result
      if (this.deptForm.id) {
        result = depts.filter(item => item.pid === this.deptForm.pid && this.deptForm.id !== item.id).some(item => item.name === value)
      } else {
        result = depts.filter(item => item.pid === this.deptId).some(item => item.name === value)
      }
      result ? cb(new Error(`同级部门下已经存在了${value}`)) : cb()
    }
    const checkDeptCode = async(rule, value, cb) => {
      const { depts } = await getDepartments()
      let result
      if (this.deptForm.id) {
        result = depts.filter(item => item.id !== this.deptForm.id).some(item => item.code === value)
      } else {
        result = depts.some(item => item.code === value)
      }
      result ? cb(new Error(`公司下已经存在了${value}编码了`)) : cb()
    }
    return {
      deptForm: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      },
      deptRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '部门名称要求3-6个字符', trigger: 'blur' },
          { validator: checkDeptName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkDeptCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }
        ]
      },
      simpleList: []
    }
  },
  computed: {
    title() {
      return this.deptForm.id ? '编辑子部门' : '添加子部门'
    }
  },
  methods: {
    async onFocus() {
      this.simpleList = await getEmployeeSimple()
      // console.log(this.simpleList)
    },
    async onConfirm() {
      await this.$refs.deptFormRef.validate()
      try {
        if (this.deptForm.id) {
        // 修改部门
        // 验证规则
          await editDepartments(this.deptForm)
          this.$message.success('部门编辑成功')
        } else {
          // 添加部门
          // 给deptForm里面的pid赋值再发送请求
          this.deptForm.pid = this.deptId
          // 发送请求
          await addDepartment(this.deptForm)
          // 弹窗
          this.$message.success('部门新增成功')
        }
        // 收起对话框
        this.onClose()
        // 重新刷新列表
        this.$emit('updateList')
      } catch (error) {
        console.log('验证不通过')
      }
    },
    onClose() {
      this.deptForm = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      }
      this.$refs.deptFormRef.resetFields()
      this.$emit('update:isShow', false)
    },
    async getDetail(id) {
      this.deptForm = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>

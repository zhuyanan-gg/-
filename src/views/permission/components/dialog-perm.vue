<template>
  <!-- 放置一个弹层 用来编辑新增节点 -->
  <el-dialog :title="title" :visible="isShow" @close="onClose">
    <!-- 表单 -->
    <el-form ref="permissionRef" :model="formData" label-width="120px" :rules="rules">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="开启">
        <el-switch
          v-model="formData.enVisible"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button size="small" type="primary" @click="onConfirm">确定</el-button>
        <el-button size="small" @click="onClose">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addPermission, updatePermission, getPermissionDetail } from '@/api/permission'

export default {
  name: 'DialogPermission',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      formData: {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        pid: '',
        type: ''
      },
      rules: {
        name: [
          {
            required: true, message: '请输入权限名称', trigger: 'blur'
          }
        ],
        code: [
          {
            required: true, message: '请输入权限标识', trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑权限' : '增加权限'
    }
  },
  methods: {
    // 点击取消或者x掉
    onClose() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        enVisible: '',
        pid: '',
        type: ''
      }
      this.$refs.permissionRef.resetFields()
      this.$emit('update:isShow', false)
    },
    // 点击确定
    async onConfirm() {
      try {
        await this.$refs.permissionRef.validate()
        if (this.formData.id) {
          // 编辑
          await updatePermission(this.formData)
          this.$message.success('编辑成功')
        } else {
          // 添加
          this.formData.pid = this.userId
          this.formData.type = this.type
          await addPermission(this.formData)
          this.$message.success('添加成功')
        }
        this.$emit('update-list')
        this.onClose()
      } catch (error) {
        this.$message.warning('校验未通过')
      }
    },
    // 点击编辑回显
    async getDetail(id) {
      this.formData = await getPermissionDetail(id)
    }
  }

}
</script>

<style>

</style>

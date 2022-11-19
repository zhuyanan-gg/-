<template>
  <el-dialog
    :title="getTitle()"
    width="50%"
    :visible="isVisible"
    :before-close="onClose"
  >
    <el-form ref="roleFormRef" label-width="80px" :model="roleForm" :rules="roleFormRules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" style="width: 90%;" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.description" style="width: 90%;" />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-row class="flexrigth">
        <el-button type="info" size="small" @click="onClose">取 消</el-button>
        <el-button type="primary" size="small" @click="onConfirm">确 定</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { addRole, getRoleDetail, editRole } from '@/api/setting'
export default {
  name: 'RoleDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleForm: {
        name: '',
        description: ''
      },
      roleFormRules: {
        name: [
          {
            required: true, message: '角色名称不能为空', trigger: 'blur'
          },
          {
            min: 2, max: 10, message: '角色名称应该在2-10个字符之间', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async onConfirm() {
      try {
        await this.$refs.roleFormRef.validate()
        if (this.roleForm.id) {
          await editRole(this.roleForm)
        } else {
          await addRole(this.roleForm)
        }
        this.$message.success(`${this.roleForm.id ? '编辑' : '添加'}角色成功`)
        this.onClose()
        this.$emit('update-list')
      } catch (error) {
        console.log('校验未通过')
      }
    },
    async getDetail(id) {
      this.roleForm = await getRoleDetail(id)
    },
    onClose() {
      this.roleForm = {
        name: '',
        description: ''
      }
      this.$emit('update:is-visible', false)
      this.$refs.roleFormRef.resetFields()
    },
    getTitle() {
      return this.roleForm.id ? '编辑' : '添加'
    }
  }
}
</script>

<style lang="scss" scoped>
  .flexrigth {
    text-align: right;
 }
</style>

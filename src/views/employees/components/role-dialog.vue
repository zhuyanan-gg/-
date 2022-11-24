<template>
  <el-dialog title="分配角色" :visible="isShow" @close="onClose">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group v-model="roleId" v-loading="isLoading">
      <!-- 选项 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="confirm">确定</el-button>
        <el-button size="small" type="info" @click="onClose">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { assignRoles } from '@/api/employees'
import { getUserDetailById } from '@/api/user'

export default {
  name: 'RoleDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      checkList: [],
      list: [],
      roleId: [],
      isLoading: true
    }
  },
  methods: {
    onClose() {
      this.roleId = []
      this.$emit('update:isShow', false)
    },
    // 获取全部角色
    async getRoleListRender() {
      this.isLoading = false
      const { rows } = await getRoleList()
      this.list = rows
    },
    // 获取用户的拥有的角色
    async getRoleListRef(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleId = roleIds || []
    },
    // 给员工分配角色
    async confirm() {
      try {
        await assignRoles({ id: this.userId, roleIds: this.roleId })
        this.$message.success('修改角色成功')
        this.onClose()
      } catch (error) {
        this.$message.error('修改角色失败')
      }
    }
  }
}
</script>

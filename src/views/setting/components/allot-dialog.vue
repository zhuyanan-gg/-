<template>
  <el-dialog title="分配权限" :visible="isShow" @close="onClose">
    <!-- 权限是一颗树 -->
    <!-- 将数据绑定到组件上 -->
    <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
    <!-- id作为唯一标识 -->
    <el-tree
      ref="treeRef"
      :data="permList"
      :props="defaultProps"
      show-checkbox
      default-expand-all
      node-key="id"
      :check-strictly="true"
    />
    <!-- 确定 取消 -->
    <template #footer>
      <el-row type="flex" justify="center">
        <el-button type="primary" size="small" @click="onConfirm">确定</el-button>
        <el-button type="info" size="small" @click="onClose">取消</el-button>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { list2tree } from '@/utils/index'
import { getRoleDetail, assignPerm } from '@/api/setting'

export default {
  name: 'AllotDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permList: [],
      roleId: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.loadPermList()
  },
  methods: {
    // 关闭弹窗
    onClose() {
      this.roleId = ''
      this.$emit('update:isShow', false)
    },
    // 渲染页面的树形结构
    async loadPermList() {
      const res = await getPermissionList()
      this.permList = list2tree(res, '0')
    },
    // 回显的数据
    async getRoleDetails(id) {
      this.roleId = id
      const { permIds } = await getRoleDetail(id)
      this.$refs.treeRef.setCheckedKeys(permIds)
    },
    // 点击确定提交分配的权限
    async onConfirm() {
      const data = {
        id: this.roleId,
        permIds: this.$refs.treeRef.getCheckedKeys()
      }
      try {
        await assignPerm(data)
        this.$message.success('分配权限成功')
        this.onClose()
      } catch (error) {
        this.$message.error('分配权限失败')
      }
    }
  }
}
</script>

<style>

</style>

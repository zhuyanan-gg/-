<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 靠右的按钮 -->
        <el-row type="flex" justify="end">
          <el-button size="small" type="primary">添加权限</el-button>
        </el-row>
      </el-card>
      <el-divider />
      <!-- 表格 -->
      <el-card>
        <!-- row-key="id"表示每一行都是唯一的 -->
        <el-table stripe border :data="permissionList" row-key="id" default-expand-all>
          <el-table-column label="名称" prop="name" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作" width="280">
            <el-button size="small" type="primary" icon="el-icon-plus">添加</el-button>
            <el-button size="small" type="success" icon="el-icon-edit">编辑</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete">删除</el-button>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permission'
import { list2tree } from '@/utils'

export default {
  name: 'Permission',
  data() {
    return {
      permissionList: []
    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    async loadList() {
      const list = await getPermissionList()
      this.permissionList = list2tree(list, '0')
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

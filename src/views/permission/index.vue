<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 靠右的按钮 -->
        <el-row type="flex" justify="end">
          <el-button type="primary" @click="onAdd('0',1)">添加权限</el-button>
        </el-row>
      </el-card>

      <!-- 表格 -->
      <el-card class="box-top">
        <!-- row-key="id"表示每一行都是唯一的 -->
        <el-table stripe border :data="permissionList" row-key="id" default-expand-all>
          <el-table-column label="名称" prop="name" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作" width="280">
            <template v-slot="{row}">
              <el-button v-if="row.type === 1" size="small" type="primary" icon="el-icon-plus" @click="onAdd(row.id,2)">添加</el-button>
              <el-button size="small" type="success" icon="el-icon-edit" @click="onEdit(row.id)">编辑</el-button>
              <el-button size="small" type="danger" icon="el-icon-delete" @click="onDel(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 权限组件弹窗 -->
      <DialogPermission ref="PermDialogRef" :is-show.sync="isShow" :user-id="userId" :type="type" @update-list="updateList" />

    </div>
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permission'
import { list2tree } from '@/utils'
import DialogPermission from './components/dialog-perm.vue'

export default {
  name: 'Permission',
  components: {
    DialogPermission
  },
  data() {
    return {
      permissionList: [],
      isShow: false,
      userId: '',
      type: 0
    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    async loadList() {
      const list = await getPermissionList()
      this.permissionList = list2tree(list, '0')
    },
    updateList() {
      this.loadList()
      this.type = 0
      this.userId = ''
    },
    onAdd(id, num) {
      this.isShow = true
      this.userId = id
      this.type = num
    },
    onEdit(id) {
      this.$refs.PermDialogRef.getDetail(id)
      this.isShow = true
    },
    async onDel(id) {
      try {
        await this.$confirm('确定要删除该权限吗')
        await delPermission(id)
        this.$message.success('删除成功')
        this.loadList()
      } catch (error) {
        console.log('删除失败')
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.box-top {
  margin-top: 20px;
}
</style>

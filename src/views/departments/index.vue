<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="depts-container">

        <TreeTools
          :tree-node="{
            name: 'xx集团',
            manager: '负责人'
          }"
          @add-depart="onAddDepar"
        />
        <hr>
        <!-- default-expand-all 是否默认展开所有节点 -->
        <el-tree
          v-loading="isLoading"
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
          node-key="id"
        >
          <template v-slot="{ data }">
            <TreeTools
              :tree-node="data"
              :is-root="true"
              @add-depart="onAddDepar"
              @edit-depart="onEditDepart"
              @delete-depart="onDelDepar"
            />
          </template>
        </el-tree>

      </el-card>
      <!-- 弹窗 -->
      <DeptDialog ref="depDailogRef" :is-show.sync="isShow" :dept-id="deptId" @updateList="updateList" />
    </div>
  </div>
</template>

<script>
import { getDepartments, delDepartments } from '@/api/departments'
import TreeTools from '@/components/TreeTools'
import { list2tree } from '@/utils'
import DeptDialog from './components/dept-dialog.vue'
export default {
  name: 'Department',
  components: {
    TreeTools,
    DeptDialog
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      isShow: false,
      deptId: '',
      isLoading: true
    }
  },
  mounted() {
    this.getDepart()
  },
  methods: {
    async getDepart() {
      this.isLoading = true
      const res = await getDepartments()
      this.departs = list2tree(res.depts, '')
      this.isLoading = false
    },
    onAddDepar(departId) {
      this.isShow = true
      this.deptId = departId
    },
    async onEditDepart(departId) {
      await this.$refs.depDailogRef.getDetail(departId)
      this.isShow = true
    },
    async onDelDepar(departId) {
      try {
        const result = await this.$confirm('您确定要删除此部门吗')
        if (result === 'confirm') {
          await delDepartments(departId)
          this.getDepart()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      } catch (error) {
        console.log('出错了')
      }
    },
    updateList() {
      this.getDepart()
    }
  }
}
</script>

<style lang="scss" scoped>
  .depts-container {
   padding: 30px 100px;
  }
</style>

<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="depts-container">

        <TreeTools :tree-node="{name:'xx科技',manager:'负责人'}" />
        <hr>
        <!-- default-expand-all 是否默认展开所有节点 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          default-expand-all="true"
          node-key="id"
        >
          <template v-slot="{ data }">
            <TreeTools :tree-node="data" :is-root="true" />
          </template>
        </el-tree>

      </el-card>
    </div>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import TreeTools from '@/components/TreeTools'
import { list2tree } from '@/utils'
export default {
  name: 'Department',
  components: {
    TreeTools
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  mounted() {
    this.getDepart()
  },
  methods: {
    async getDepart() {
      const res = await getDepartments()
      this.departs = list2tree(res.depts, '')
    }
  }
}
</script>

<style lang="scss" scoped>

  .depts-container {
   padding: 30px 100px;
  }

</style>

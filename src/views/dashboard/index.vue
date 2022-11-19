<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <PageTools is-show-left>
        <template #left> 显示100条数据 </template>
        <template #right>
          <el-button type="primary" size="samll">按钮</el-button>
        </template>
      </PageTools>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import PageTools from '@/components/PageTools/index.vue'
export default {
  name: 'Dashboard',
  // components: {
  //   PageTools
  // },
  computed: {
    ...mapGetters([
      'username'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

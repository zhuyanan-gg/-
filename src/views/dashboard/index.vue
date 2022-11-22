<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card>
        <ImageUpload />
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>

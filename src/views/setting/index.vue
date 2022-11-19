<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <!-- ######角色管理 -->
          <el-tab-pane label="角色管理" name="role">
            <el-row>
              <el-button
                size="small"
                type="primary"
                icon="el-icon-plus"
                @click="isVisible = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data="roleList" border stripe>
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="200" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template v-slot="{ row }">
                  <el-button size="small" type="success" icon="el-icon-setting">分配权限</el-button>
                  <el-button size="small" type="primary" icon="el-icon-edit" @click="onEditRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" icon="el-icon-delete" @click="onDelRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
              :current-page="pageInfo.page"
              :page-sizes="[ 2 , 5 , 10 , 20]"
              :page-size="pageInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </el-tab-pane>
          <!--######公司信息  -->
          <el-tab-pane label="公司信息" name="company">
            <!-- 警告 -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px">
              <el-form-item label="公司名称：">
                <el-input v-model="createCompany" disabled />
              </el-form-item>
              <el-form-item label="公司地址：">
                <el-input v-model="companyInfo.companyAddress" disabled />
              </el-form-item>
              <el-form-item label="公司邮箱：">
                <el-input v-model="companyInfo.mailbox" disabled />
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="createCompanydes" type="textarea" disabled class="remark" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
      <RoleDialog ref="roleDialogRef" :is-visible.sync="isVisible" @update-list="loadList" />
    </div>
  </div>
</template>

<script>
import RoleDialog from '@/views/setting/components/role-dialog.vue'
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'SettingPage',
  components: {
    RoleDialog
  },
  data() {
    return {
      createCompany: 'xx公司',
      createCompanydes: '月薪过万,就来xx公司',
      dialogVisible: false,
      activeName: 'role',
      pageInfo: {
        page: 1,
        pagesize: 2
      },
      total: 0,
      roleList: [],
      companyInfo: {},
      isVisible: false
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.loadList()
  },
  methods: {
    async loadList() {
      const { rows, total } = await getRoleList(this.pageInfo)
      this.roleList = rows
      this.total = total
      // console.log(this.roleList)
    },
    handleSizeChange(newSize) {
      this.pageInfo.pagesize = newSize
      this.loadList()
    },
    handleCurrentChange(newPage) {
      this.pageInfo.page = newPage
      this.loadList()
    },
    handleClick() {
      if (this.activeName === 'company') {
        if (!Object.keys(this.companyInfo).length) {
          this.loadCompanyInfo()
        }
      }
    },
    async loadCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
    },
    async onDelRole(id) {
      try {
        await this.$confirm('您确认要删除该角色吗')
        await deleteRole(id)
        this.$message.success('删除成功')
        if (this.roleList.length === 1) {
          this.pageInfo.page = this.pageInfo.page > 1 ? this.pageInfo.page - 1 : 1
        }
        this.loadList()
      } catch (error) {
        this.$message.info('您取消了删除')
      }
    },
    async onEditRole(id) {
      this.$refs.roleDialogRef.getDetail(id)
      this.isVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.el-row {
  margin-top: 5px;
  margin-left: 5px;
  height: 60px;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-card {
  .el-form {
    margin-top: 50px;
    .el-input, .remark {
    width: 500px;
  }
}
}
.dialog-footer {
  text-align: right;
}
</style>

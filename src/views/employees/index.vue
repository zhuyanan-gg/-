<template>
  <div class="dashboard-container">
    <div class="app-container">

      <!-- 头部区域 -->
      <PageTools is-show-left>
        <template #left> 显示{{ total }}条数据 </template>
        <template #right>
          <el-button type="danger" size="samll" @click="export2excel">excel导出</el-button>
          <el-button type="success" size="samll" @click="$router.push('./import')">excel导入</el-button>
          <el-button type="primary" size="samll" @click="showDialog = true">新增员工</el-button>
        </template>
      </PageTools>

      <!-- 表格区域 -->
      <el-card v-loading="loading" class="box-card">
        <el-table border stripe :data="list">
          <el-table-column label="序号" type="index" width="60" />
          <el-table-column label="姓名" prop="username" />

          <!-- 格式化头像 -->
          <el-table-column label="头像" prop="staffPhoto" width="110">
            <template v-slot="{ row }">
              <img
                v-imgerror="defaultImg"
                :src="row.staffPhoto"
                class="satff-img"
                @click="showQr(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="手机号" prop="mobile" width="120" />
          <el-table-column label="工号" prop="workNumber" />

          <!-- 格式化聘用形式 -->
          <el-table-column label="聘用形式" :formatter="formatEmployee" prop="formOfEmployment" />
          <!-- <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{ row }">
              {{ row.formOfEmployment | formatterHire }}
            </template>
          </el-table-column> -->
          <el-table-column label="部门" prop="departmentName" />

          <!-- 格式化时间 -->
          <el-table-column label="入职时间" prop="timeOfEntry">
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" prop="enableState">
            <template v-slot="{ row }">
              <el-switch active-color="#13ce66" :value="row.enableState == 1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template v-slot="{ row }">
              <el-button type="text" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text">角色</el-button>
              <el-button type="text" @click="onDeleteEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          :current-page="pageInfo.page"
          :page-sizes="[ 2 , 5 , 10 , 20]"
          :page-size="pageInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-card>

      <el-dialog
        title="二维码"
        width="30%"
        :visible="isShowQr"
        @close="onCloseQr"
      >
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>

      <!-- 对话框 -->
      <AddDemployee :show-dialog.sync="showDialog" @update-list="loadList()" /></div>
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import employee from '@/api/constant/employees'
import defaultImg from '@/assets/common/1.png'
import AddDemployee from '@/views/employees/components/dialog-employee.vue'
import QrCode from 'qrcode'

export default {
  name: 'Employees',
  components: {
    AddDemployee
  },
  data() {
    return {
      isShowQr: false,
      pageInfo: {
        page: 1,
        size: 10
      },
      total: 200,
      list: [],
      loading: true,
      hireType: employee.hireType,
      showDialog: false,
      defaultImg
    }
  },
  mounted() {
    this.loadList()
  },
  methods: {
    async loadList() {
      this.loading = true
      const { rows, total } = await getEmployeeList(this.pageInfo)
      rows.forEach(item => {
        item.enableState = 1
      })
      this.list = rows
      this.total = total
      this.loading = false
    },
    handleSizeChange(newSize) {
      this.pageInfo.size = newSize
      this.loadList()
    },
    handleCurrentChange(newPage) {
      this.pageInfo.page = newPage
      this.loadList()
    },
    formatEmployee(row, column, cellValue, index) {
      const hire = this.hireType.find(item => item.id === +cellValue)
      return hire ? hire['value'] : '未知'
    },
    async onDeleteEmployee(id) {
      try {
        await this.$confirm('您确认删除吗')
        await delEmployee(id)
        this.$message.success('删除成功')
        if (this.list.length === 1) {
          this.pageInfo.page = this.pageInfo.page > 1 ? this.pageInfo.page - 1 : 1
        }
        this.loadList()
      } catch (error) {
        this.$message.info('您取消了删除')
      }
    },
    // 导出excel文档
    export2excel() {
      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      // console.log(Object.keys(headers))
      import('@/vendor/Export2Excel').then(async excel => {
        const { rows } = await getEmployeeList({ page: 1, size: this.total })
        const data = this.formatData(rows, headers)
        // console.log(data)
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: data, // 具体数据 必填
          filename: '', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填1
        })
      })
    },
    formatData(list, header) {
      return list.map(item => {
        return Object.values(header).map(key => {
          if (key === 'timeOfEntry' || key === 'correctionTime') {
            return this.formatDate(item[key]) // 返回格式化之前的时间
          } else if (key === 'formOfEmployment') {
            const person = this.hireType.find(x => x.id === +item[key])
            return person ? person.value : '未知'
          } else {
            return item[key]
          }
        })
      })
    },
    formatDate(numb) {
      const time = new Date(numb)
      const year = time.getFullYear()
      const month = (time.getMonth() + 1 + '').padStart(2, 0)
      const date = (time.getDate() + '').padStart(2, 0)
      return year + '-' + month + '-' + date
    },
    showQr(url) {
      // url存在的情况下 才弹出层
      if (url) {
        this.isShowQr = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('这是默认头像，请更新头像查看二维码')
      }
    },
    onCloseQr() {
      this.isShowQr = false
    }

  }
}
</script>

<style scoped lang="scss">
.box-card {
  margin-top: 20px;
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .satff-img {
    width: 80px;
    height: 80px;
  }
  .el-table-column {
    text-align: center;
  }
  img {
    border-radius: 50%;
  }
}
</style>

<template>
  <div class="mode">
    <div class="table-container">
      <default-mode :default-mode.sync="defaultMode"></default-mode>
      <company :company-data.sync="companyData" class="mt-20"></company>
      <group :group-data.sync="groupData"></group>
      <user :user-data.sync="userData"></user>
    </div>
    <div class="footer">
      <el-button type="primary" size="small" @click="saveModeRules">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { getMode, saveModeRules } from '@/api/mode.js'
  import defaultMode from './components/default.vue'
  import company from './components/company.vue'
  import group from './components/group.vue'
  import user from './components/user.vue'
  export default {
    name: 'mode',
    components: {
      defaultMode,
      company,
      group,
      user
    },
    data () {
      return {
        defaultMode: {},
        companyData: [],
        groupData: [],
        userData: []
      }
    },
    mounted () {
      this.getModeRules()
    },
    methods: {
      async getModeRules() {
        let { data } = await getMode()
        if (data.result == 1) {
          data.resultContent.forEach(item => {
            if (item.type == 0) {
              this.defaultMode = item
            } else if (item.type == 1) {
              this.companyData.push(item)
            } else if (item.type == 2) {
              this.groupData.push(item)
            } else if (item.type == 3) {
              this.userData.push(item)
            }
          })
        } else {
          this.$message.error('获取分案策略失败')
        }
      },
      async saveModeRules () {
        let rulesData = []
        rulesData.push(this.defaultMode)
        rulesData.push(...this.companyData)
        rulesData.push(...this.groupData)
        rulesData.push(...this.userData)
        let { data } = await saveModeRules(rulesData)
        if (data.result == 1) {
          this.$message.success('修改规则成功')
        } else {
          this.$message.error('修改失败')
        }
      }
      
    }
  }
</script>

<style scoped lang="scss">
.mode {
  padding: 16px;
  .table-container {
    padding: 16px;
    .mt-20 {
      margin-top: 16px;
    }
  }
}
.footer {
  position: absolute;
  right: 35px;
  bottom: 50px;
  z-index: 999;
}
</style>
<style lang="scss">
.mode .company-table .el-table__header-wrapper,
.mode .group-table .el-table__header-wrapper,
.mode .user-table .el-table__header-wrapper {
  display: none;
}
</style>

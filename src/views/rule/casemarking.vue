<template>
  <div class="rule-container" v-loading="isLoadingData" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading">
    <div class="create-module-button">
      <el-button size="small" type="primary" @click="createModule">创建模块</el-button>
    </div>
    <div class="module-list">
      <el-table
        :expand-row-keys="expandRowKeys"
        :row-key="rowKeyFunction"
        :data="modules"
        @row-click="rowClick"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <module-container :module-id="props.row.id" :key="props.row.id"></module-container>
          </template>
        </el-table-column>
        <el-table-column label="模块名称" sortable prop="moduleName">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model="scope.row.moduleName"></el-input>
              <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <div v-else>{{ scope.row.moduleName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="优先级" width="180" sortable prop="modulePriority">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input class="edit-input" size="small" v-model.number="scope.row.modulePriority"></el-input>
            </template>
            <div v-else>{{ scope.row.modulePriority }}</div>
          </template>
        </el-table-column>
        <el-table-column label="移动" width="180">
          <template slot-scope="scope">
            <el-button type="success" @click="upModule(scope.row, scope.$index)" size="small" :disabled="scope.$index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
            <el-button type="success" @click="downModule(scope.row, scope.$index)" size="small" :disabled="scope.$index === modules.length - 1"><i class="iconfont icon-xiangxiazhanhang"></i></el-button>
          </template>
        </el-table-column>
        <el-table-column label="action" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
            <el-button v-else type="primary" @click='editModuleName(scope.row)' size="small" icon="el-icon-edit">Edit</el-button>
            <el-button type="danger" @click='deleteModule(scope.row, scope.$index)' size="small" icon="el-icon-delete">删除</el-button>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <create-module
      :show-dialog="showCreateModule"
      @cancelDialog = "showCreateModule = false"
      @createSuccess = "createModuleSuccess"
    ></create-module>
  </div>
</template>

<script>
  import { getAllModules, updateModuleName, deleteModule } from '@/api/modules.js'
  import ModuleContainer from '@/components/ModuleContainer'
  import createModule from './components/create-module-dialog.vue'
  export default {
    name: 'rule1',
    components: {
      ModuleContainer,
      createModule
    },
    data () {
      return {
        expandRowKeys: [0],   // 当前展开的模块
        isLoadingData: false,   // 是否正在加载数据
        showCreateModule: false,   // 是否显示创建模块的弹出框
        moduleType: 2,          // 当前页面规则类型
        modules: []           // 当前页面的模块列表
      } 
    },
    mounted () {
      this.getModules()
    },
    methods: {
      // 获取当前规则对应模块
      async getModules () {
        let { data } = await getAllModules({
          moduleType: this.moduleType,
          isactive: true
        })
        if (data.result === 1) {
          this.modules = data.resultContent  
        } else {
          this.$message.error('获取模块列表失败')
        }
      },
      // 确认修改模块名称
      async confirmEdit(row) {
        let { data } = await updateModuleName({
          id: row.id,
          moduleName: row.moduleName,
          modulePriority: row.modulePriority
        })
        if (data.result === 1) {
          row.edit = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        } else{
          this.$message.error('修改失败')
        }
      },
      // 取消修改模块名称
      cancelEdit(row) {
        row.edit = false
        row.moduleName = row.originModuleName
        row.modulePriority = row.originModulePriority
      },
      // 点击编辑按钮,用来显示编辑框
      editModuleName (row) {
        row.originModuleName = row.moduleName
        row.originModulePriority = row.modulePriority
        this.$set(row, 'edit', true)
      },
      // 删除模块
      async deleteModule (row, index) {
        this.$confirm('是否确认要删除此模块？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '放弃删除'
        })
        .then( async () => {
          let { data } = await deleteModule({
            id: row.id
          })
          if (data.result === 1) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.modules.splice(index, 1)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }
        })
        .catch(action => {
          this.$message({
            type: 'info',
            message: action === 'cancel'
              ? '取消删除'
              : '停留在当前页面'
          })
        });
      },
      upModule (row, index) {
        this.$set(this.modules, index, this.modules[index - 1])
        this.$set(this.modules, index - 1, row)
      },
      downModule (row, index) {
        this.$set(this.modules, index, this.modules[index + 1])
        this.$set(this.modules, index + 1, row)
      },
      createModule () {
        this.showCreateModule = true
      },
      createModuleSuccess (data) {
        this.showCreateModule = false
        this.modules.push(data)
      },
      rowClick (row, event, column) {
        let array = ['SPAN', 'I', 'INPUT', 'BUTTON']
        if (array.indexOf(event.target.tagName) !== -1) {
          return 
        }
        if (this.expandRowKeys[0] == row.id) {
          this.expandRowKeys.shift()
        } else {
          this.expandRowKeys.shift()
          this.expandRowKeys.push(row.id)
        }
      },
      // 表格配置相关
      rowKeyFunction (row) {
        return row.id
      }
    }
  }
</script>

<style scoped lang="scss">
.rule-container {
  padding: 16px;
  .module-item {
    margin-top: 20px;
  }
  .module-list {
    .edit-input {
      padding-right: 100px;
    }
    .cancel-btn {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }
}
.create-module-button {
  text-align: right;
  padding-right: 30px;
}
</style>
<style lang="scss">
tr.el-table__row {
  cursor: pointer;
}
</style>

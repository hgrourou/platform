<template>
  <div class="user-table">
    <el-table
      :expand-row-keys="expandRowKeys"
      :row-key="rowKeyFunction"
      :data="[userData]"
      @row-click="rowClick"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row :gutter="10" class="table-header" v-show="userData.length > 0">
            <el-col :span="4">
              模块ID
            </el-col>
            <el-col :span="4">
              公司ID
            </el-col>
            <el-col :span="4">
              小组ID
            </el-col>
            <el-col :span="4">
              经办分配方式
            </el-col>
            <el-col :span="7" :offset="1">
              配置
            </el-col>
          </el-row>
          <el-row :gutter="10" v-for="(item, $index) in userData" :key="$index" class="row-item">
            <el-col :span="4">
              <el-input v-model="item.moduleId" size="small"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.companyId" size="small"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.groupId" size="small"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select size="small" v-model="item.userAllotType">
                <el-option v-for="item in modeTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-button size="small" type="primary" @click="deleteItem($index, item)"><i class="el-icon-minus"></i></el-button>
              <el-button size="small" type="primary" v-if="$index === userData.length - 1" @click="addItem"><i class="el-icon-plus"></i></el-button>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div>
            经办分案
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80" fixed="right">
        <template slot-scope="scope" >
          <div>
            <el-button size="small" type="primary" @click="addItem" v-if="userData.length == 0"><i class="el-icon-plus"></i></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import modeTypes from '../mode-type.js'
  import { deleteItem } from '@/api/mode.js'
  export default {
    name: 'user-mode',
    props: {
      userData: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        modeTypes,
        expandRowKeys: [0],   // 当前展开的模块
      }
    },
    methods: {
      deleteItem (index, row) {
        this.$confirm('是否确认要删除此条件？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '放弃删除'
        })
        .then(async() => {
          let { data } = await deleteItem({
            id: row.id
          })
          if (data.result == 1) {
            this.$message({
              type: 'info',
              message: '删除成功'
            });
            this.userData.splice(index, 1)
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
      addItem () {
        this.userData.push({
          "companyAllotType": 1,
          "companyAllotValue": 0,
          "companyId": 0,
          "groupAllotType": 1,
          "groupAllotValue": 0,
          "groupId": 0,
          "moduleId": 0,
          "userAllotType": 1,
          "userAllotValue": 0,
          "type": 3
        })
        if (this.userData.length == 1) {
          this.expandRowKeys = []
          this.expandRowKeys.push(0)
        }
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
      rowKeyFunction (row) {
        return row.id
      }
    }
  }
</script>

<style scoped lang="scss">
.table-header {
  font-size: 18px;
  font-weight: 300;
}
.row-item {
  margin-top: 8px;
}
</style>
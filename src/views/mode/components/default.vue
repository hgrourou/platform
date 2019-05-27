<template>
  <div class="default">
    <div class="title">
      默认分配值
    </div>
    <div class="table-container">
      <el-table
        class="table"
        :data="[defaultMode]"
      >
        <el-table-column label="公司分配方式">
          <template slot-scope="scope">
            <span v-show="!showChangeMode">{{modeTypes.find((item) => { return item.value === scope.row.companyAllotType}) ? modeTypes.find((item) => {return item.value === scope.row.companyAllotType}).label : ''}}</span>
            <div v-show="showChangeMode">
              <el-select size="small" v-model="scope.row.companyAllotType">
                <el-option v-for="item in modeTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="公司负荷系数">
          <template slot-scope="scope">
            <span v-show="!showChangeMode">{{scope.row.companyAllotValue}}</span>
            <div v-show="showChangeMode">
              <el-input v-model="scope.row.companyAllotValue" size="small"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小组ID">
          <template slot-scope="scope">
            <span>#</span>
          </template>
        </el-table-column>
        <el-table-column label="小组分配方式">
          <template slot-scope="scope">
            <span v-show="!showChangeMode">{{modeTypes.find((item) => { return item.value === scope.row.groupAllotType}) ? modeTypes.find((item) => {return item.value === scope.row.groupAllotType}).label : ''}}</span>
            <div v-show="showChangeMode">
              <el-select size="small" v-model="scope.row.groupAllotType">
                <el-option v-for="item in modeTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="小组分配值">
          <template slot-scope="scope">
            <span v-show="!showChangeMode">{{scope.row.groupAllotValue}}</span>
            <div v-show="showChangeMode">
              <el-input v-model="scope.row.groupAllotValue" size="small"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="经办分配方式">
          <template slot-scope="scope">
            <span v-show="!showChangeMode">{{modeTypes.find((item) => { return item.value === scope.row.userAllotType}) ? modeTypes.find((item) => {return item.value === scope.row.userAllotType}).label : ''}}</span>
            <div v-show="showChangeMode">
              <el-select size="small" v-model="scope.row.userAllotType">
                <el-option v-for="item in modeTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="small" @click="ChangeMode" v-show="!showChangeMode"><i class="el-icon-edit"></i></el-button>
              <el-button type="primary" size="small" @click="ChangeMode" v-show="showChangeMode"><i class="el-icon-check"></i></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import modeTypes from '../mode-type.js'
  export default {
    name: 'default-mode',
    props: {
      defaultMode: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        modeTypes,
        showChangeMode: false
      }
    },
    methods: {
      ChangeMode () {
        this.showChangeMode = !this.showChangeMode
        if(!this.showChangeMode) {
          this.$emit('changeDefaultMode', this.defaultMode)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.default {
  padding: 5px 16px;
  .title {
    font-size: 18px;
    font-weight: 400;
  }
  .table-container {
    margin-top: 10px;
  }
}
</style>
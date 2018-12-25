<template>
  <div>
    <el-row :gutter="10" class="table-header">
      <el-col :span="1">
        序号
      </el-col>
      <el-col :span="2">
        优先级
      </el-col>
      <el-col :span="4">
        变量
      </el-col>
      <el-col :span="4">
        判断
      </el-col>
      <el-col :span="4">
        数值
      </el-col>
      <el-col :span="3">
        操作(Dun_flag)
      </el-col>
      <el-col :span="6">
        配置
      </el-col>
    </el-row>
    <el-row v-for="(item, $index) in rules.row.resultContent" :key="$index" style="margin: 10px 0;" :gutter="10" :id="$index+1 + 'row'" :class="{errorRow: errorId === $index + 1}">
      <template>
        <el-col :span="1">
          <span>{{$index + 1}}</span>
        </el-col>
        <el-col :span="2">
          <el-input size="small" v-model="item.rulePriority"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small" v-model="item.variable" 
            :filterable="true"
            allow-create
            clearable
            placeholder="请选择变量" class="error-border">
            <el-option
              v-for="i in variables"
              :key="i"
              :label="i"
              :value="i">
            </el-option>
          </el-select>
          
        </el-col>
        <el-col :span="4">
          <el-select size="small" v-model="item.check" placeholder="请选择判断关系" class="error-border">
            <el-option label="==" value="=="></el-option>
            <el-option label=">" value=">"></el-option>
            <el-option label="<" value="<"></el-option>
            <el-option label="!=" value="!="></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input size="small" v-model="item.number" style="width: 80%;" class="error-border"></el-input>
        </el-col>
        <el-col :span="3">
          <el-select size="small" v-model="item.ruleDunFlag" class="error-border">
            <el-option value="1" label="入催"></el-option>
            <el-option value="0" label="不入催"></el-option>
          </el-select>
        </el-col>
        <el-col :span="5">
          <div>
            <el-button size="small" @click="addChild(item)"> <i class="el-icon-plus"></i> </el-button>
            <el-button size="small" @click="upLine($index)" :disabled="$index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
            <el-button size="small" @click="downLine($index)" :disabled="$index === rules.row.resultContent.length - 1">
              <i class="iconfont icon-xiangxiazhanhang"></i>
            </el-button>
            <el-button size="small" @click="deleteLine(item, $index)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </el-col>
        
        <div v-for="(subitem, index) in item.children" :key="index" style="padding: 5px 0; height: 40px;" v-if="item.children && item.children.length > 0" >
          <el-col :span="24" style="height: 10px;">
          </el-col>
          <el-col :span="2" :offset="1">
            <el-select size="small" v-model="subitem.relation" placeholder="请选择条件关系" class="error-border">
              <el-option label="与" value="&&"></el-option>
              <el-option label="或" value="||"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-select size="small" v-model="subitem.variable" 
              :filterable="true"
              clearable
              allow-create
              placeholder="请选择变量" class="error-border">
              <el-option
                v-for="i in variables"
                :key="i"
                :label="i"
                :value="i">
              </el-option>
            </el-select>
            
          </el-col>
          <el-col :span="4">
            <el-select size="small" v-model="subitem.check" placeholder="请选择判断关系" class="error-border">
              <el-option label="==" value="=="></el-option>
              <el-option label=">" value=">"></el-option>
              <el-option label="<" value="<"></el-option>
              <el-option label="!=" value="!="></el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input size="small" v-model="subitem.number" style="width: 80%;" class="error-border"></el-input>
          </el-col>
          <el-col :span="5" :offset="3">
            <div>
              <el-button size="small" @click="upChild(item.children, index)" :disabled="index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
              <el-button size="small" @click="downChild(item.children, index)" :disabled="index === item.children.length - 1"><i class="iconfont icon-xiangxiazhanhang"></i></el-button>
              <el-button size="small" @click="deleteChild(item.children, index)"><i class="el-icon-delete"></i></el-button>
            </div>
          </el-col>
        </div>
      </template>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'module-container',
    props: ['rules'],
    data () {
      return {
        errorId: -1,
        variables: ['userMaxDefaultDays', 'userOwingAmount', 'userTag', 'modelTag', 'ownerId', 'curModule', 'curGroup', 'curCompanyId', 'companyType', 'province'],
      }
    },
    mounted () {
    },
    methods: {
      addChild (item) {
        if (!item.children) {
          this.$set(item, 'children', [])
        }
        item.children.push({
          relation: '',
          variable: 'userMaxDefaultDays',  // 变量
          check: '',    // 判断
          number: '',    // 数值
        })
      },
      upChild (item, index) {
        let temp = item[index]
        this.$set(item, index, item[index - 1])
        this.$set(item, index - 1, temp)
      },
      downChild (item, index) {
        let temp = item[index]
        this.$set(item, index, item[index + 1])
        this.$set(item, index + 1, temp)
      },
      deleteChild (item, index) {
        this.$confirm('是否确认要删除此条件？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '放弃删除'
        })
        .then(() => {
          this.$message({
            type: 'info',
            message: '删除'
          });
          item.splice(index, 1)
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
      addLine() {
        this.dataList.push({
          ruleType: 1,
          rulePriority: this.dataList.length + 1,
          variable: 'userMaxDefaultDays',  // 变量
          check: '',    // 判断
          number: '',    // 数值
          children: []
        })
      },
      upLine (index) {
        let item = this.dataList[index]
        this.$set(this.dataList, index, this.dataList[index - 1])
        this.$set(this.dataList, index - 1, item)
      },
      downLine (index) {
        let item = this.dataList[index]
        this.$set(this.dataList, index, this.dataList[index + 1])
        this.$set(this.dataList, index + 1, item)
      },
      processData () {
        this.modules.forEach((moduleContent) => {
          let tempDataList = moduleContent.resultContent
          tempDataList.forEach((item, index) => {
            if (item.ruleExpression.indexOf('==') !== -1 || item.ruleExpression.indexOf('>') !== -1 
              || item.ruleExpression.indexOf('<') !== -1 || item.ruleExpression.indexOf('!=') !== -1) {
              this.$set(item, 'children', [])
              let array = item.ruleExpression.split(' ')
              let tempRelation
              array.forEach((arrayItem, arrayIndex) => {
                let tempArray = []
                let tempCheck
                if(arrayItem.indexOf('==') !== -1) {
                  tempArray = arrayItem.split('==')
                  tempCheck = '=='
                } else if(arrayItem.indexOf('!=') !== -1) {
                  tempArray = arrayItem.split('!=')
                  tempCheck = '!='
                } else if(arrayItem.indexOf('>') !== -1) {
                  tempArray = arrayItem.split('>')
                  tempCheck = '>'
                } else if(arrayItem.indexOf('<') !== -1) {
                  tempArray = arrayItem.split('<')
                  tempCheck = '<'
                } else {
                  tempRelation = arrayItem
                }
                if (arrayIndex == 0) {
                    this.$set(item, 'variable', tempArray[0])
                    this.$set(item, 'check', tempCheck)
                    this.$set(item, 'number', tempArray[1])
                } else if (tempArray.length > 1 && arrayIndex > 0) {
                  item.children.push({
                    relation: tempRelation,
                    variable: tempArray[0],
                    check: tempCheck,
                    number: tempArray[1]
                  })
                }
                
              })
            } else {
              let array
              let check
              if (item.ruleExpression.indexOf('!=') !== -1) {
                array = item.ruleExpression.split('!=')
                check = '!='
              } else if (item.ruleExpression.indexOf('==') !== -1) {
                array = item.ruleExpression.split('==')
                check = '='
              } else if (item.ruleExpression.indexOf('>') !== -1) {
                array = item.ruleExpression.split('>')
                check = '>'
              } else if (item.ruleExpression.indexOf('<') !== -1) {
                array = item.ruleExpression.split('<')
                check = '<'
              }
              this.$set(item, 'variable', array[0])
              this.$set(item, 'check', check)
              this.$set(item, 'number', array[1])
            }
          })
        })
      },
    }
  }
</script>

<style scoped lang="scss">

</style>
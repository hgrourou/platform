<template>
  <div class="rule-container">
    <div class="table-container" v-loading="isLoadingData" element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading">
      <el-row :gutter="10" class="table-header">
        <el-col :span="1">
          序号
        </el-col>
        <el-col :span="2">
          优先级
        </el-col>
        <el-col :span="3">
          变量
        </el-col>
        <el-col :span="3">
          判断
        </el-col>
        <el-col :span="3">
          数值
        </el-col>
        <el-col :span="2" style="white-space: nowrap;">
          Dun_flag
        </el-col>
        <el-col :span="2" style="white-space: nowrap;">
          module_id
        </el-col>
        <el-col :span="2" style="white-space: nowrap;">
          aspect_flag
        </el-col>
        <el-col :span="6">
          配置
        </el-col>
      </el-row>

      <el-row v-for="(item, $index) in dataList" :key="$index" style="margin: 10px 0;" :gutter="10" :id="$index+1 + 'row'" :class="{errorRow: errorId === $index + 1}">
        <template>
          <el-col :span="1">
            <span>{{$index + 1}}</span>
          </el-col>
          <el-col :span="2">
            <el-input size="small" v-model="item.rulePriority"></el-input>
          </el-col>
          <el-col :span="3">
            <el-select size="small" v-model="item.variable" placeholder="请选择变量"
              :filterable="true"
              allow-create
              clearable
              class="error-border">
              <el-option
                v-for="i in variables"
                :key="i"
                :label="i"
                :value="i">
              </el-option>
            </el-select>
            
          </el-col>
          <el-col :span="3">
            <el-select size="small" v-model="item.check" placeholder="请选择变量" class="error-border">
              <el-option label="==" value="=="></el-option>
              <el-option label=">" value=">"></el-option>
              <el-option label="<" value="<"></el-option>
              <el-option label="!=" value="!="></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input size="small" v-model="item.number" style="width: 80%;" class="error-border"></el-input>
          </el-col>
          <el-col :span="2">
            <el-select size="small" v-model="item.ruleGroupId" class="error-border">
              <el-option value="1" label="入催"></el-option>
              <el-option value="0" label="不入催"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-input size="small" v-model="item.ruleDunFlag"></el-input>
          </el-col>
          <el-col :span="2">
            <el-select size="small" v-model="item.ruleAspectFlag" class="error-border">
              <el-option value="1" label="自动外呼"></el-option>
              <el-option value="0" label="手工"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <div>
              <el-button size="small" @click="addChild(item)"> <i class="el-icon-plus"></i> </el-button>
              <el-button size="small" @click="upLine($index)" :disabled="$index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
              <el-button size="small" @click="downLine($index)" :disabled="$index === dataList.length - 1">
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
            <el-col :span="3">
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
            <el-col :span="3">
              <el-select size="small" v-model="subitem.check" placeholder="请选择变量" class="error-border">
                <el-option label="==" value="=="></el-option>
                <el-option label=">" value=">"></el-option>
                <el-option label="<" value="<"></el-option>
                <el-option label="!=" value="!="></el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-input size="small" v-model="subitem.number" style="width: 80%;" class="error-border"></el-input>
            </el-col>
            <el-col :span="6" :offset="6">
              <div>
                <el-button size="small" @click="upChild(item.children, index)" :disabled="index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
                <el-button size="small" @click="downChild(item.children, index)" :disabled="index === item.children.length - 1"><i class="iconfont icon-xiangxiazhanhang"></i></el-button>
                <el-button size="small" @click="deleteChild(item.children, index)"><i class="el-icon-delete"></i></el-button>
              </div>
            </el-col>
          </div>
        </template>
      </el-row>
      <el-button size="small" @click="addLine">
        <i class="el-icon-plus"></i>
      </el-button>
    </div>
    <div class="save-button-container">
      <el-button type="primary" @click="saveRules">保存</el-button>
    </div>
  </div>
</template>

<script>
  import { saveRules, getRules, deleteRule } from '@/api/rule.js'
  import $ from 'jquery'
  export default {
    name: 'rule',
    data () {
      return {
        isLoadingData: false,
        errorId: -1,
        variables: ['userMaxDefaultDays', 'userOwingAmount', 'userTag', 'modelTag', 'ownerId', 'curModule', 'curGroup', 'curCompanyId', 'companyType', 'province'],
        dataList: [{
          rulePriority : 0,   // 优先级
          ruleType: '2',   // 第1套规则:1, 第2套规则:2, 第3套规则:3
          ruleExpression: '',  // 规则表达式 
          ruleGroupId : '',  // 操作
          variable: '',  // 变量
          check: '',    // 判断
          number: '',    // 数值
          children: []
        }]
      }
    },
    mounted () {
      this.getRules()
    },
    methods: {
      async saveRules () {
        this.errorId = -1
        this.dataList.forEach((item, index) => {
          let tempExpress = ''
          if (!item.children) {
            tempExpress += `${item.variable}${item.check}${item.number}`
          } else if (item.children && item.children.length === 0) {
            tempExpress += `${item.variable}${item.check}${item.number}`
          } else if (item.children && item.children.length > 0) {
            tempExpress += `${item.variable}${item.check}${item.number}`
            item.children.forEach((childItem) => {
              tempExpress += ` ${childItem.relation} ${childItem.variable}${childItem.check}${childItem.number}`
            })
          }
          item.ruleExpression = tempExpress
        })
        let { data } = await saveRules(this.dataList)
        if (data.result === 1) {
          this.$message.success('更新规则成功')
        } else if(data.result === 0) {
          this.$message.error('更新规则失败,请检查输入规则')
          this.errorId = data.resultContent
          var mao = $("#" + this.errorId + "row"); //获得锚点   
          if (mao.length > 0) {//判断对象是否存在   
              var pos = mao.offset().top;  
              var poshigh = mao.height();  
              $("html,body").animate({ scrollTop: pos-poshigh-30 }, 300);  
          } 
        }
      },
      async getRules () {
        this.isLoadingData = true
        let { data } = await getRules({
          ruleType: 2
        })
        this.isLoadingData = false
        this.dataList = data.resultContent
        this.dataList.forEach((item, index) => {
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
      },
      addLine() {
        this.dataList.push({
          ruleType: 2,
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
      deleteLine (item, index) {
        this.$confirm('是否确认要删除此条件？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '放弃删除'
        })
        .then( async () => {
          let { data } = await deleteRule({
            id: item.id
          })
          if (data.result === 1) {
            this.$message({
              type: 'info',
              message: '删除成功'
            });
            this.dataList.splice(index, 1)
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
      }
    },
    watch: {
      dataList: {
        handler(val, oldVal){
          this.errorId = -1
        },
        deep:true
      }
    }
  }
</script>

<style scoped lang="scss">
.rule-container {
  padding: 20px;
  padding-left: 30px;
  .errorRow .error-border{
    border: 1px solid red;
    border-radius: 4px;
  }
  .save-button-container {
    position: fixed;
    width: 120px;
    right: 50px;
    bottom: 0px;
    padding-bottom: 30px;
  }
  .table-container {
    .table-header {
      position: sticky;
      top: 0;
      height: 30px;
      z-index: 1001;
      padding: 6px 0;
      background-color: rgba(211,211,211, 0.8);
    }
  }
}
</style>
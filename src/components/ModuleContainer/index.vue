<template>
  <div element-loading-text="拼命加载中" v-loading="isLoading" element-loading-spinner="el-icon-loading">
    <el-row v-show="rules.length === 0" style="text-align: center;">
      还没有数据, 去添加数据!
    </el-row>
    <el-row :gutter="10" class="table-header" v-show="!isLoading && rules.length > 0">
      <el-col :span="1">
        序号
      </el-col>
      <el-col :span="2">
        优先级
      </el-col>
      <el-col :span="4">
        变量
      </el-col>
      <el-col :span="3">
        判断
      </el-col>
      <el-col :span="4">
        数值
      </el-col>
      <el-col :span="3">
        操作(Dun_flag)
      </el-col>
      <el-col :span="6" :offset="1">
        配置
      </el-col>
    </el-row>
    <el-row v-for="(item, $index) in rules" :key="$index" style="margin: 10px 0;" :gutter="10" :id="$index+1 + 'row'" :class="{errorRow: errorId === $index + 1}">
      <template>
        <el-col :span="1">
          <span>{{$index + 1}}</span>
        </el-col>
        <el-col :span="2">
          <el-input size="small" v-model="item.rulePriority"></el-input>
        </el-col>
        <el-col :span="4">
          <el-select size="small" v-model="item.variable"
            :id="$index + 'item-select'"
            :class="{errorSelect: (errorSelect === $index && subItemSelectError == -1)}"
            :filterable="true"
            allow-create
            clearable
            @change="checkFunction(item, $index)"
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
        <el-col :span="6" :offset="1">
          <div>
            <el-button size="small" @click="addChild(item)"> <i class="el-icon-plus"></i> </el-button>
            <el-button size="small" @click="upLine($index)" :disabled="$index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
            <el-button size="small" @click="downLine($index)" :disabled="$index === rules.length - 1">
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
              :class="{errorSelect: (errorSelect === $index && subItemSelectError == index)}"
              clearable
              allow-create
              :id="index + 'subitem-select'"
              @change="checkFunction(subitem, index, $index)"
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
          <el-col :span="6" :offset="4">
            <div>
              <el-button size="small" @click="upChild(item.children, index)" :disabled="index === 0"><i class="iconfont icon-xiangshangzhanhang"></i></el-button>
              <el-button size="small" @click="downChild(item.children, index)" :disabled="index === item.children.length - 1"><i class="iconfont icon-xiangxiazhanhang"></i></el-button>
              <el-button size="small" @click="deleteChild(item.children, index)"><i class="el-icon-delete"></i></el-button>
            </div>
          </el-col>
        </div>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-button size="small" @click="addLine">
          <i class="el-icon-plus"></i>
        </el-button>
        <el-button size="small" @click="saveModule" type="primary">
          保存
        </el-button>
      </el-col>
      <!-- <el-col :span="6" :offset="12">
        <el-button size="small" @click="saveModule" type="primary">
          保存
        </el-button>
      </el-col> -->
    </el-row>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top transitionName="fade" :customStyle="myBackToTopStyle" :visibilityHeight="300" :backPosition="50"></back-to-top>
    </el-tooltip>
  </div>
</template>

<script>
  import { saveRules, getRules, deleteRule } from '@/api/rule.js'
  import { validateFunction } from '@/api/function.js'
  import $ from 'jquery'
  import BackToTop from '@/components/BackToTop'
  export default {
    name: 'module-container',
    components: {
      BackToTop
    },
    props: ['moduleId'],
    data () {
      return {
        myBackToTopStyle: {
          right: '50px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          'z-index': 9999,
          'border-radius': '4px',
          'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
          background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
        },
        isLoading: false,
        rules: [],
        errorId: -1,  // 标记那一条规则错误, 当条规则显示红色边框
        errorSelect: -1, // 标记某一下拉选项错误, 当前下拉选项红色标记
        subItemSelectError: -1,   // 标记某一子规则下拉选项错误, 当前下拉选项红色标记
        variables: ['userMaxDefaultDays', 'userOwingAmount', 'userTag', 'modelTag', 'ownerId', 'curModule', 'curGroup', 'curCompanyId', 'companyType', 'province'],
      }
    },
    mounted () {
      this.getRulesByModuleId()
    },
    methods: {
      async getRulesByModuleId () {
        this.isLoading = true
        try {
          let { data } = await getRules({
            moduleId: this.moduleId
          })
          if (data.result === 1) {
            this.rules = data.resultContent
            this.processData()
            this.isLoading = false
          }
        } catch (error) {
          this.isLoading = false
        }
        
      },
      async saveModule () {
        this.errorId = -1
        this.rules.forEach((item, index) => {
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
        let { data } = await saveRules(this.rules)
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
      async checkFunction (item, currentIndex, parentIndex) {
        this.errorSelect = -1
        this.subItemSelectError = -1
        let value = item.variable
        if (value && value.indexOf('(') != -1 && value.indexOf(')')) {
          let index = value.indexOf('(')
          let functionName = value.slice(0, index)
          let { data } = await validateFunction({
            name: functionName
          })
          if (data.result === 1 && data.resultContent == false) {
            var mao  //获得锚点   
            if (item.moduleId) { // 主行函数不正确
              mao = $("#" + currentIndex + "item-select");
              console.log(currentIndex + "item-select")
              this.errorSelect = currentIndex
            } else { // 子规则函数不正确
              mao = $("#" + currentIndex + "subitem-select");
              this.errorSelect = parentIndex
              this.subItemSelectError = currentIndex
            }
            if (mao) {//判断对象是否存在   
              var pos = mao.offset().top;  
              var poshigh = mao.height();  
              $("html,body").animate({ scrollTop: pos-poshigh-30 }, 300);  
            }
          }
        }
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
      },
      addLine() {
        this.rules.push({
          moduleId: this.moduleId,
          rulePriority: this.rules.length + 1,
          variable: 'userMaxDefaultDays',  // 变量
          check: '',    // 判断
          number: '',    // 数值
          children: []
        })
      },
      upLine (index) {
        let item = this.rules[index]
        this.$set(this.rules, index, this.rules[index - 1])
        this.$set(this.rules, index - 1, item)
      },
      downLine (index) {
        let item = this.rules[index]
        this.$set(this.rules, index, this.rules[index + 1])
        this.$set(this.rules, index + 1, item)
      },
      deleteLine (item, index) {
        this.$confirm('是否确认要删除此条件？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '放弃删除'
        })
        .then(async () => {
          
          let { data } = await deleteRule({
            id: item.id
          })
          if (data.result === 1) {
            this.rules.splice(index, 1)
            this.$message({
            type: 'info',
            message: '删除'
          });
          } else {
            this.$message.error('删除失败')
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
      // 获取规则后, 处理数据,然后显示在页面上
      processData () {
        this.rules.forEach((item, index) => {
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
          } 
        })
      },
    }
  }
</script>

<style scoped lang="scss">
.errorRow .error-border{
  border: 1px solid red;
  border-radius: 4px;
}

</style>
<style lang="scss">
.el-select.errorSelect .el-input .el-input__inner {
  border-color: red;
  border-radius: 4px;
}
</style>

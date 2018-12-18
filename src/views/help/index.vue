<template>
  <div class="config-rule">
    <div class="request">
      <div class="title">案件特征</div>
      <div class="table-content">
        <el-table
          :data="request"
          style="height: 100%"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="feature" label="客户ID">
          </el-table-column>
          <el-table-column prop="comment" label="中文意义">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="current-function">
      <div class="title">现使用的函数</div>
      <div class="table-content">
        <el-table
          :data="currentFunction"
          style="width: 100%"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="functionName" label="函数名">
          </el-table-column>
          <el-table-column prop="effect" label="函数说明">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="support-function">
      <div class="title">可支持的函数</div>
      <div class="table-content">
        <el-table
          :data="supportFunction"
          style="width: 100%"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="functionName" label="函数名">
          </el-table-column>
          <el-table-column prop="effect" label="函数说明">
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="operational-character">
      <div class="title">可支持运算符</div>
      <div class="table-content">
        <el-table
          :data="supportOperationalCharacter"
          style="width: 100%"
        >
          <el-table-column type="index"></el-table-column>
          <el-table-column prop="operationalCharacter" label="操作符">
          </el-table-column>
          <el-table-column prop="order" label="结合性">
          </el-table-column>
          <el-table-column prop="comment" label="操作数限制">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { request, currentFunction, supportFunction, supportOperationalCharacter} from './data.js'
  export default {
    name:'config',
    data () {
      return {
        request,
        currentFunction,
        supportFunction,
        supportOperationalCharacter
      }
    }
  }
</script>

<style scoped lang="scss">
.config-rule {
  padding: 16px;
  .request {
    margin: 0 20px;
    .title {
      font-size: 18px;
    }
    .table-content {
      width: 75%;
    }
  }
  .current-function {
    margin: 20px 20px;
    .title {
      font-size: 18px;
    }
    .table-content {
      width: 75%;
    }
  }

  .support-function {
    margin: 20px 20px;
    .title {
      font-size: 18px;
    }
    .table-content {
      width: 75%;
    }
  }

  .operational-character {
    margin: 20px 20px;
    .title {
      font-size: 18px;
    }
    .table-content {
      width: 75%;
    }
  }
}
</style>
<style lang="scss">
.config-rule {
  .el-table td, .el-table th {
    padding: 5px 0;
  }
}
</style>

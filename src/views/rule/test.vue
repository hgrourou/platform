<template>
  <div class="rule-container" v-loading="isLoadingData" element-loading-text="正在加载中"
    element-loading-spinner="el-icon-loading">
    <div class="module-list">
      <div v-for="item in modules" :key="item.id" :id="'module' + item.id" class="module-item">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'rule1',
    data () {
      return {
        isLoadingData: false,
        modules: [{
          id: 1,
          name: 'blabla1'
        }, {
          id: 2,
          name: 'blabla2'
        }, {
          id: 3,
          name: 'blabla3'
        }, {
          id: 4,
          name: 'blabla4'
        }, {
          id: 5,
          name: 'blabla5'
        }, {
          id: 6,
          name: 'blabla6'
        }, {
          id: 7,
          name: 'blabla7'
        }]
      }
    },
    methods: {

    }
  }
</script>

<style scoped lang="scss">
.rule-container {
  padding: 16px;
  .module-item {
    margin-top: 20px;
  }
}
</style>
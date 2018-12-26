<template>
  <el-dialog
    class="create-module-dialog"
    :visible="showDialog"
    title="创建模块"
    width="30%"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @open="openDialog"
    @close="closeDialog"
  >
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" style="width: 60%">
      <el-form-item label="模块名称" prop="moduleName">
        <el-input size="small" v-model="form.moduleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="优先级" prop="modulePriority">
        <el-input size="small" v-model.number="form.modulePriority"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="createModule('ruleForm2')">提交</el-button>
        <el-button size="small" @click="$emit('cancelDialog')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import { createModule } from '@/api/modules.js'
  export default {
    name: 'create-module-dialog',
    data () {
      return {
        isLoading: false,
        form: {
          moduleName: '',
          modulePriority: '',
          moduleType: 1
        },
        rules: {
          moduleName: [
            { required: true, message: '请输入模块名称', trigger: 'blur' },
            { required: true, message: '请输入模块名称', trigger: 'change' }
          ],
          modulePriority: [
            { required: true, message: '优先级不能为空', trigger: 'blur' },
            { type: 'number', message: '优先必须为数字值', trigger: 'change' }
          ],
        }
      }
    },
    props: ['showDialog'],
    methods: {
      createModule () {
        this.$refs['form'].validate( async (valid) => {
          if (valid) {
            try {
              this.isLoading = true
              let { data } = await createModule(this.form)
              this.isLoading = false
              if (data.result === 1) {
                this.form.id = data.resultContent.id
                this.$message.success('创建模板成功!')
                this.$emit('createSuccess', this.form)
              } else {
                this.$message.error('创建模板失败!')
              }
            } catch (error) {
              this.isLoading = false
            }
          } else {
            return false;
          }
        });
      },
      openDialog () {
        if (this.$refs['form']) {
          this.$refs['form'].resetFields();
        }
      },
      closeDialog () {
        this.$emit('cancelDialog')
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="420px">
      <el-form-item label="课程名称">
        <el-input v-model="form.info" style="width: 400px;" />
      </el-form-item>

      <el-form-item label="课程老师">
        <el-input v-model="form.tname" style="width: 400px;" disabled/>
      </el-form-item>

      <el-form-item label="课程价格">
        <el-input v-model="form.price" style="width: 400px;" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  created() {
    this.getlesson();
  },
  data() {
    return {
      form: null
    }
  },
  methods: {
    getlesson(){
      var  vm=this;
      this.$axios({
        method:'get',
        url:'http://localhost:8099/getInfo?id='+vm.$route.params.lid
      }).then(function(resp){
        vm.form=resp.data;
      });

    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      vm.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="420px" style="margin-top: 30px">

      <el-form-item label="老师名称">
        <el-input v-model="form.name" style="width: 400px;" />
      </el-form-item>

      <el-form-item label="老师介绍">
        <el-input v-model="form.info" style="width: 400px;" />
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
    this.getTeacher();
  },
  data() {
    return {
      uploadData:null,
      form:{
        info:'',
        name:''
      },
    }
  },
  methods: {
    onSubmit() {
      var vm=this;
      this.$axios({
        method:'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8'
        },
        url:'http://localhost:8099/addteacher',
        transformRequest:[function(data){
          return JSON.stringify(data);
        }],
        data:vm.form
      }).then(function(resp){
        if(resp.data=='ok'){
          vm.$notify({
            title: '成功',
            message: '老师添加成功',
            type: 'success'
          });
          vm.$router.go(-1);
        }
      });

    },
    onCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


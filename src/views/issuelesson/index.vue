<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="420px">

      <el-form-item label="课程名称">
        <el-input v-model="form.info" style="width: 400px;" />
      </el-form-item>

      <el-form-item label="课程老师">
        <el-select v-model="form.tid" placeholder="请选择" style="width: 400px;">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input v-model="form.price" style="width: 400px;" />
      </el-form-item>

      <el-form-item label="课程封面">
        <el-upload
          class="upload-demo"
          drag
          :data="uploadData"
          :on-success="onSuccess1"
          action="http://localhost:8099/issue_upload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>

      <el-form-item label="课程视频">
        <el-upload
          class="upload-demo"
          drag
          :data="uploadData"
          :on-success="onSuccess2"
          action="http://localhost:8099/issue_upload"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
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
      options:[
        {
          "id": 1,
          "name": "何涛",
          "info": "十年项目经理"
        }
      ],
      form:{
        info:'',
        tid:'',
        price:'',
        img:'',
        video:''
      },
      img:null
    }
  },
  methods: {
    onSuccess1(res){
      this.form.img =res;
      console.log(this.form.img)
    },
    onSuccess2(res){
      this.form.video =res;
      console.log(this.form.video)
    },
    getTeacher(){
      var vm=this;
      this.$axios({
        method:'get',
        url:'http://localhost:8099/getallteacher'
      }).then(function(resp){
        vm.options=resp.data;
      });
    },
    onSubmit() {
      var vm=this;
      this.$axios({
        method:'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8'
        },
        url:'http://localhost:8099/addlesson',
        transformRequest:[function(data){
          return JSON.stringify(data);
        }],
        data:vm.form
      }).then(function(resp){
        if(resp.data=='ok'){
          vm.$notify({
            title: '成功',
            message: '课程添加成功',
            type: 'success'
          });
          this.$router.push("/lesson");
        }
      });

    },
    onCancel() {
      // this.$router.go(-1)
      this.$router.push("/lesson");
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>


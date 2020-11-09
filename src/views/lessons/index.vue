<template>
  <div class="app-container">
    <el-table
      height="566px"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="195">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="课程名称">
        <template slot-scope="scope">
          {{ scope.row.info }}
        </template>
      </el-table-column>

      <el-table-column label="老师" width="210" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tname }}</span>
        </template>

      </el-table-column>
      <el-table-column label="课程价格" width="210" align="center">
        <template slot-scope="scope">
          {{ scope.row.price }}元
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="操作" width="310" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editlesson(scope.row.id)"></el-button>
          <el-button type="primary" icon="el-icon-delete"@click="dellesson(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"   @pagination="getList" />

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components:{Pagination},
  data() {
    return {
      list: null,
      listLoading: false,
      total: 0,
      listQuery: {
        page: 1,
        limit: 8,
      },
    }
  },
  created() {
    // this.fetchData()
    this.getList()
  },
  methods: {
    editlesson(lid){
      this.$router.push("/editlesson/index/"+lid);
    },
    getList(){
      var vm=this;
      this.$axios({
        method:'get',
        url:'http://localhost:8099/findAllLesson?pageNum='+vm.listQuery.page+'&pageSize='+vm.listQuery.limit
      }).then(function(resp){
        vm.list=resp.data.list;
        vm.total=resp.data.total;
      });
    }
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // }
  }
}
</script>

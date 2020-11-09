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
      <el-table-column align="center" label="序号" width="195" >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>

      <el-table-column label="老师名称" width="310" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="老师介绍"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.info }}</span>
        </template>

      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="310" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="editlesson(scope.row.id)"></el-button>
          <el-button type="primary" icon="el-icon-delete"></el-button>
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
        url:'http://localhost:8099/getteacherlist?pageNum='+vm.listQuery.page+'&pageSize='+vm.listQuery.limit
      }).then(function(resp){
        vm.list=resp.data.list;
        vm.total=resp.data.total;
      });
    }
  }
}
</script>

<template>
  <div class="wrapper">
  <h1>移交历史纪律查询</h1>
  <hr style="height:5px;border:none;border-top:5px ridge blue;">
   <span>关键字</span>
   <el-input v-model="search" style="display: inline-block;width: 300px" 
        placeholder="请输入关键字:姓名">
      </el-input>
      <span style="margin-left:100px">移交历史时间:</span>
       <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  <el-table
      :data="tables.slice((currpage-1)*pagesize,currpage*pagesize)"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="customer"
        label="客户姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="transTime"
        label="操作日期">
      </el-table-column>
      <el-table-column
        prop="oldSeller"
        label="旧营销人员">
      </el-table-column>
      <el-table-column
        prop="newSeller"
        label="新营销人员">
      </el-table-column>
      <el-table-column
        prop="transReason"
        label="移交原因">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currpage"
      :page-sizes="[5,10,20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length">
    </el-pagination>
    </div>
</template>

<script>
export default {
    
  components: {},
  props: {},
  data() {
    return {
        tableData: [],
        search:'',
          value1: '',
        pagesize:5,
      currpage:1,
        form:{
            id:'',
            customer:'',
            transTime:DataTransferItemList,
            oldSeller:'',
            newSeller:'',
            transReason:''
        }
    };
  },
  watch: {},
  computed: {tables () {
        const search = this.search
        if (search) {
         
          return this.tableData.filter(data => {
          
            return Object.keys(data).some(key => {
              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
  
        return this.tableData
      }},
  methods: {
      async getData(){
        const res = await this.$http.get('/Remove/query')
        this.tableData = res.data.data
        for(var i=0 ;i<res.data.data.length ; i++){
    const date = new Date(res.data.data[i].transTime)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day=  date.getDay()
    if(month<10){
        var month1 = '0'+month
      }
      if(day<10){
        var day1 = '0'+day
      }
     
    res.data.data[i].transTime=year +'-'+month1 + '-' +day1
    
 }
        
        
      },
       handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currpage = val;
      },
  },
  created() {this.getData()},
  mounted() {}
};
</script>
<style  scoped>
</style>
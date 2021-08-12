<template>
  <div class="wrapper">
  <h1>客户列表</h1>
  <hr style="height:5px;border:none;border-top:5px ridge blue;">
  <span>关键字</span>
   <el-input v-model="search" style="display: inline-block;width: 300px" 
        placeholder="请输入关键字:姓名/电话号码">
      </el-input>
  <el-table
    ref="filterTable"
    :data="tables.slice((currpage-1)*pagesize,currpage*pagesize)"
    style="width: 140%">
    <el-table-column
      prop="id"
      label="编号"
      width="140"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="140">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="140"
      >
    </el-table-column>
     <el-table-column
      prop="tel"
      label="电话"
      width="140">
    </el-table-column>
     <el-table-column
      prop="qq"
      label="QQ"
      width="140">
    </el-table-column>
     <el-table-column
      prop="job"
      label="职业"
      width="140">
    </el-table-column>
     <el-table-column
      prop="source"
      label="来源"
      width="140">
    </el-table-column>
     <el-table-column
      prop="employee"
      label="市场专员"
      width="140"
       :filters="[{ text: '郑雨', value: '郑雨' },
       { text: '芦杰龙', value: '芦杰龙' },
       { text: '廖星宇', value: '廖星宇' },
       { text: '钟磊', value: '钟磊' },
       { text: '方豪', value: '方豪' }]"
      :filter-method="filterTag1"
      filter-placement="bottom-end">
    </el-table-column>
    <el-table-column
      prop="states.name"
      label="状态"
      width="140"
      :filters="[{ text: '失败客户', value: '失败客户' },
       { text: '正式客户', value: '正式客户' },
       { text: '潜在客户', value: '潜在客户' },
       { text: '客户池', value: '客户池' },
       { text: '流失客户', value: '流失客户' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
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
      pagesize:5,
      currpage:1,
      tableData: [],
        search:'',
        search1:'',
        form:{
          id:'',
          name:'',
          age:'',
          tel:'',
          qq:'',
          job:'',
         source:'',
         employee:'',
         states:{
            id:'',
            name:''
            
         }
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
      }
    },
  methods: { 
    async getData(){
        const res = await this.$http.get('/customer/query')
        this.tableData = res.data.data
        
        
      },
     
      formatter(row) {
        return row.address;
      },
      filterTag(value, rows) {
        return rows.states.name === value;
      }, filterTag1(value, rows) {
        return rows.employee === value;
      },
      
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currpage = val;
      },
     
    },
  created() {
     this.getData()
  },
  mounted() {}
};
</script>
<style  scoped>
</style>
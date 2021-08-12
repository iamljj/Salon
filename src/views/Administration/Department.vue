
<template>
  <div class="wrapper">
  <h1>部门管理</h1>
  <hr style="height:5px;border:none;border-top:5px ridge blue;">
  <el-row>
  <el-button type="success" @click="toAdd">添加</el-button>
  </el-row>
  <el-dialog title="部门新增" :visible.sync="dialogFormVisible">
        <el-form>
      

          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="部门编号" :label-width="formLabelWidth">
            <el-input v-model="form.sn"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add()">保存</el-button>
        </div>
      </el-dialog>
  <el-dialog title="部门修改" :visible.sync="dialogFormVisible1">
        <el-form>
      

          <el-form-item label="部门名称" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="部门编号" :label-width="formLabelWidth">
            <el-input v-model="form.sn"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="edit1()">修改
          </el-button>
        </div>
      </el-dialog>
  <br>
   <el-table
    :data="tableData.slice((currpage-1)*pagesize,currpage*pagesize)"
    style="width: 100%;height:80%"
    >
    <el-table-column
      fixed
      prop="id"
      label="编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="部门名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="sn"
      label="部门编号"
      width="200">
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
       <el-button
          @click.native.prevent="edit(scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.native.prevent="open(scope.row.id)"
          
          type="text"
          size="small">
          移除
        </el-button>
      </template>
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
    data() {
      return {pagesize:5,
      currpage:1,
      rowId:0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      formLabelWidth: "100px",
      form: {
        id:'',
        name:'',
        sn:''
      },
      tableData: []
      }
    },
    created() {
      this.getData()
    },
      methods: {
      async getData(){
        const res = await this.$http.get('/department/query')
        this.tableData = res.data.data
        
        
      },
      async open(id) {
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            
          },
           this.$http.post(`/department/delete?id=${id}`)
           )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })      
 setTimeout(() => {
        this.getData()
     }, 2000);
      },
      
     async add(){
      await this.$http.post(`/department/saveOrUpdate?name=${this.form.name}&sn=${this.form.sn}`)
       this.getData()
      this.dialogFormVisible = false;
      
     },
    async edit(row) {
      // console.log(row.name);
      this.rowId = row.id
      this.dialogFormVisible1 = true;
this.form.name=row.name
this.form.sn=row.sn
      

    },
    edit1(){
      // console.log(row.name);
      this.$http.post(`/department/saveOrUpdate?id=${this.rowId}&name=${this.form.name}&sn=${this.form.sn}`)
      this.dialogFormVisible1 = false;
      this.getData()
      this.getData()
    },
    // 点击添加按钮
    toAdd() {
      this.dialogFormVisible = true;
      this.form.name='',
      this.form.sn=''
    },
    
    
      
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currpage = val;
      },
  },
  }
</script>
<style  scoped>
html,body{
margin: 0;
padding: 0;
}
h1{
color: blue;
font-size: 24px;

}
hr{
color: blue;
margin-top: -15px;}
</style>
<template>
<div>
 <h1>员工管理</h1>
  <hr style="height:5px;border:none;border-top:5px ridge blue;">
 <el-input v-model="search" style="display: inline-block;width: 300px" 
        placeholder="请输入搜索内容">
      </el-input>
  <el-button type="primary" style="margin-left:30px" @click="toAdd">添加员工</el-button>
  <el-button type="danger" style="margin-left:30px" @click="handleDelete()">批量删除</el-button>
  <el-button type="primary" style="margin-left:30px" @click="EX">点击导出</el-button>
  <el-upload
    class="upload-demo"
    action=""
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
    :auto-upload="false">
    <el-button size="small" type="primary">点击上传</el-button>
</el-upload>

  <el-dialog title="部门保存" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <span style="margin-left:60px;margin-right:10px">部门</span>
             <el-select v-model="form.department.id" placeholder="请选择">
    <el-option
      v-for="item in tableData1"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add()">保存</el-button>
        </div>
      </el-dialog>
  <el-dialog title="部门修改" :visible.sync="dialogFormVisible1">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <span style="margin-left:60px;margin-right:10px">部门</span>
             <el-select v-model="form.department.id" placeholder="请选择">
    <el-option
      v-for="item in tableData1"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="edit1()">修改</el-button>
        </div>
      </el-dialog>
  <el-table
    ref="multipleTable"
    :data="tables.slice((currpage-1)*pagesize,currpage*pagesize)"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="id"
      label="编号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="120"
      >
    </el-table-column>
    <el-table-column
      prop="department.name"
      label="部门"
      width="200">
    </el-table-column>
  <el-table-column
      label="操作"
      width="120">
      <template slot-scope="scope">
       <el-button
          @click.native.prevent="edit(scope.$index,scope.row)"
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
  <div style="margin-top: 20px">
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
  
  </div>
</template>

<script>

  export default {
    data() { 
      return {pagesize:5,
      currpage:1,
      rowId:0,
         bookPrice: "",
      bookAuthor: "",
      bookName: "",
      departmentName:"",
      Emali:"",
      dialogFormVisible: false,
      dialogFormVisible1:false,
      formLabelWidth: "100px",
      selectId:[],
      form: {
        id:'',
        name:'',
        age:'',
        email:'',
       department:{
         id:''
       },
        deptid:'',
        deptname:'',
        sn:''
      },
        tableData: [],
        tableData1:[],
        multipleSelection: [],
        search:''

      }
    }, 
    created() {
      this.getData()
      this.getData1()
    },

    methods: {
       async getData(){
        const res = await this.$http.get('/employee/query')
        this.tableData = res.data.data
        
        
      },
      async getData1(){
 const res = await this.$http.get('/department/query')
        this.tableData1 = res.data.data
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
           this.$http.post(`/employee/delete?id=${id}`)
           );
           
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      setTimeout(() => {
        this.getData()
     }, 1500);
      },
            async add(){
      await this.$http.post(`/employee/saveOrUpdate?name=${this.form.name}&age=${this.form.age}&email=${this.form.email}&department.id=${this.form.department.id}`)
       this.getData()
      this.dialogFormVisible = false;
     
    },
            async edit1(){
      await this.$http.post(`/employee/saveOrUpdate?id=${this.rowId}&name=${this.form.name}&age=${this.form.age}&email=${this.form.email}&department.id=${this.form.department.id}`)
       this.getData()
      this.dialogFormVisible1 = false;
     
    },
     edit(index, row) {
      // console.log(row.name);
      this.dialogFormVisible1 = true;
      this.rowId = row.id,
      this.form.name = row.name;
      this.form.age = row.age;
      this.form.email = row.email;
      this.form.department.id=row.department.id
      // console.log(index)
      this.editIndex = index;
      this.qubie = "edit";
    },
    // 点击添加按钮
    toAdd() {
      this.dialogFormVisible = true;
      this.form.name = '';
      this.form.age = '';
      this.form.email = '';
      this.form.department.id='';
    },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currpage = val;
      },
      deleteRow(index, rows) {
      rows.splice(index, 1);
    }, 
    handleSelectionChange(data) {

      for(var i=0;i<data.length;i++){
         this.selectId[i] =data[i].id
      }
    
      
    },
    async handleDelete() {
      await this.$http.post(`/employee/employeeDeletes?delitems=${[this.selectId]}`)
      this.getData()
    },
    async EX(){
     let uri = "data:text/xls;charset=utf-8,\ufeff" + encodeURIComponent(this.tableData);
       //通过创建a标签实现
       var link = document.createElement("a");
       link.href = uri;
       //对下载的文件命名
       link.download = "员工数据表.xls";
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    }
    
    },computed: {
      // 模糊搜索
      tables () {
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
    }
  }
</script>
<style scoped>

     .el-upload {
        display: inline;
        text-align: center;
        cursor: pointer;
        outline: 0;
        
        
    }
 
     .upload-demo {
        display: inline;
        margin-left: 30px;
        height: 40px;
        
    }
</style>

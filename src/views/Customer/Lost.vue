<template>
  <div class="wrapper">
  <h1>流失客户</h1>
  <hr style="height:5px;border:none;border-top:5px ridge blue;">
  <span>关键字</span>
   <el-input v-model="search" style="display: inline-block;width: 300px;margin-right:30px" 
        placeholder="请输入关键字:姓名/电话号码">
      </el-input>    
  <el-dialog title="部门修改" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age"></el-input>
          </el-form-item>

          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="qq" :label-width="formLabelWidth">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item label="职业" :label-width="formLabelWidth">
            <el-input v-model="form.job"></el-input>
          </el-form-item>
          <el-form-item label="来源" :label-width="formLabelWidth">
            <el-input v-model="form.source"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="edit1()">编辑</el-button>
        </div>
        </el-dialog>
  <el-dialog title="新增客户" :visible.sync="dialogFormVisible4">
        <el-form>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" :label-width="formLabelWidth">
            <el-input v-model="form.age"></el-input>
          </el-form-item>

          <el-form-item label="电话" :label-width="formLabelWidth">
            <el-input v-model="form.tel"></el-input>
          </el-form-item>
          <el-form-item label="qq" :label-width="formLabelWidth">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item label="职业" :label-width="formLabelWidth">
            <el-input v-model="form.job"></el-input>
          </el-form-item>
          <el-form-item label="来源" :label-width="formLabelWidth">
            <el-input v-model="form.source"></el-input>
          </el-form-item>
           <span style="margin-left:35px;margin-right:5px">销售员</span>
             <el-select v-model="form.employee" placeholder="请选择">
    <el-option
      v-for="item in tableData1"
      :key="item.name"
      :label="item.name"
      :value="item.name"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
  <span style="margin-left:60px;margin-right:10px">状态</span>
   <el-select v-model="form.stateId" placeholder="请选择">
    <el-option
      v-for="item in tableData2"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="add1()">新增</el-button>
        </div>
        </el-dialog>

         <el-dialog title="移交" :visible.sync="dialogFormVisible2">
         <el-form>
         <el-form-item label="顾客姓名" :label-width="formLabelWidth" style="width:200px">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
         </el-form>
        <span style="margin-left:12px;margin-right:10px">原销售员</span>
             <el-select v-model="form.employee" disabled placeholder="请选择" style="width:200px">
    <el-option
      v-for="item in tableData1"
      :key="item.name"
      :label="item.name"
      :value="item.name"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
  <br><br>
        <span style="margin-left:12px;margin-right:10px">现销售员</span>
             <el-select v-model="newEmployee"  placeholder="请选择" style="width:200px">
    <el-option
      v-for="item in tableData1"
      :key="item.name"
      :label="item.name"
      :value="item.name"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
    <br>
    <br>
    <el-form>
         <el-form-item label="移交原因" :label-width="formLabelWidth" style="width:200px">
            <el-input v-model="why" style="min-height:100px;width:300px"></el-input>
          </el-form-item>
         </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify1()">移交</el-button>
        </div>
        
         </el-dialog>
         <el-dialog title="修改状态" :visible.sync="dialogFormVisible3">
         <el-select v-model="form.stateId" placeholder="请选择">
    <el-option
      v-for="item in tableData2"
      :key="item.id"
      :label="item.name"
      :value="item.id"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="modify3()">修改状态</el-button>
        </div>
         </el-dialog>
  <el-table
    ref="filterTable"
    :data="tables.slice((currpage-1)*pagesize,currpage*pagesize)"
    style="width: 120%">
   <el-table-column
      prop="id"
      label="编号"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="110">
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      width="110"
      >
    </el-table-column>
     <el-table-column
      prop="tel"
      label="电话"
      width="110">
    </el-table-column>
     <el-table-column
      prop="qq"
      label="QQ"
      width="110">
    </el-table-column>
     <el-table-column
      prop="job"
      label="职业"
      width="110">
    </el-table-column>
     <el-table-column
      prop="source"
      label="来源"
      width="110">
    </el-table-column>
     <el-table-column
      prop="employee"
      label="市场专员"
      width="110"
       :filters="[{ text: '郑雨', value: '郑雨' },
       { text: '芦杰龙', value: '芦杰龙' },
       { text: '廖星宇', value: '廖星宇' },
       { text: '钟磊', value: '钟磊' },
       { text: '方豪', value: '方豪' },
       { text: '梁家郡', value: '梁家郡' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
    </el-table-column>
    <el-table-column
      prop="states.name"
      label="状态"
      width="110"
     >
<template slot-scope="scope">
        <el-tag
          :type="scope.row.states.name === '家' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.states.name}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="200">
      <template slot-scope="scope">
       <el-button
          @click.native.prevent="edit(scope.$index,scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
        <el-button
          @click.native.prevent="modify(scope.$index,scope.row)"
          type="text"
          size="small">
          移交
        </el-button>
        <el-button
          @click.native.prevent="modify2(scope.$index,scope.row)"
          type="text"
          size="small">
          修改状态
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
  components: {},
  props: {},
  data() {
    return {
      pagesize:5,
      currpage:1,
      dialogFormVisible: false,
      dialogFormVisible2:false,
      dialogFormVisible3:false,
      dialogFormVisible4:false,
      tableData: [],
      tableData1:[],
      tableData2:[],
      newEmployee:'',
      why:'',
        search:'',
        rowId:0,
        formLabelWidth:'80px',
        form:{
           id:'',
          name:'',
          age:'',
          tel:'',
          qq:'',
          job:'',
         source:'',
         employee:'',
         stateId:'',
         states:{
            id:'',
            name:''
         },
        transTime:''

        }
    };
  },
  watch: {},
   created() {
     this.getData()
     this.getData1()
     this.getData2()
  },
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
        const res = await this.$http.get('/customer/list2')
        this.tableData = res.data.data
        
        
      },
       async getData1(){
        const res = await this.$http.get('/employee/query')
        this.tableData1 = res.data.data
        
        
      },
       async getData2(){
        const res = await this.$http.get('/customer/selectStates')
        this.tableData2 = res.data.data
        
        
      },
      formatter(row) {
        return row.address;
      },
      filterTag(value, row) {
        return row.employee === value;
      }, handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currpage = val;
      },
      edit(index, row) {

      this.dialogFormVisible = true;
      this.rowId = row.id,
      this.form.name = row.name;
      this.form.age= row.age;
      this.form.tel = row.tel;
      this.form.qq = row.qq;
      this.form.job = row.job;
      this.form.source = row.source;
      this.editIndex = index;
      this.qubie = "edit";
    },
  async edit1(){
      await this.$http.post(`/customer/update1?id=${this.rowId}
      &name=${this.form.name}
      &age=${this.form.age}
      &tel=${this.form.tel}
      &qq=${this.form.qq}
      &job=${this.form.job}
      &source=${this.form.source}`)
       this.getData()
      this.dialogFormVisible = false;
    },
    toAdd(){
        this.dialogFormVisible4 = true;
     this.rowId = '',
      this.form.name = '';
      this.form.age= '';
      this.form.tel = '';
      this.form.qq = '';
      this.form.job = '';
      this.form.source = '';
      this.form.employee='';
      this.form.stateId=''
    },
    async add1(){
      await this.$http.post(`/customer/insert?
       &name=${this.form.name}
      &age=${this.form.age}
      &tel=${this.form.tel}
      &qq=${this.form.qq}
      &job=${this.form.job}
      &source=${this.form.source}
      &employee=${this.form.employee}
      &stateId=${(this.form.stateId)}
      `)
      this.dialogFormVisible4=false;
 this.getData()
    },
     modify(index,row){
       this.rowId=row.id;
       this.dialogFormVisible2 = true;
       this.form.employee =row.employee;
       this.form.name=row.name
       this.editIndex = index;
      
     },
    async modify1(){
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const data = date.getDay()
      if(month<10){
        var month1 = '0'+month
      }
      if(data<10){
        var data1 = '0'+data
      }
      this.transTime = year +'-'+month1 +'-'+data1
      await this.$http.post(`/customer/update2?id=${this.rowId}&employee=${this.newEmployee}`)
      await this.$http.post(`/Remove/insert?customer=${this.form.name}&transTime=${this.transTime}&oldSeller=${this.form.employee}&newSeller=${this.newEmployee}&transReason=${this.why}&`)
      this.dialogFormVisible2=false;
      this.getData()
     },
     modify2(index,row){
       this.rowId=row.id
         this.dialogFormVisible3 = true;
         this.form.states.name=row.states.name;
          this.editIndex = index;
     },
     async modify3(){
await this.$http.post(`/customer/update3?id=${this.rowId}&stateId=${this.form.stateId}`)
this.dialogFormVisible3=false;
 this.getData()
     },
    },
     

  mounted() {}
}
</script>

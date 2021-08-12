<template>
  <div class="wrapper">
  <h1>潜在用户统计报表</h1>
  <hr style="height:5px;border:none;border-top:5px ridge blue;">
   <div id="myChart" :style="{width: '600px', height: '300px',display:'dainji'} ">
   </div>
   <el-input v-model="search" style="display: inline-block;width: 300px" 
        placeholder="请输入关键字:姓名进行查询">
      </el-input>
      <span style="margin-left:60px">时间查询:</span>
       <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <span style="margin-left:60px">分组类型:</span>
    <el-select v-model="fenzu" placeholder="请选择" style="width:150px">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :label-width="formLabelWidth">
    </el-option>
  </el-select>
  <el-button type="success" @click="chaxue" style="margin-left:30px">查询</el-button>
<br><br>
 <el-button type="primary" @click="drawLine">柱状图</el-button>
  <el-button type="success" @click='drawPieChart'>饼状图</el-button>
   <div ref="echarts">
  </div>
  <el-table
  :data="tables.slice((currpage-1)*pagesize,currpage*pagesize)"
      style="width: 100%">
      <el-table-column
        prop="time"
        label="分组类型"
        width="1000"
        >
      </el-table-column>
      <el-table-column
        prop="totalCount"
        label="新增潜在客户数"
        width="180">
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
        fenzu:'year',
        search:'',
          value1: '',
          formLabelWidth:'80px',
        pagesize:5,
      currpage:1,
      times:[],
      dianji:'',
      totalCounts:[],
        form:{
            id:'',
            customer:'',
            transTime:DataTransferItemList,
            oldSeller:'',
            newSeller:'',
            transReason:'',
            totalCount:'',
            time:''

        },
        options: [{
          value: 'c.employee',
          label: '员工'
        }, {
          value: 'year',
          label: '年'
        }, {
          value: 'month',
          label: '月'
        }, {
          value: 'day',
          label: '日'
        }],
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
        
        
      },
       handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currpage = val;
      },
   async  chaxue(){ 
     if(this.fenzu=="day"){
 const res =  await this.$http.get('/customerSelect/day')
 this.tableData = res.data.data
 for( i=0;i<res.data.data.length;i++){
         this.times[i] =res.data.data[i].time
         this.totalCounts[i]=res.data.data[i].totalCount

      }
      
}
if(this.fenzu=="year"){
 const res =  await this.$http.get('/customerSelect/year')
 this.tableData = res.data.data
 for( i=0;i<res.data.data.length;i++){
         this.times[i] =res.data.data[i].time
         this.totalCounts[i]=res.data.data[i].totalCount

      }
      
}
if(this.fenzu=="month"){
  
 const res =  await this.$http.get('/customerSelect/month')
 this.tableData = res.data.data
 for( i=0;i<res.data.data.length;i++){
         this.times[i] =res.data.data[i].time
         this.totalCounts[i]=res.data.data[i].totalCount

      }
}
if(this.fenzu=="c.employee"){
  
 const res =  await this.$http.post(`/customerSelect/select?groupTypeStr=${"c.employee"}`)
 this.tableData = res.data.data
 for( i=0;i<res.data.data.length;i++){
         this.times[i] =res.data.data[i].time
         this.totalCounts[i]=res.data.data[i].totalCount

      }
 
}if(this.value1!=''){
const res =  await this.$http.post(`/customerSelect/select?groupTypeStr=${"input_time"}&starTime=${this.value1[0]}&endTime=${this.value1[1]}`)
 this.tableData = res.data.data
 

 for(var i=0 ;i<res.data.data.length ; i++){
    const date = new Date(res.data.data[i].time)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day=  date.getDay()
    if(month<10){
        var month1 = '0'+month
      }
      if(day<10){
        var day1 = '0'+day
      }
     
    res.data.data[i].time=year +'-'+month1 + '-' +day1
 }
 }
   },drawLine(){
        // 基于准备好的dom，初始化echarts实例
        var echarts = require('echarts')
        let myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表

        myChart.setOption({
            title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
               data: this.times
            },
            yAxis: {},
            series: [{
                name: '新增潜在客户数',
                type: 'bar',
                data: this.totalCounts
            }]
        });
    },
    drawPieChart() {
      var echarts = require('echarts')
                this.chartPie = echarts.init(document.getElementById('myChart'));
                this.chartPie.setOption({
                    title: {
                        text: '',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: '',
                        left: 'left',
                        data: this.times
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                { value: 3, name: '郑雨' },
                                { value: 1, name: '芦杰龙' },
                                { value: 2, name: '廖星宇' },
                                { value: 2, name: '方豪' },
                                { value: 1, name: '梁家郡' },
                                { value: 2, name: '钟磊' }
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            yc(){
              this.dianji='none'
            }
  },
  
  mounted() {
     this.timer = setInterval(this.drawLine, 100000);
  },
  created() {
    this.getData()
  this.chaxue()
  
// clearInterval(this.timer);
  
  },
  
};
</script>
<style  scoped>
#myChart{
  position:absolute;
		left:60%;
		top:60%;
}
</style>
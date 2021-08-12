<template>
<el-container style="height: 100vh; ">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
   <el-input placeholder="请输入内容"  style="width:10%">
        </el-input>
    <el-menu router :default-openeds="['1','2','3','4']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>系统管理</template>
        <el-menu-item-group>
          <el-menu-item index="/Administration/department">部门管理</el-menu-item>
          <el-menu-item index="/Administration/staff">员工管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>客户管理</template>
        <el-menu-item-group>
          <el-menu-item index="/Customer/customers">客户列表</el-menu-item>
          <el-menu-item index="/Customer/potential">潜在客户</el-menu-item>
          <el-menu-item index="/Customer/pool">客户池</el-menu-item>
          <el-menu-item index="/Customer/failed">失败客户</el-menu-item>
          <el-menu-item index="/Customer/regular">正式客户</el-menu-item>
          <el-menu-item index="/Customer/Lost">流失客户</el-menu-item>
        </el-menu-item-group>
        </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>客户历史</template>    
         <el-menu-item-group>
          <el-menu-item index="/TransferHistory/transfer">移交历史记录</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>统计报表</template>    
         <el-menu-item-group>
          <el-menu-item index="/Statistics/PotentialCustomers">潜在客户报表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: left; font-size: 24px">
     
      <span>CMD客户管理系统</span>
      <el-button style="margin-left:1000px" @click="zx">注销</el-button>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    },
    methods:{
    zx(){
this.$router.push({ path: '/' });
    }
  }
  };
  
</script>
<!--基本html代码区域-->
<template>
  <div class="firstdemo">
      <el-form ref="form" :model="form" label-width="100px">
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label-width="70px">
                    <span style="margin-left:80px"><font color="blue" size="3">注册登录页面</font></span>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="账户：" prop="name">
                      <el-input v-model="form.name" size="small"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="密码：" prop="password">
                      <el-input v-model="form.password" size="small" type="password"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item label="注册码：" prop="password">
                      <el-input v-model="form.zc" size="small" type="password"></el-input>
                  </el-form-item>
              </el-col>
          </el-row>
          <el-row type="flex" justify="center">
              <el-col :span="5">
                  <el-form-item>
                      <el-button type="primary" @click="submit">登录</el-button>
                      <el-button @click="register">注册</el-button>
                  </el-form-item>
              </el-col>
          </el-row>
      </el-form>
         
  </div>
</template>
 
 
<!--数据存贮交互，事件控制地区-->
<script>
export default {
  name: 'firstdemo',
  data () {
    return {
        form:{
            name:'',
            password:'',
            msg:'',
            zc:''
        },
        tableData:'',
        zt:'',
        zcm:'123456'
      
    }
  },
  methods:{
      
     async submit(){
       const res = await this.$http.post(`/users/login?username=${this.form.name}&password=${this.form.password}`)
this.zt=res.data
if(this.zt.msg=="登录成功"){
    this.$router.push({ path: '/main' });
}else{
    this.$message({
          message: '账号或密码错误',
          type: 'warning'
        });
}

      },
     async register(){
         if(this.zcm ==this.form.zc){
await this.$http.post(`/users/insert?username=${this.form.name}&password=${this.form.password}`)}
      }
       
       
  },
  
   created() {
     
  }
}

</script>

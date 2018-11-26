<template>
    <div class="login_wrap">
        <el-form label-position="top" label-width="80px" :model="formdata" class="login_form">
            <h3>用户登录</h3>
            <el-form-item label="名称">
                <el-input v-model="formdata.username"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                <el-input v-model="formdata.password"></el-input>
            </el-form-item>
            <el-button type="primary" plain class="login_btn" @click.prevent="handelLogin()">登录</el-button>
        </el-form>
    </div>

</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods:{
      async handelLogin(){
        //   不想在异步操作.then中获取结果
          const res = await this.$http.post('login',this.formdata)
          
              console.log(res);
              const{meta:{status,msg},data} = res.data
              if (status === 200) {
                  const token = localStorage.setItem('token',data.token)
                  this.$router.push({name:'home'})
                  this.$message.success(msg)
              }else{
                  this.$message.error(msg)
              }
              
          }
      }
    //   handelLogin(){
    //     //   不想在异步操作.then中获取结果
    //       this.$http.post('login',this.formdata)
    //       .then((res)=>{
    //         //   console.log(res);
    //           const{meta:{status,msg},data} = res.data
    //           if (status === 200) {
    //               this.$router.push({name:'home'})
    //               this.$message.success(msg)
    //           }else{
    //               this.$message.error(msg)
    //           }
              
    //       })
    //   }
  }
;
</script>

<style>
.login_wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_wrap .login_form {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login_wrap .login_form .login_button {
  width: 100%;
}
</style>

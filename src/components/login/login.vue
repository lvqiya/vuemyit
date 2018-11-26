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
            <el-button type="primary" plain class="login_btn">登录</el-button>
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
  }
};
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

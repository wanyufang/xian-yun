<template>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      class="form"
    >
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input placeholder="密码" v-model="form.password" type="password"></el-input>
      </el-form-item>
      <a href="#" class="forget">忘记密码</a>
      <el-button class="submit" type="primary" @click="submitForm">登录</el-button>
    </el-form>
</template>

<script>
export default {
  data() {
    return {
        // 表单数据
        form: {
            username: '13800138000', //用户名
            password: '123456'  //密码
        },
        // 表单规则
        rules: {
            // 用户名的验证
            username: [
                {
                    required: true, message: '请输入用户名', trigger: 'blur'
                }
            ],
            // 密码的验证
            password: [
                {
                     required: true, message: '请输入密码', trigger: 'blur'
                }
            ]
        }
    };
  },
  methods: {
    //   点击登录后实现二次验证
    submitForm() {
        // console.log(111);
        // let _this=this
            // console.log(this.$store.state);
        this.$refs.form.validate((valid)=>{
            if(valid){
                // console.log(123);
                // this.$axios({
                //     url: '/accounts/login',
                //     method: 'POST',
                //     data: this.form
                // }).then((res)=>{
                //     console.log(res.data);
                // })

                this.$store.dispatch('user/login', this.form)
                .then((res)=>{
                    // console.log(res);
                    this.$message({
                        message: '登陆成功 正在跳转',
                        type: 'success'
                    });
                    // console.log(this.$message);
                    // 跳转到首页
                    setTimeout(()=>{
                        this.$router.push('/')
                    },1000)
                })
            }
        })
    }
  }
};
</script>

<style lang="less" scoped>
.form {
    padding: 25px
}
.form-item {
    margin-bottom: 20px
}
.forget{
    display: block;
    font-size: 12px;
    color:#409EFF;
    text-align: right;
    line-height: 1
}
.submit {
    width: 100%;
    margin-top: 10px
}
</style>
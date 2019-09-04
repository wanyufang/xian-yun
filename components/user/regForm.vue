<template>
  <el-form :model="form" :rules="rules" ref="form" class="form">
    <el-form-item prop="username" class="common">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" class="common">
      <el-input v-model="form.captcha" placeholder="手机验证码">
        <template slot="append">
          <el-button @click="clickSend">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="common">
      <el-input v-model="form.nickname" placeholder="用户昵称"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="common">
      <el-input v-model="form.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="common">
      <el-input v-model="form.password" placeholder="再次输入密码"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm" class="submit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: ""
      },
      rules: {
        // 用户名的验证
        username: [
          {
            required: true,
            message: "请输入用户名手机号",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入手机验证码",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入用户昵称",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      console.log(111);
    },
    clickSend() {
      console.log(222);
    }
  }
};
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.common {
  margin-bottom: 20px;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
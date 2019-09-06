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
      <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" class="common">
      <el-input v-model="form.checkPassword" type="password" placeholder="再次输入密码"></el-input>
    </el-form-item>
    <el-button type="primary" @click="submitForm" class="submit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
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
        ],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    clickSend() {
      // console.log(222);
      if (!this.form.username) {
        this.$confirm("手机号不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      if (this.form.username.length === 1) {
        this.$confirm("手机号格式错误", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 发送验证码
      this.$axios({
        url: "captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        const { code } = res.data;
        this.$confirm(`模拟验证码为: ${code}`, "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      });
    },
    // 点击登录后进行二次验证
    submitForm() {
      // console.log(2222);
      // console.log(this.$refs.form);
      this.$refs.form.validate(valid => {
        // console.log(111);
        if (valid) {
          const { checkPassword, ...wan } = this.form;
          this.$axios({
            url: `/accounts/register`,
            method: "POST",
            data: wan
          }).then(res => {
            console.log(res.data);
          });
        }
      });
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
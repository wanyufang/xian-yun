<template>
  <div class="header">
    <el-row type="flex" class="between" justify="space-between">
      <div class="logo">
        <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
      </div>
      <el-row class="navs" type="flex">
        <!-- nuxt-link使用方法与router-link一样 -->
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>

      <!-- 消息按钮 -->
      <div></div>

      <!-- 登录跳转 -->
      <div class="login" v-if="!$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>

      <!-- 用户名显示 -->
      <el-dropdown v-else>
        <el-row type="flex" align="middle" class="el-link">
          <nuxt-link to="#">
            <!-- 头像 -->
            <img :src="$axios.defaults.baseURL+$store.state.user.userInfo.user.defaultAvatar" alt />
            <!-- 昵称 -->
            {{$store.state.user.userInfo.user.nickname}}
          </nuxt-link>
          <!-- 向下箭头 -->
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </el-row>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleLogout(){
      // console.log(this.$store);
      // const {commit} = this.$store
      // 可用结构将commit解构出来 也可直接使用this.$store.commit使用
      this.$store.commit('user/cleanUserInfo')
      // console.log(commit);

      this.$message({
        message: '退出成功',
        type: 'success'
      })
    }
  }
};
</script>

<style  scoped lang="less">
// 给大盒子的样式
.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  box-shadow: 0 2px 2px #ccc;
  border-bottom: 1px #ddd solid;
}
// 给版心的样式
.between {
  width: 1000px;
  margin: 0 auto;
}
// 给logo的样式
.logo {
  padding-top: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}
// 给中间导航键的样式
.navs {
  flex: 1;
  margin-left: 20px;
  a {
    display: block;
    padding: 0 20px;
    color: black;
    box-sizing: border-box;
    &:hover {
      color: #409eff;
      border-bottom: 4px solid #409eff;
    }
  }
  .nuxt-link-exact-active {
    background-color: #409eff;
    color: #fff;
    &:hover {
      color: #fff;
    }
  }
}
// 给注册登录按钮的样式
.login {
  &:hover {
    color: #409eff;
  }
}
.el-dropdown img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
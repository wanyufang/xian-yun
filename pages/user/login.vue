<template>
  <div class="div">
    <!-- 主要内容 -->
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="bbox">
        <!-- 表单头部的tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            v-for="(item, index) in ['登录','注册']"
            :key="index"
            @click="click(index)"
            :class="{active: currentTab === index}"
          >{{item}}</span>
        </el-row>

        <!-- 登录功能组件 -->
        <LoginForm v-if="currentTab == 0"/>


        <!-- 注册功能组件 -->
        <regForm v-if="currentTab == 1"/>
      </div>
    </el-row>
  </div>
</template>

<script>
// 导入登陆组件
import LoginForm from '@/components/user/loginForm.vue';
import regForm from '@/components/user/regForm.vue';

export default {
  data() {
    return {
      // 记录当前高亮的索引
      currentTab : 0
    }
  },

  // 注册组件
  components: {
     LoginForm,
     regForm
  },
  methods: {
    // 点击tab栏时触发的事件
    click(index){
      this.currentTab = index
    }
  },
};
</script>

<style lang="less" scoped>
.div {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    .bbox {
      width: 400px;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background-color: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;
          &.active {
            color: orange;
            border-top-color: orange;
            background-color: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
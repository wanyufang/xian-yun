<template>
  <div>
    <!-- 3 渲染头部组件 -->
    <Header></Header>
    <!-- 内容占位组件  相当于router-view -->
    <nuxt /> 
    <!-- 3 渲染尾部组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
// 1 引入组件
// 头部
import Header from '@/components/header'
// 尾部
import Footer from '@/components/footer'
export default {
  // 2 注册组件
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="less">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
* {
  margin: 0;
  padding: 0;
}

ul,li,ol {
  list-style: none
}

i,em{
  font-style: normal
}

a{
  color: inherit; //继承父系的颜色
  text-decoration: none
}

a:hover{
  color: inherit
}
</style>

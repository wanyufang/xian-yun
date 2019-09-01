<template>
  <div class="b-box">
    <div class="footer">
      <dl>
        <dt>闲云旅游旅游网</dt>
        <dd>上亿旅行者共同打造的"旅行神器"</dd>
        <dd>60,000 多个全球旅游目的地</dd>
        <dd>600,000 个细分目的地新玩法</dd>
        <dd>760,000,000 次攻略下载</dd>
        <dd>38,000 家旅游产品供应商</dd>
        <dd></dd>
      </dl>
      <dl>
        <dt>关于我们</dt>
        <dd>隐私政策 商标声明</dd>
        <dd>服务协议 游记协议</dd>
        <dd>商城平台服务协议</dd>
        <dd>网络信息侵权通知指引</dd>
        <dd>闲云旅游旅游网服务监督员</dd>
        <dd>网站地图加入闲云旅游</dd>
      </dl>
      <dl>
        <dt>旅行服务</dt>
        <dd>旅游攻略 酒店预订</dd>
        <dd>旅游特价 国际租车</dd>
        <dd>旅游问答 旅游保险</dd>
        <dd>旅游指南 订火车票</dd>
        <dd>旅游资讯 APP下载</dd>
      </dl>
      <dl>
        <div class="img">
          <img src="http://157.122.54.189:9093/images/1556522965.png" alt />
          <p>关注我们</p>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.b-box {
  background-color: #333333;
}
.footer {
  width: 1000px;
  margin: 0 auto;
  dl {
    color: #cccccc;
    display: inline-block;
    padding-left: 40px;
    dt {
      font-size: 18px;
      font-weight: 400;
    }
    dd {
      font-size: 14px;
    }
  }
  .img{
      text-align: center;
      img{
          width: 50%;
      }
      p{
          
      }
  }
}
</style>
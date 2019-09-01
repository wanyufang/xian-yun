<template>
  <div>
    <div>
      <span
        v-for="(item,index) in ['新闻','体育','娱乐']"
        :key="index"
        @click="clickCut(index)"
        :class="{red: create === index }"
      >{{item}}</span>
    </div>
    <div v-show="create === 0">
      <ul>
        <li>新闻11111</li>
        <li>新闻11111</li>
        <li>新闻11111</li>
      </ul>
    </div>
    <div v-show="create === 1">
      <ul>
        <li>体育2222222</li>
        <li>体育2222222</li>
        <li>体育2222222</li>
      </ul>
    </div>
    <div v-show="create === 2">
      <ul>
        <li>娱乐33333</li>
        <li>娱乐33333</li>
        <li>娱乐33333</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        create: 0
    };
  },
  methods: {
      clickCut(index){
          this.create = index
      }
  }
};
</script>

<style>
.red {
  color: red;
}
</style>
<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <flightsfilters :data="wanDate" @setDateList="setDateList"></flightsfilters>
        </div>

        <!-- 航班头部布局 -->
        <div>
          <flightListHead></flightListHead>
        </div>

        <!-- 航班信息 -->
        <div>
          <flightItem v-for="(item,index) in dataList" :key="index" :data="item"></flightItem>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <flightsAside></flightsAside>
        <!-- 侧边栏组件 -->
      </div>
    </el-row>

    <!-- 分页 -->
    <!-- size-change: pageSize改变时会触发
         current-change: currentPage改变时会触发 
         current-page: 当前页数
         page-sizes: 每页显示个数选择器的选项设置
         page-size: 每页显示条目个数
         layout: 组件布局
         total: 总条目数                 
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </section>
</template>

<script>
import flightListHead from "@/components/air/flightsListHead";
import flightItem from "@/components/air/flightsItem";
import flightsfilters from "@/components/air/flightsfilters";
import flightsAside from "@/components/air/flightsAside";

export default {
  data() {
    return {
      pageIndex: 1, // 当前页码
      pageSize: 5, //当前每页显示条数
      total: 0, //总条数
      // 机票列表包含的总数据
      flightsDate: {
        flights: [],
        info: {},
        options: {}
      },
      wanDate: {
        flights: [],
        info: [],
        options: []
      },
      // 航班列表数据 用于循环flightsItem组件 单独出来是因为要分页
      dataList: []
    };
  },
  // 监听url的变化 用于历史记录
  watch: {
    // watch可以监听this下所有的属性
    $route() {
      // 请求航班数据列表
      this.getDate();
    }
  },
  components: {
    flightListHead,
    flightItem,
    flightsfilters,
    flightsAside
  },
  mounted() {
    // 请求航班数据列表
    this.getDate();
  },
  methods: {
    getDate() {
      // 请求航班数据列表
      this.$axios({
        url: "airs",
        params: this.$route.query
      }).then(res => {
        // 赋值给总数据
        this.flightsDate = res.data;
        this.wanDate = res.data;
        // console.log(res.data);
        // 这里是一份新的缓存数据 不会更改
        this.flightsDate = { ...res.data };
        // 总页码
        this.total = this.flightsDate.flights.length;
        //   console.log(this.flightsDate.flights);
        //   第一个要显示的数据
        this.dataList = this.flightsDate.flights.slice(0, this.pageSize);
        // console.log(this.dataList);
        //   console.log(this.total);
        // console.log(res)
        // console.log(this.flightsDate);
      });
    },
    // 该方法传递给子组件 用于修改dataList
    setDateList(arr) {
      // console.log(123);
      // 修改总的航班列表
      this.flightsDate.flights = arr;
      // 页数回到第一页
      this.pageIndex = 1;
      // 切换dataList的值
      this.dataList = this.flightsDate.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // 修改总条数
      this.total = arr.length;
    },
    // 每页显示条数改变时会触发
    handleSizeChange(val) {
      //   console.log(val);
      // 赋值给val
      this.pageSize = val;
      // 利用slice截取后获取dataList的值
      this.dataList = this.flightsDate.flights.slice(0, val);
      //   console.log(this.dataList);
    },
    // 当前页码改变时会触发
    handleCurrentChange(val) {
      //   console.log(val);
      //   赋值给val
      this.pageIndex = val;
      this.dataList = this.flightsDate.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      // console.log(this.dataList);
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
<template>
  <div class="flight-item" @click="showList">
    <div>
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row type="flex" justify="space-between" class="flight-info-center">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.base_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle" v-show="falseList">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
            v-for="(item,index) in data.seat_infos"
            :key="index"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.group_name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button type="warning" size="mini" @click="handleChoose(data.id, item.seat_xid)">选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 低价推荐循环的数组
      seatList: [],
      //   默认隐藏列表页
      falseList: false
    };
  },
  methods: {
    showList() {
      //   console.log(111);
      // 循环列表展开和关闭
      this.falseList = !this.falseList;
    },
    handleChoose(id,seatId){
      this.$router.push({
        path: '/air/order',
        query: {
          id,
          seat_xid : seatId
        }
      })
    }
  },
  //   父组件给子组件传值 props
  props: {
    // 数据
    data: {
      // type是申明数据的类型  为对象
      type: Object,
      // 默认是空对象
      default: {}
    }
  },
  // 计算属性 用于算出时间差
  computed: {
    rankTime() {
      // 先将出发时间分割
      let dep = this.data.dep_time.split(":");
      let arr = this.data.arr_time.split(":");

      // 返回的是数组 取值转换为分钟数
      let depList = dep[0] * 60 + +dep[1];
      let arrList = arr[0] * 60 + +arr[1];

      // 将分钟数相减得到时间差
      let ownList = arrList - depList;
      // 判断到达日期如果是否为次日 如果是次日则重新运算
      if (depList > arrList) {
        ownList = arrList + 24 * 60 - depList;
      }
      // console.log(ownList);
      // 将时间差再转换成显示格式
      let wanList = ownList % 60;
      let showList = Math.floor(ownList / 60);
      //   console.log(showList);
      //   console.log(wanList);
      // 返回拼接好的时间格式 显示在页面中
      return `${showList}时${wanList}分`;
    }
  }
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
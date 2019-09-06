<template>
  <div class="search-form">
    <!-- 头部tab栏切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item,index) in gather"
        :key="index"
        @click="handleSearchTab(index)"
        :class="{active:index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <!-- 主体框 -->
    <el-form ref="form" :model="form" class="subject">
      <!-- 出发城市选择 -->
      <el-form-item label="出发城市" label-width="80px">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="querySearchAsync"
          placeholder="请搜索出发城市"
          @select="handleSearchSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <!-- 到达城市选择 -->
      <el-form-item label="到达城市" label-width="80px">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryArriveAsync"
          placeholder="请搜索到达城市"
          @select="handleArriveSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <!-- 出发日期选择 -->
      <el-form-item label="出发日期" label-width="80px">
        <div class="block">
          <el-date-picker
            v-model="form.departDate"
            type="date"
            placeholder="选择日期"
            @change="handleDate"
          ></el-date-picker>
        </div>
      </el-form-item>
      <!-- 确认提交按钮 -->
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <!-- 交换 -->
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      gather: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        departDate: "" //出发日期字符串
      },
      value1: ""
    };
  },
  methods: {
    // 点击Tab栏切换时触发
    handleSearchTab(index) {
      if(index===1){
        this.$alert('该功能暂未开通','提示')
      }
    },
    // 搜索出发城市焦点时触发
    querySearchAsync(value, cb) {
      // cb([
      //     {value:1},
      //     {value:2},
      //     {value:3},
      // ])
      // 根据用户的输入发送请求建议城市
      this.$axios({
        url: "/airs/city",
        // 用params接收get请求参数
        params: {
          // 用户输入的关键字
          name: value
        }
      }).then(res => {
        // console.log(res.data);
        // cb(res)
        // 给返回的数组每一项添加value值
        // 先将data从res.data中解构出来
        const { data } = res.data;
        // 申明一个新数组arrDate
        const arrDate = [];
        // 循环 v是数组中的每一个值
        data.forEach(v => {
          // 将value中的城市名的市去掉 用到replace('', '') 第一个值是要更换的 第二个是用来替换的
          v.value = v.name.replace("市", "");
          // 将重新赋值的v放进data中
          arrDate.push(v);
          // 默认选中第一个选项 防止用户输入后不选择
          this.form.departCity = arrDate[0].value;
          this.form.departCode = arrDate[0].sort;
        });
        // console.log(arrDate);
        // 将搜索的内容显示到下拉列表中
        cb(arrDate);
      });
      // 如果输入的不是城市名 就不执行此方法
      if (!value) {
        // 传递一个空的数组 就不会出现下拉框了
        cb([]);
        return;
      }
    },
    // 搜索到达城市焦点时触发
    queryArriveAsync(value, cb) {
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;
        const arrDate = [];
        data.forEach(v => {
          v.value = v.name.replace("市", "");
          arrDate.push(v);
          // 默认选中第一个选项 防止用户输入后不选择
          this.form.destCity = arrDate[0].value;
          this.form.destCode = arrDate[0].sort;
        });
        cb(arrDate);
      });
      if (!value) {
        cb([]);
        return;
      }
    },
    // 选择出发城市后触发下拉选择框
    handleSearchSelect(item) {
      // console.log(item);
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    // 选择到达城市后触发下拉选择框
    handleArriveSelect(item) {
      // console.log(item);
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    // 选择日期时触发
    handleDate(res) {
      // console.log(res)
      // console.log(moment(res).format(`YYYY-MM-DD`));
      this.form.departDate = moment(res).format(`YYYY-MM-DD`);
    },
    // 选择交换城市时触发
    handleReverse() {
      const {departCity,departCode,destCity,destCode} = this.form
      this.form.departCity = destCity
      this.form.departCode = destCode
      this.form.destCity = departCity
      this.form.destCode = departCode
    },
    // 确认提交时触发
    handleSubmit() {
      // 在提交表单之前要先做判断 不能为空
      const {departCity,destCity,departDate} = this.form
      if (!departCity) {
        this.$alert("出发城市不能为空", "提示");
        return;
      }
      if (!destCity) {
        this.$alert("到达城市不能为空", "提示");
        return;
      }
      if (!departDate) {
        this.$alert("出发日期不能为空", "提示");
        return;
      }
      // console.log(this.form);
      // 实现页面的跳转 至 机票列表页
      this.$router.push({
        // 机票列表页的连接 '/air/flights'
        path: '/air/flights',
        // url所携带的参数
        query: this.form
      })
    }
  }
};
</script>

<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}
.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }
  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}
.subject {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
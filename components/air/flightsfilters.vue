<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option
                    v-for="(item,index) in  data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            sizeOptions: [
                {name: '大' , size: 'L'},
                {name: '中' , size: 'M'},
                {name: '小' , size: 'S'}
            ]
        }
    },
    props:{
        data:{
            type: Object,
            default: {}
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){
            // console.log(value);
            // 过滤数据 只保留过滤之后的机场航班
                // console.log(this.data.flights);
            const arr = this.data.flights.filter(v=>{
                return v.org_airport_name === value
                // console.log(v.org_airport_name);
            })
            // console.log(arr);
            this.$emit("setDateList", arr)
        },
        // 选择出发时间时候触发
        handleFlightTimes(value){
            // console.log(value)
            // 将from和to通过数组的解构 解构出来 并用,分隔开
            const [from,to] = value.split(',')
            // 过滤数据 只保留选中时间出发的航班
            const arr = this.data.flights.filter(v=>{
                // 将时间格式xx:00 用:分开 并取数组第一项 xx
                const current = v.dep_time.split(':')[0]
                // console.log(current);
                // current必须在from和to之间
                return +current< +to && +current >= +from
            })
            this.$emit("setDateList",arr)
        },

         // 选择航空公司时候触发
        handleCompany(value){
            // console.log(value);
            const arr = this.data.flights.filter(v=>{
                return v.airline_name === value
            })
            this.$emit('setDateList',arr)
        },

         // 选择机型时候触发
        handleAirSize(value){
        //    console.log(value);
           const arr = this.data.flights.filter(v=>{
               return v.plane_size === value
           })
           this.$emit("setDateList",arr)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            // console.log(111);
            this.airport = "";
            this.flightTimes = "";
            this.company = "";
            this.airSize = "";
            this.pageSize = 1;
            // 返回所有数据
            this.$emit("setDateList", this.data.flights)
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
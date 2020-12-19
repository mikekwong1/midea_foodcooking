<!-- 预约完成时间组件 -->
<template>
<!-- 给他一个class当传入的值和现在的值相等时触发 -->
  <div class="items" :class="{active:activemsg==='complet'}">
    <div @click="togoing" class="subtitle">预约完成时间</div>
    <div @click="togoing" class="subcontent">
      {{ mytime.MM }}:{{ mytime.SS }}
    </div>
  </div>
</template>

<script>
// 导入格式化时间插件
import { changTime } from '@/lib/util/fomat.js'
export default {
  props:['activemsg'],
  components: {},
  data() {
    return {
      readyTimes: 0,
    };
  },
  computed: {
    mytime() {
      var timeM = parseInt(this.readyTimes / 60);
      var timeS = parseInt(this.readyTimes % 60);
      return {
        MM: timeM < 10 ? '0' + timeM : '' + timeM,
        SS: timeS < 10 ? '0' + timeS : '' + timeS,
      }
    }
  },
  watch: {},
  methods: {
    togoing() {

    },
    knobing(msg) {
      this.readyTimes = changTime(this.readyTimes, msg)
    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.items {
  /* margin-top: 35px; */
  position: relative;
  width: 250px;
  height: 250px;
  background: url("../../assets/bgc.png") no-repeat center;
}
.subtitle {
  position: absolute;
  top: 60px;
  font-size: 28px;
  white-space: nowrap;
  left: 50%;
  -webkit-transform: translateX(-50%);
}
.subcontent {
  position: absolute;
  top: 100px;
  font-size: 50px;
  white-space: nowrap;
  left: 50%;
  -webkit-transform: translateX(-50%);
}
.active {
  background: url("../../assets/focus.png") no-repeat center;
  color: #ffa20d;
}
</style>
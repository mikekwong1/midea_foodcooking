<!-- 设置时间组件 -->
<template>
  <div class="items" :class="{ active: activemsg === 'time' }">
    <div @click="togoing" class="subtitle">时间</div>
    <div @click="togoing" class="subcontent">
      {{ mytime.MM }}:{{ mytime.SS }}
    </div>
  </div>
</template>

<script>
// 导入时间处理函数
//导入mixin维护功能参数的插件
// import { mixinDIY } from '@/mixin'
export default {
  props: ['activemsg','setTimes'],
  components: {},
  data() {
    return {

    };
  },
  // mixins: [mixinDIY],

  computed: {
    mytime() {
      var timeM = parseInt(this.setTimes / 60);
      var timeS = parseInt(this.setTimes % 60);
      return {
        MM: timeM < 10 ? '0' + timeM : '' + timeM,
        SS: timeS < 10 ? '0' + timeS : '' + timeS,
      }
    }
  },
  watch: {
    setTimes(val){
      if(val<=0){
        // 取消定时器
        this.$emit('isswitch')
      }
    }
  },
  methods: {
    togoing() {

    },
  
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
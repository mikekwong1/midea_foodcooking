<!-- 设置温度组件 -->
<template>
  <div class="items" :class="{ active: activemsg === 'temp' }">
    <div @click="togoing" class="subtitle">温度</div>
    <div @click="togoing" class="subcontent">{{ tempnum }}</div>
  </div>
</template>

<script>
import { mixinDIY } from '@/mixin';
export default {
  props: ['activemsg','tempnum'],
  components: {},
  data() {
    return {
    
    };
  },
  computed: {},
  watch: {},
  // mixins: [mixinDIY],
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
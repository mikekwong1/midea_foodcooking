<!-- 设置转速组件 -->
<template>
  <div class="items" :class="{ active: activemsg === 'trun' }">
    <div @click="togoing" class="subtitle">转速</div>
    <div @click="togoing" class="subcontent">{{ turnnum }}</div>
  </div>
</template>

<script>
import { mixinDIY } from '@/mixin'

export default {
  props: ['activemsg','turnnum'],
  components: {},
  data() {
    return {
   
    };
  },
  // mixins: [mixinDIY],

  computed: {},
  watch: {},
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
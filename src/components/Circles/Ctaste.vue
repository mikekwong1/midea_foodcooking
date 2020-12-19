<!-- 口感组件 -->
<template>
  <div class="items" :class="{ active: activemsg === 'taste' }">
    <div @click="togoing" class="subtitle">口感</div>
    <div @click="togoing" class="subcontent">{{ tastes[indey] }}</div>
  </div>
</template>

<script>
export default {
  props:['activemsg'],
  components: {},
  data() {
    return {
      tastes: ['细腻', '爽口', '辛辣', '甘甜'],
      indey: 0

    };
  },
  computed: {},
  watch: {},
  methods: {
    togoing() {

    },
    knobing(msg) {
      // console.log('page1111', msg)
      this.indey += msg;
      this.indey = this.indey < 0 ? this.tastes.length - 1 : this.indey;
      this.indey = this.indey > this.tastes.length - 1 ? 0 : this.indey;
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
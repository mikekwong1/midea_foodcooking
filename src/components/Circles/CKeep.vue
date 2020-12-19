<!-- 保温组件 -->
<template>
  <div class="items" :class="{active:activemsg==='keep'}">
    <div @click="togoing" class="subtitle">保温</div>
    <div @click="togoing" class="subcontent">{{keepstr}}</div>
  </div>
</template>

<script>
export default {
  props:['activemsg'],
  components: {},
  data() {
    return {
      iskeep:true,
    };
  },
  computed: {
    keepstr(){
      if(this.iskeep){
        return '开启'
      }else{
        return '关闭'
      }
    }
  },
  watch: {},
  methods: {
    togoing(){

    },
    knobing(msg){
      this.iskeep = !this.iskeep;
      // console.log('page1111',msg)
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
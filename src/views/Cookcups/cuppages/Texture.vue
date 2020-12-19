<!-- 准备状态 -->
<template>
  <div class="pagebody">
    <div class="circlewrap">
      <!-- 口感组件 -->
      <Ctaste class="citem" @click.native="myfocus('taste')" ref="taste" :activemsg = 'activemsg'></Ctaste>
      <!-- 保温组件 -->
      <CKeep class="citem" @click.native="myfocus('keep')" ref="keep" :activemsg = 'activemsg'></CKeep>
      <!-- 预约完成时间组件 -->
      <Complet  class="citem" @click.native="myfocus('complet')" ref="complet" :activemsg = 'activemsg'></Complet>
    </div>
  </div>
</template>

<script>
// 引入三个圆圈的组件
// 保温
import CKeep from '@/components/Circles/CKeep';
import Complet from '@/components/Circles/Complet';
import Ctaste from '@/components/Circles/Ctaste';
export default {
  components: {CKeep,Complet,Ctaste},
  data() {
    return {
      activemsg: -1,
      // 定义两个圆和三个圆的状态
    };
  },
  computed: {},
  watch: {},
  methods: {
    togoing() {
      // 跳转到开始页面
      this.$router.push('/home/going')
    },
    myfocus(msg){
      // 点击后聚焦
      this.activemsg = msg;
    },
    knob(msg){
      if(this.activemsg ===-1)return;
      // 调用子组件的旋转按钮方法
      this.$refs[this.activemsg].knobing(msg)
    }

  },
  created() {

  },
  mounted() {
    this.Event.addEventListener('knob',this.knob);
  },
  beforeDestroy(){
    this.Event.removeEventListener('knob',this.knob);
  }
}
</script>

<style lang='css' scoped>
.circlewrap{
  margin-top: 60px;
  display: -webkit-flex;
  height: 250px;
  width: 854px;
  -webkit-justify-content: space-around;
}


</style>
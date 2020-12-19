<!-- 亮度设置页面 -->
<template>
  <div class="setbody">
    <div class="setbody-top">
      <div>屏幕亮度</div>
      <Slider key="bright" class="bright-bar" :width='70'></Slider>
    </div>
    <div class="setbody-buttom">
      <div>屏幕背景更换</div>
      <div class="setbody-bg" :class="{active:'default' ===this.default}" @click="setbodybg('default')">
        <p>默认背景</p>
      </div>
      <div class="setbody-zd" :class="{active:'update' ===this.default}" @click="setbodybg('update')">
        <p>由网络自动推送</p>
      </div>
    </div>
  </div>
</template>

<script>
//导入滑条组件
import Slider from './slider_bar.vue'
export default {
  components: { Slider },
  data() {
    return {
      // setbody_bg: true,
      default:'default'
    };
  },
  computed: {},
  watch: {},
  methods: {

    setbodybg(msg) {
      this.default = msg
    },

  },
  created() {

  },
  mounted() {

  }
}
</script>

<style lang='css' scoped>
.setbody {
  color: #ffffff;
  font-size: 32px;
  padding: 15px;
  box-sizing: border-box;
}
.bright-bar{
  /* 重新写 */
  margin-left: 70px;
}
.setbody .setbody-top {
  height: 110px;
  line-height: 90px;
}
.setbody div {
  -webkit-flex: 1;
}
.setbody-input {
  line-height: 60px;
}

.setbody-buttom {
  position: absolute;
  bottom: 60px;
}
.setbody-buttom p {
  width: 100%;
  bottom: 0px;
  font-size: 22px;
  position: absolute;
  text-align: center;
}
.setbody-buttom span {
  display: inline-block;
}
.setbody-buttom div {
  display: inline-block;
}
.setbody-buttom .setbody-bg {
  width: 188px;
  height: 126px;
  border: 3px solid#464646;
  position: absolute;
  box-sizing: border-box;
  left: 260px;
  bottom: -35px;
}
.setbody-buttom .setbody-zd {
  width: 188px;
  height: 126px;
  border: 3px solid#464646;
  position: absolute;
  box-sizing: border-box;
  left: 529px;
  bottom: -35px;
}
.setbody-buttom .setbody-bg.active {
  border: 3px solid#F28E02;
}
.setbody-buttom .setbody-zd.active {
  border: 3px solid#F28E02;
}
</style>
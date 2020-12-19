<!-- 称重页面 -->
<template>
  <div class="weights">
    <Headers>
      <div slot="center">称重</div>
    </Headers>
    <div class="weigh-container">
      <div class="container-left">
        <div class="container-left-top">
          <div class="weigh-img">
            <img class="img-auto" src="./img/weigh.png" alt="" />
          </div>
          <p class="weigh-g">
            <span class="weigh-text">{{ weights }}</span
            >g
          </p>
          <button class="qingling">清零</button>
          <p class="container-bottom">
            莲藕300克，腊肉50克，青椒45克，香菜10克。莲藕300克，腊肉50克，青椒45克，香菜10克。
          </p>
        </div>
      </div>
      <div class="container-right">
        <div class="line"></div>
        <div class="container-top">
          <div class="title">温馨提示:</div>
          <div class="title-bottom">
            请按下所示进行称重。
            <div class="title-img">
              <img src="./img/viewdetails.png" alt="" />
            </div>
          </div>
          <div class="container-img">
            <img class="img-auto" src="./img/00.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    -->
  </div>
</template>

<script>
// 导入头部组件
import Headers from '@/components/Header.vue'
export default {
  components: { Headers },
  data() {
    return {
      weights: 100,
    };
  },
  computed: {},
  watch: {},
  methods: {

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.qingling:focus {
  outline: none;
}
button {
  border: 0px;
}
/* chengzhogn start */
.weigh-container {
  height: 390px;
  width: 855px;
  top: 90px;
  display: -webkit-flex;
  position: absolute;
  background-color: #1b1001;
}
.weigh-container .container-left {
  font-size: 24px;
  width: 652px;
  float: left;
}
.weigh-img {
  width: 478px;
  height: 239px;
}
.weigh-container .weigh-text {
  text-align: center;
  font-size: 100px;
}
.weigh-container .qingling {
  width: 160px;
  height: 52px;
  border-radius: 80px;
  font-size: 30px;
  left: 229px;
  top: 215px;
  background: #f28e02;
  color: white;
  position: absolute;
}
.container-left-top {
  width: 100%;
  height: 100%;
  position: relative;
}
.container-left-top .weigh-img {
  top: 24px;
  left: 70px;
  position: absolute;
}
.container-left-top .weigh-g {
  top: 86px;
  left: 220px;
  /* width: 210px; */
  position: absolute;
  text-align: center;
}
.weigh-container .container-bottom {
  font-size: 26px;
  bottom: 47px;
  left: 20px;
  color: #ffffff;
  position: absolute;
}
.container-right {
  width: 225px;
  position: relative;
}
.container-right .line {
  width: 3px;
  height: 390px;
  left: 0px;
  background-size: 100% 100%;
  background: url("./img/line2.png");
  background-repeat: no-repeat;
  position: absolute;
  background-position: center;
}
.container-right .container-top {
  font-size: 22px;
  top: 20px;
  left: 20px;
  position: absolute;
}
.container-top .title {
  color: #f28e02;
}
.container-top .container-img {
  width: 131px;
  height: 165px;
  left: 25px;
  top: 95px;
  position: absolute;
}
.title-bottom {
  width: 176px;
}
.title-img {
  left: 35px;
  top: 60px;
  position: absolute;
  display: inline-block;
}
.weigh-button {
  width: 180px;
  height: 80px;
  font-size: 32px;
  right: 20px;
  bottom: 20px;
  color: white;
  background-color: #ff3f00;
  position: absolute;
}
/* chengzhogn end */
</style>
<!-- 头部导航组件 -->
<template>
  <div class="headers">
    <!-- 左边部分写死 -->
    <div class="left" @click="Back()"></div>

    <!-- 中间部分写成插槽 -->
    <div class="center">
      <slot name="center"></slot>
    </div>

    <div class="right">
      <!-- 右边部分写死 -->
      <div class="wifi" @click="toset('/wifi')"></div>

      <div class="set" @click="toset('/set')"></div>
      <div
        class="classify imgsty"
        v-show="textshow"
        @click="changesty(true)"
      ></div>
      <div
        class="classify textsty"
        v-show="imgshow"
        @click="changesty(false)"
      ></div>
    </div>
    <div class="bottom_line"></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      imglist: false,


    };
  },
  computed: {
    imgshow() {
      return this.$route.path === '/menu' && this.imglist


    },
    textshow() {
      return this.$route.path === '/menu' && !this.imglist


    }
  },
  watch: {},
  methods: {
    Back() {
      this.$router.back()

    },
    changesty(msg) {
      // 将msg传出去
      this.imglist = msg
      // console.log(msg)
      this.$emit('changesty', msg)
    },
    toset(msg) {
      this.$router.push(msg)

    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.headers {
  height: 90px;
  width: 854px;
  background: #070400;
  position: absolute;
  left: 0px;
  top: 0px;
}
.bottom_line {
  position: absolute;
  width: 854px;
  height: 4px;
  top: 86px;
  background: url("../assets/line.png") no-repeat center;
}
.left {
  width: 44px;
  height: 44px;
  background: url("../assets/Back.png") no-repeat center;
  position: absolute;
  top: 23px;
  left: 30px;
}
.headers .center {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  font-size: 32px;
  text-align: center;
  height: 90px;
  line-height: 90px;
}
.right {
  position: absolute;
  height: 44px;
  right: 20px;
  top: 23px;
  width: 200px;
  /* background-color: blue; */
}

.right .wifi {
  float: right;
  /* position: absolute; */
  width: 44px;
  height: 44px;
  /* right: 0px; */
  background: url("../assets/header_icon/wifi4.png");
}
.right .set {
  float: right;
  /* position: absolute; */
  width: 44px;
  height: 44px;
  margin-right: 20px;
  /* right: 0px; */
  background: url("../assets/header_icon/settings.png");
}
.right .classify {
  float: right;
  /* position: absolute; */
  width: 44px;
  height: 44px;
  margin-right: 20px;
  /* right: 0px; */
}
.right .imgsty {
  background: url("../assets/header_icon/imgsty.png");
}
.right .textsty {
  background: url("../assets/header_icon/txtsty.png");
}
</style>
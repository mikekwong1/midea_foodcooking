<template>
  <div class="welcome">
    <div class="set" @click="setblack">
      跳过设置
      <div class="line"></div>
    </div>
    <div class="welcome-container" v-if="stepindex === -1">
      <img class="img-auto" src="./img/welcome.png" alt="" />
      <button @click="use" class="welcone-buttom">欢迎使用</button>
    </div>
    <div v-for="(item, index) in steps" :key="index">
      <template v-if="index === stepindex">
        <img :src="item.src" class="setpimg" draggable="false" />
        <div class="nextbutton" v-if="index === 5" @click="towifi">
          联网设置
        </div>
        <div class="nextbutton" v-else @click="use">下一步</div>
      </template>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      stepindex: -1,
      steps: [
        {
          src: require("./img/newhand1.png"),
          name: '烹饪模式说明',
          active: require("./img/0-1.png"),
          isactive: require("./img/1-1.png")
        }, {
          src: require("./img/newhand2.png"),
          name: '称重方法说明',
          active: require("./img/0-2.png"),
          isactive: require("./img/1-2.png")
        }, {
          src: require("./img/newhand3.png"),
          name: '菜谱快速查看说明',
          active: require("./img/0-3.png"),
          isactive: require("./img/1-3.png")
        }, {
          src: require("./img/newhand4.png"),
          name: '智能MFC使用说明',
          active: require("./img/0-4.png"),
          isactive: require("./img/1-4.png")
        }, {
          src: require("./img/newhand5.png"),
          name: '开关机说明',
          active: require("./img/0-5.png"),
          isactive: require("./img/1-5.png")
        }, {
          src: require("./img/newhand6.png"),
          name: '使用指引查找说明',
          active: require("./img/0-6.png"),
          isactive: require("./img/1-6.png")
        },
      ],
    };
  },


  components: {

  },

  computed: {},

  methods: {
    setblack() {
      // this.$router.push('/setbox')
    },
    use() {
      this.stepindex++;
      // this.$router.push('/learnuse')
    },
    towifi() {
      console.log("跳转到联网页面")
    }
  }
}
</script>
<style lang='css' scoped>
.welcome {
  position: relative;
  display: -webkit-flex;
  background-color: #0b0b0b;
}
.set {
  width: 100px;
  left: 28px;
  top: 29px;
  font-size: 24px;
  text-align: center;
  color: #ffffff;
  position: absolute;
}
.set .line {
  border-bottom: 1px solid #ffffff;
}
.welcome .welcome-container {
  width: 546px;
  height: 300px;
  position: absolute;
  top: 128px;
  left: 154px;
}
.welcone-buttom {
  width: 180px;
  height: 80px;
  font-size: 32px;
  /* left: 337px; */
  left: 50%;
  transform: translateX(-50%);
  bottom: 7px;
  text-align: center;
  color: white;
  background-color: #ff3f00;
  position: absolute;
}
.setpimg {
  position: absolute;
  bottom: 80px;
  left: 30px;
}
.nextbutton {
  width: 180px;
  height: 80px;
  position: absolute;
  right: 20px;
  bottom: 65px;
  background-color: #ff3f00;
  font-size: 32px;
  line-height: 80px;
  text-align: center;
}
</style>
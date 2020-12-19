<!-- 声音设置页面 -->
<template>
  <div class="setbody">
    <!-- 开声音 -->
    <div class="list openV">
      <div class="theme">开启声音</div>
      <img class="openbtn" :src="Openurl" @click="clickbuttom" />
    </div>
    <!-- 设置声音 -->
    <div class="list setV">
      <div class="theme">声音</div>
      <Slider class="voice_slider" key="voice" :width="50"></Slider>
    </div>
    <!-- 选择声音 -->
    <div class="list changeV">
      <div class="theme">选择声音</div>
      <div class="changeContent">
        <img class="img-auto" :src="VwithE" @click="changeSound(false)" />

        <div class="voice-text rsts-text">人生提示+音效</div>

        <img class="img-auto" :src="EwithV" @click="changeSound(true)" />

        <div class="voice-text jyx-text">仅音效</div>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from './slider_bar.vue'
export default {
  components: { Slider },
  data() {
    return {
      // 声音是否打开
      voiceOpen: true,
      //是否是仅音效
      Onlyeffect: true,
    };
  },
  computed: {
    Openurl() {
      var url1 = require('../img/ButtonClose.png')
      var url2 = require('../img/ButtonOpen.png')
      if (this.voiceOpen) {
        return url1;
      } else {
        return url2;
      }
    },
    // 声音加音效
    VwithE() {
      // 图片是否被选中
      var url1 = require('../img/unchecked.png');
      var url2 = require('../img/checked.png');
      if (this.Onlyeffect) {
        return url1;
      } else {
        return url2;
      }
    },
    // 仅音效
    EwithV() {
      var url1 = require('../img/unchecked.png');
      var url2 = require('../img/checked.png');
      if (this.Onlyeffect) {
        return url2;
      } else {
        return url1;
      }

    },



  },
  watch: {},
  methods: {
    clickbuttom() {
      this.voiceOpen = !this.voiceOpen;
    },
    // 改变声音类型
    changeSound(msg) {
      this.Onlyeffect = msg;


    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.img-auto {
  /* ok */
  margin: 30px 5px 0px 30px;

  width: 45px;
  height: 45px;
}
.list {
  margin-left: 20px;
  display: -webkit-flex;
  font-size: 32px;
  width: 800px;
  height: 100px;
  line-height: 100px;
  /* 两端对齐 */
  justify-content: space-between;
}
.openbtn{
  width: 96px;
  height: 45px;
  margin-top: 30px;
}
.voice_slider{
  margin-top: 40px;
}
.openV {
}
.setV {
}
.changeV {
}
.changeContent {
  width: 480px;
  display: -webkit-flex;
}

/*  */

/* zxzzxzx */
</style>
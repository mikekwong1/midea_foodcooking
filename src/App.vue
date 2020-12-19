<template>
  <!-- app.vue入口文件 -->
  <div id="app">
    <router-view class="routerviews" />
    <object
      ref="DemoPlugin"
      type="brown/home"
      style="visibility: hidden;  width: 0px;  height: 0px"
    ></object>
    <object
      ref="Plugin_send"
      id="plugin_id"
      type="brown/uartplugin"
      style="visibility: hidden;  width: 0px;  height: 0px"
    ></object>
  </div>
</template>
<script>
import axios from 'axios'
// 测试代码，导入请求，导入本地存储
import { request } from '@/network/request.js'
// import { save } from '@/network/storage';

import { sha256, sha224 } from 'js-sha256';
//导入模拟键盘代码
import { keypress } from '@/lib/test.js'
//模拟下载的代码
import { mock } from '@/network/downlode/mock.js'
// const q7define = require("@/lib/COM/q7define.js");
export default {
  data() {
    return {

    }
  },
  methods: {
    //初始化plugin
    plugin_init() {
      this.plugin.init(this.$refs.Plugin_send);
      this.plugin.inithome(this.$refs.DemoPlugin);
      if (this.$refs.Plugin_send.uart_init) {
        this.$refs.Plugin_send.uart_init(115200, 9600, 9600)
      }
      this.$refs.Plugin_send.addEventListener("ttyS3_receive", this.plugin.receive);
    },
    event_init() {
      setInterval(() => {
        // console.log(this.Event)
        this.Event.dispachEvent('setInterval')
      }, 200);
    },
    download_init: mock,
    test_init: keypress,
    COM_init() {
      //在这里监听全局的串口信息
      this.Event.addEventListener('keybtn', (msg) => {
        console.log(msg)
        // 点击按键发送
        if (typeof msg === 'string') {
          msg = JSON.parse(msg)
        }
        // 判断type类型4-取消，8-主页，16-菜谱，1-称重，2-点动，13-OK
        switch (msg.value) {
          case 4:
            console.log('取消按键按下')
            // 在这里处理一下，如果是主页，菜谱，称重，点动等页面取消back操作
            var isRoot = (this.$route.path === '/home') || (this.$route.path === '/menu') || (this.$route.path === '/weight') || (this.$route.path === '/jog')
            if (isRoot) {
              //播放豆豆豆豆声音
              // console.log('豆豆')
              return;
            };
            this.$router.back()
            break;
          case 8:
            console.log('主页按键按下')
            this.pushing('/')
            break;
          case 16:
            console.log('菜谱按键按下')
            this.pushing('/menu')
            break;
          case 1:
            console.log('称重按键按下')
            this.pushing('/weight')
            break;
          case 2:
            console.log('点动按键按下')
            this.pushing('/jog')
            break;
          case 13:
            this.Event.dispachEvent('OK', msg?.press)
            console.log('ok按键按下')
            break;
        }
      })
    }
  },
  mounted() {
    //初始化下载
    this.download_init()
    // 初始化plugin
    this.plugin_init();
    // 初始化全局interval
    this.event_init();
    //初始化测试
    this.test_init()
    // console.log(sha256('121323'))
    this.COM_init();
    // this.plugin.$_send();
    // console.log(process.env)
  },
}
</script>

<style>
#app {
  width: 854px;
  height: 480px;
  position: relative;
  overflow: hidden;
  color: white;
}
* {
  -webkit-user-select: none;
  user-select: none;
}
html,
body,
h1,
h2,
h3,
p,
ul,
li {
  padding: 0;
  margin: 0;
}
ul {
  list-style: none;
}
input {
  outline: none;
}
img {
  display: block;
}
.pagebody {
  position: absolute;
  width: 854px;
  height: 390px;
  top: 90px;
  color: #ffffff;
  background-color: #0b0b0b;
}
.setbody {
  position: absolute;
  width: 854px;
  height: 320px;
  top: 70px;
}
.routerviews {
  width: 100%;
  height: 480px;
}
/* 开始按钮的样式 */
.starting {
  position: absolute;
  right: 20px;
  width: 180px;
  height: 80px;
  font-size: 32px;
  text-align: center;
  line-height: 80px;
  background-color: #ff4646;
}

/* tips温馨提示的样式 */
.tips {
  font-size: 22px;
  position: absolute;
  width: 180px;
  height: 180px;
  overflow: hidden;
  /* background-color: yellow; */
  top: 20px;
  right: 20px;
}
.tips .warning {
  color: #f28e02;
}
/* 底部说明样式 */
.explain {
  width: 580px;
  height: 120px;
  position: absolute;
  bottom: 10px;
  left: 30px;
  font-size: 24px;
  line-height: 35px;
}
</style>

<!-- wifi列表页面 -->
<template>
  <div class="">
    <Headers>
      <div slot="center">WiFi设置</div>
    </Headers>
    <!-- 我是wifi页面 -->
    <div class="pagebody">
      <div @click="wificlick" class="wifiitem" v-for="(item, index) in wifiList" :key="index">
        <div>
          {{ item.name }}
        </div>
        <div class="conected" v-if="index === connectIndex">已连接</div>
        <div v-if="item.clock" class="clock"></div>
        <div class="signal signal1" v-show="item.signal === 1"></div>
        <div class="signal signal2" v-show="item.signal === 2"></div>
        <div class="signal signal3" v-show="item.signal === 3"></div>
        <div class="signal signal4" v-show="item.signal === 4"></div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入头部组件
import Headers from "@/components/Header.vue"
export default {
  components: { Headers },
  data() {
    return {
      connectIndex: 1,
      wifiList: [
        {
          name: 'tft02',
          clock: true,
          signal: 1
        }, {
          name: 'PDCN',
          clock: true,
          signal: 2
        }, {
          name: '30-402',
          clock: true,
          signal: 4
        },
        {
          name: 'net_no',
          clock: true,
          signal: 3
        },
      ]

    };
  },
  computed: {},
  watch: {},
  methods: {
    wificlick(){
      this.$router.push('/wifipass')
    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.wifiitem {
  background-color: #1e1a0e;
  height: 80px;
  font-size: 32px;
  line-height: 80px;
  margin-bottom: 5px;
  position: relative;
  padding-left: 30px;
}

.conected {
  position: absolute;
  color: #ffffff;
  top: 0px;
  right: 155px;
}
.clock {
  position: absolute;
  width: 44px;
  height: 44px;
  top: 18px;
  right: 90px;
  background: url('../../../../assets/header_icon/lock.png') no-repeat center;
}
.signal {
  position: absolute;
  width: 44px;
  height: 44px;
  top: 18px;
  right: 30px;
}
.signal1{
  background: url('../../../../assets/header_icon/wifi1.png') no-repeat center;
}
.signal2{
  background: url('../../../../assets/header_icon/wifi2.png') no-repeat center;
}
.signal3{
  background: url('../../../../assets/header_icon/wifi3.png') no-repeat center;
}
.signal4{
  background: url('../../../../assets/header_icon/wifi4.png') no-repeat center;
}




</style>
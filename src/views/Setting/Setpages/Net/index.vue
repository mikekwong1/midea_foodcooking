<!-- 联网设置 -->
<template>
<div class='pagebody'>
  <div class="netitem" @click="setwifi" v-for="(item,index) in connectitem" :key="index">
    <div>{{item.attr}}</div>
    <div>{{item.value}}<span>></span></div>
  </div>
</div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      connectitem:[{
        attr:'设备网络连接',
        value:'未连接'
      },{
        attr:'手机安装美的美居APP',
        value:'下载美的美居APP'
      },{
        attr:'绑定设备',
        value:'未绑定'
      }]

    };
  },
  computed: {},
  watch: {},
  methods: {
    setwifi(){
      this.$router.push('/wifi')
    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.netitem{
  display: -webkit-flex;
  justify-content: space-between;
  height: 80px;
  font-size: 32px;
  line-height: 80px;
  margin-top: 10px;
  padding: 0 20px;
  background-color: #1E1A0E;
}

</style>
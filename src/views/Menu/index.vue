<!-- 菜单首页 -->
<template>
  <div>
    <!-- 导入头部 -->
    <Headers @changesty="changesty">
      <div slot="center">菜谱 | {{ msg1 }}/{{ msg2 }}</div>
    </Headers>
    <!-- 导入菜单页面 -->
    <router-view :imgsty="headsty" @headmsg="headmsg"></router-view>
  </div>
</template>

<script>
//导入头部组件
import Headers from '@/components/Header'
export default {
  components: { Headers },
  data() {
    return {
      headsty: false,
      msg1: null,
      msg2: null,
    };
  },
  computed: {},
  watch: {},
  methods: {
    changesty(msg) {
      this.headsty = msg
    },
    headmsg(msg1, msg2) {
      this.msg1 = msg1 + 1;
      this.msg2 = msg2;
    }
  },
  created() {

  },
  mounted() {
    
  }
}
</script>

<style lang='css' scoped>

</style>
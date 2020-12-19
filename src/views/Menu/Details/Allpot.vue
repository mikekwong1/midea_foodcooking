<!-- 一锅鲜页面 -->
<template>
  <div class="pagebody">
    <div class="potcontent">
      <span v-for="(item,index) in msg" :key="index">
        {{item}}
      </span>
    </div>
    <div class="starting btn1">
      称重
    </div>
    <div class="starting btn2">
      启动
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      msg:null,
    };
  },
  computed: {},
  watch: {},
  methods: {

  },
  created() {
    this.msg = this.$route.query.msg
  },
  mounted() {
    // console.log(this.msg)
  }
}
</script>

<style lang='css' scoped>
.potcontent{
  width: 550px;
  height: 300px;
  margin-top: 20px;
  margin-left: 30px;
  font-size: 26px;
  overflow: hidden;
}
.btn1{
  bottom: 110px;
}
.btn2{
  bottom: 20px;
}
</style>
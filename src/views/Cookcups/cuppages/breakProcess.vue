<!-- 开始烹饪页面 -->
<template>
  <div class="pagebody goingpage">
    <div class="goingtitle">
      <div v-for="(item, index) in headmsg" :key="index">
        <div class="subtitle">{{ item.title }}</div>
        <div class="subcontent">{{ item.subtitle }}</div>
      </div>
    </div>
    <img src="../img/Ahutang.png" class="curve" @click="tomenu"/>
    <div class="processty"><span v-for="(item, index) in process" class="processtxt" :key="item" :class="{active:index ===processindex}">{{item}}</span></div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      headmsg: [{ title: '细腻', subtitle: '口感' }, { title: '开启', subtitle: '保温（温度55℃）' }, { title: '60:00', subtitle: '剩余时间约' },],
      process: ['速热', '熬煮', '破壁', '精萃', '浓香'],
      processindex:1,

    };
  },
  computed: {},
  watch: {},
  methods: {
     tomenu(){
      // 跳转到菜谱页面
      this.$router.push('/menu')
    },
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.goingpage{
  background: #0b0b0b;
}
.goingtitle {
  /* 开始烹饪的body */
  height: 80px;
  width: 790px;
  margin-left: 32px;
  margin-top: 10px;
  background-color: #191208;
  display: -webkit-flex;
  -webkit-justify-content: space-around;
  text-align: center;
}
.curve{
  margin-left: 14px;
}
.processty{
  margin-top: 10px;
  font-size: 24px;
  color: #8A8A8F;
}
.subtitle{
  font-size: 28px;
  margin-top: 8px;

}
.subcontent{
  font-size: 14px;
  margin-top: 5px;
  
}
.processtxt:nth-child(1){
  margin-left: 60px;
  
}
.processtxt:nth-child(2){
  margin-left: 90px;
  
}
.processtxt:nth-child(3){
  margin-left: 80px;
  
}
.processtxt:nth-child(4){
  margin-left: 160px;
  
}
.processtxt:nth-child(5){
  margin-left: 60px;
  
}
.active{
  color: #F28E02;
}
</style>
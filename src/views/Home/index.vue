
<template>
  <!-- 首页页面 -->
  <div class="home">
    <!-- 导入头部组件 -->
    <div class="headbalck" v-if="cupIndex===3"></div>
    <Header v-else><div slot="center">{{cuptext}}</div></Header>
    <!-- 首页跳转到相应的页面 -->
    <router-view></router-view>
    <!-- 没有杯子显示的页面或者判断不出两种杯子的页面 -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
// 导入vuex什么杯子
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: { Header },
  computed: {
    ...mapState(['cupIndex']),
    cuptext() {
      if (this.cupIndex === 0) {
        return "烹饪杯";
      } else if (this.cupIndex === 1) {
        return "破壁杯"
      } else if (this.cupIndex === 2) {
        return "料理杯"
      }
    }
  },
  data() {
    return {
    }
  },

  methods: {

  },
}
</script>
<style lang="css" scoped>
.headbalck{
  position: absolute;
  top: 0;
  left: 0;
  width:854px;
  height: 90px;
  background-color: #0b0b0b;
}
</style>

<!-- 设置页面 -->
<template>
  <div class="">
    <!-- 导入顶部组件 -->
    <Headers><div slot='center'>设置</div></Headers>
    <!-- 我是设置页面下面有四个小页面 -->
    <div class="pagebody">
      <div class="Setindex-nav">
        <router-link
          tag="div"
          class="Setindex-button"
          v-for="(item, index) in setNav"
          :key="index"
          :to="item.path"
          @click="navbutton(index)"
        >
          {{ item.name }}
        </router-link>
        <div class="Setindex-line line-one" ></div>
        <div class="Setindex-line line-two" ></div>
        <div class="Setindex-line line-three" ></div>
      </div>
    <router-view class="setview"></router-view>

    </div>
  </div>
</template>

<script>
import Headers from '@/components/Header.vue'
export default {
  components: { Headers },
  data() {
    return {
      setNav: [{ path: '/set', name: "联网" }, { path: '/set/bright', name: "显示" }, { path: '/set/voice', name: "声音" }, { path: '/set/sys', name: "系统" },],
      nav_active: 0,

    };
  },
  computed: {},
  watch: {},
  methods: {

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.Setindex-nav {
  display: -webkit-flex;
  flex-direction: row;
  justify-content: space-around;
  height: 70px;
  position: relative;
}
.Setindex-button {
  flex: 1;
  height: 70px;
  width: 170px;
  line-height: 70px;
  font-size: 32px;
  text-align: center;
  color: #5f584d;
  background: #1b1001;
  box-sizing: border-box;
}
.Setindex-button.router-link-exact-active {
  color: #ffffff;
  opacity:1;
}
.Setindex-line{
  width: 3px;
  height: 100%;
  background-size:5px 70px;
  background: url('./img/Line3.png') no-repeat center;
  position: absolute;
  top: 0;
}
.line-one{
  left: 210px;
}
.line-two{
  left: 425px;
}
.line-three{
  left: 640px;
}
</style>
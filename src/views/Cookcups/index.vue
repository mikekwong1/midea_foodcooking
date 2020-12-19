<!-- 破壁杯。果汁杯。烹饪杯 -->
<template>
  <div class="pagebody">
    <!-- 导入各种杯子,把cupImg和cuptype传进去 -->
    <Cups class="break_body" :cuptype="cupIndex" :cupImg="cupImg"></Cups>
  </div>
</template>

<script>
// 导入各种杯子组件
import Cups from '@/components/Cups'
import { mapState } from 'vuex';
// import { mixining } from '@/mixin/index.js';
export default {
  components: { Cups },
  data() {
    return {
      breakimg: [
        // 破壁杯，进入口味页面
        { mark: 0, url: require('./img/foods.png'), path: '/home/texture' },
        { mark: 1, url: require('./img/fmilk.png'), path: '/home/texture' },
        { mark: 2, url: require('./img/smilk.png'), path: '/home/texture' },
        { mark: 3, url: require('./img/nutri.png'), path: '/home/texture' },
        { mark: 4, url: require('./img/sdrink.png'), path: '/home/texture' },
        { mark: 5, url: require('./img/corn.png'), path: '/home/texture' },
        { mark: 6, url: require('./img/vege.png'), path: '/home/texture' },
        { mark: 7, url: require('./img/DIY.png'), path: '/DIY' },
      ],
      juiceimg: [
        { mark: 0, url: require('./img/vege.png'), path: '/DIY' },
        { mark: 1, url: require('./img/sorbet.png'), path: '/DIY' },
        { mark: 2, url: require('./img/grains.png'), path: '/DIY' },
        { mark: 3, url: require('./img/DIY.png'), path: '/DIY' },
      ],
      cookimg: [
        { mark: 0, url: require('./img/c_menu.png'), path: '/menu' },
        { mark: 1, url: require('./img/c_DIY.png'), path: '/DIY' },
        { mark: 2, url: require('./img/c_mix.png'), path: '/mixflour' },
        { mark: 3, url: require('./img/c_wrash.png'), path: '/startUp/wash' },
        { mark: 4, url: require('./img/c_set.png'), path: '/set' },
      ],
      cutcupimg: [
        { mark: 0, url: require('./img/cutimg.png'), name: '切丝', path: '/startUp/shred' },
        { mark: 1, url: require('./img/cutimg.png'), name: '切片', path: '/startUp/section' },
        { mark: 2, url: require('./img/cutimg.png'), name: '绞肉', path: '/startUp/mince' },
        { mark: 3, url: require('./img/cutimg.png'), name: 'DIY', path: '/DIY' },
      ],
      momoimg: [
        { mark: 0, url: require('./img/dadacup.png'), path: 5 },
        { mark: 1, url: require('./img/momocup.png'), path: '/DIY' },
      ]
    };
  },
  // mixins: [mixining],
  computed: {
    ...mapState(['cupIndex']),
    cupImg() {
      // 根据不同的index生成不同的img数组
      switch (this.cupIndex) {
        case 0:
          return this.cookimg;
        case 1:
          return this.breakimg;
        case 2:
          // 料理杯
          return this.cutcupimg;
        case 3:
          return this.momoimg;
        case 5:
          return this.juiceimg;
      }
    }
  },
  watch: {

  },
  methods: {
    toReady(index) {
      this.pushing('/home/ready',true)
    },
    juiceclick(index) {
      this.focus_index.index = index;
    }
  },
  created() {


  },
  mounted() {
  }

}
</script>

<style lang='css' scoped>
.break_body {
  display: -webkit-flex;
  height: 390px;
  -webkit-justify-content: space-around;
  -webkit-flex-wrap: wrap;
  -webkit-align-content: space-around;
  /* background: black; */
}
.breakitem {
  position: relative;
}
.cookitem {
  position: relative;
}
</style>
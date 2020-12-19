<!-- 和面 -->
<template>
  <div class="">
    <Headers><div slot="center">和面</div> </Headers>
    <div class="pagebody">
      <div class="noodles">
        <div
          v-for="(item, index) in noodles"
          :key="index"
          @click="tomixruning(index, item.path)"
          class="nooditem"
          :class="{ active: index === focus_index.index}"
        >
          <img :src="item.src" draggable="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入mixin组件
import { mixinhome } from '@/mixin'
// 导入头部组件
import Headers from "@/components/Header.vue"
export default {
  components: { Headers },
  mixins: [mixinhome],
  data() {
    return {
      //    lflow:0,
      //  mflow:1,
      //  hflow:2,
      noodles: [
        // 低
        {
          src: require('../img/mc_l.png'),
          path: '/startUp/lflow'
        },
        // 中
        {
          src: require('../img/mc_m.png'),
          path: '/startUp/mflow'

        },
        // 高
        {
          src: require('../img/mc_h.png'),
          path: '/startUp/hflow'
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    tomixruning(index, path) {
      this.focus_index.index = index;
      this.pushing(path,true)
    }

  },
  created() {
    this.initfocus(3)
  },
  mounted() {

  },
  beforeDestroy(){

  }
}
</script>

<style lang='css' scoped>
.noodles {
  width: 854px;
  height: 325px;
  margin-top: 20px;
  display: -webkit-flex;
  -webkit-justify-content: space-around;
}
.nooditem{
  position: relative;
}
.active::after{
  content: '';
  display: block;
  width: 250px;
  height: 325px;
  top: -1px;
  left: -1px;
  position:absolute;
  border: 2px solid #ca7903;

}
</style>
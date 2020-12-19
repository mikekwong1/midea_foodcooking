<!-- 各种杯子组件 -->
<template>
  <!-- 根据杯子类型加不同的样式 -->
  <div>
    <div
      v-for="(item, index) in cupImg"
      :key="index"
      class="breakitem"
      :class="{
        momo: cuptype === 3,
        cookactive: focus_index.index === index && cuptype === 0,
        breakactive: focus_index.index === index && (cuptype === 1||cuptype === 5),
        cutcupactive: focus_index.index === index && cuptype === 2,
      }"
      @click="itemClick(index, item.path)"
    >
      <span v-if="item.name" class="text">{{ item.name }}</span>
      <img :src="item.url" draggable="false" />
    </div>
    <div v-if="cuptype === 0" style="width: 267px"></div>
  </div>
</template>

<script>

// 导入mixin插件
import { mixinhome } from '@/mixin/index.js'
export default {
  // 父组件传入图片和杯子类型
  mixins: [mixinhome],
  props: ['cupImg', 'cuptype'],
  components: {},
  data() {
    return {
      // 将传进来的字符串和索引对应起来 
    };
  },
  computed: {},
  watch: {
    cuptype(msg) {
      // cuptype发生改变调用initfocus方法
      this.initfocus(this.cupImg)
    }
  },
  methods: {
    itemClick(index, path) {
      // 元素发生了点击
      // console.log('元素发生了点击',index);
      this.focus_index.index = index;
      // console.log('aaaaaaaaaaaaaaaaaa')
      if (typeof path === 'number') {
        this.$store.commit('changeCup', path)
      } else {
        //延时执行
        this.pushing(path,true)
      }
    }
  },
  created() {

  },
  mounted() {
    this.initfocus(this.cupImg)
  }
}
</script>

<style lang='css' scoped>
/* 在这里定义各种样式 */
.breakitem {
  position: relative;
}
.text {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
}
.momo {
  -webkit-transform: translateY(-40px);
}
.cookactive::after,
.breakactive::after,
.cutcupactive::after {
  /* 烹饪杯 */
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 257px;
  height: 175px;
  border: 2px solid #ca7903;
}
.breakactive::after {
  /* 破壁杯 */
  width: 190px;
  height: 169px;
}
.cutcupactive::after {
  /* 切丝切片杯 */
  width: 186px;
  height: 186px;
  border: none;
  background: url("../../assets/cutactive.png") no-repeat center;
}
</style>
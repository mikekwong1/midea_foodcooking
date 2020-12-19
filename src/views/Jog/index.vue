<!-- 点动页面 -->
<template>

<div>
<Headers>
  <div slot = 'center'>点动</div>
</Headers>
<div class="pagebody">
  <img class="jogpng" src="./jog.png" draggable="false">

</div>

  
</div>
</template>

<script>
//导入头部组件
import Headers from '@/components/Header.vue'

export default {

  components: {Headers},
  data() {
    return {

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
.jogpng{
  position: absolute;
  top: 30px;
  left: 50%;
  -webkit-transform: translateX(-50%);
}

</style>
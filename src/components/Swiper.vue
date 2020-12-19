<!-- vue滑动条 -->
<template>
  <div ref="wrap" @mousedown.stop="m_down">
    <div class="move_ele" ref="move_ele">
      <!-- haaaaaaaaaaaaaaaaaa -->
      <slot name="content">
        <!-- slot就是长长的列表 -->
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isdown: false,
      transY: 0,
      downevent: null,


    };
  },
  computed: {},
  watch: {},
  methods: {
    m_down(e) {
      this.isdown = true;
      console.log('downmsg------------------------------------------')
      this.downevent = e;
      //获取偏移transx
      this.$refs.move_ele.style['transition'] = 'none';

      var styles = getComputedStyle(this.$refs.move_ele, '-webkit-transform');
      var stylesArr = styles['-webkit-transform'].split(',');
      this.transY = parseInt(stylesArr[5]);
      // console.log(this.transY);
      window.addEventListener('mousemove', this.m_move);
      window.addEventListener('mouseup', this.m_up);
    },
    m_move(e) {
      if (!this.isdown) return;
      var yy = e.pageY - this.downevent.pageY;
      var endstyle = this.transY + yy;
      console.log(endstyle);
      // console.log(this.$refs.move_ele)
      this.$refs.move_ele.style['-webkit-transform'] = 'translateY(' + endstyle + 'px)'
    },
    m_up(e) {
      this.isdown = false;
      // 回到该在的位置
      // 计算终点位置
      var yy = e.pageY - this.downevent.pageY;
      var endstyle = this.transY + yy;
      if (endstyle < 0)
        endstyle = 0;
      this.$refs.move_ele.style['-webkit-transform'] = 'translateY(' + endstyle + 'px)'
      this.$refs.move_ele.style['transition'] = '-webkit-transform 0.7s';






      window.removeEventListener('mousemove', this.m_move);
      window.removeEventListener('mouseup', this.m_up);
    }
  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.move_ele {
  -webkit-transform: translateY(0px);
}
</style>
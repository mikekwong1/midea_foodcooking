<!--  -->
<template>
  <div class="slidebar">
    <!-- 显示部分 -->
    <div class="slider" ref="dragdiv">
      <!-- 每一个条条部分 -->
      <div
        class="slider-bar"
        :style="{ width: width + 'px' }"
        v-for="(item, index) in 10"
        :key="index"
        ref="line"
        :class="{ active: index < msg ,nthlast:index === 9}"
      ></div>
      <!-- <div id="sliderbar"></div> -->
      <!-- 大圆圈部分 -->
      <div ref="v_btn" class="mybtn"></div>
    </div>

    <!-- 覆盖触摸部分 -->
    <div
      class="bar-touch"
      :style="{ width: width * 10 + 'px' }"
      @mousedown="m_down"
    ></div>
  </div>
</template>

<script>
export default {
  props: ['speed', 'type', 'width'],
  components: {},
  data() {
    return {
      Down_e: null,
      transX: null,
      msg: 0,
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 鼠标点击的时候获取点击的位置
    m_down(e) {
      var xx = e.offsetX;
      // console.log(e.target)

      this.msg = (Math.round(xx / this.width))
      console.log(Math.round(this.msg * this.width-13))
      this.$refs.v_btn.style['-webkit-transform'] = 'translateX(' + parseInt(this.msg * this.width-13) + 'px)'

      var styles = getComputedStyle(this.$refs.v_btn);
      var stylesArr = styles['-webkit-transform'].split(',')
      this.transX = parseInt(stylesArr[4])
      this.Down_e = e;
      window.addEventListener('mousemove', this.m_move);
      window.addEventListener('mouseup', this.m_up);
    },
    m_move(e) {
      // 计算鼠标移动的距离
      var moveX = e.pageX - this.Down_e.pageX;
      var xx = moveX + this.transX;
      // 做一个边界处理
      // xx = xx<-20?-20:xx;
      //   xx = xx > this.$refs.line.clientWidth ? this.$refs.line.clientWidth : xx;
      // xx代表鼠标移动的距离
      this.msg = (Math.round(xx / this.width))
      console.log(this.msg)
      this.msg = this.msg<0?0:this.msg;
      this.msg = this.msg>10?10:this.msg
      this.$refs.v_btn.style['-webkit-transform'] = 'translateX(' + parseInt(this.msg * this.width-13)  + 'px)'
      //   this.$refs.lineStyle.style.width = xx + 12 + 'px';
    },
    m_up(e) {
      console.log(this.msg)
      window.removeEventListener('mousemove', this.m_move)
      window.removeEventListener('mouseup', this.m_up)
    },
    knobing(obj){
      // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      	var msg = 0;
			if (obj.type === 3) {
				// console.log("步退");
				msg = -obj.value;
			} else if (obj.type === 4) {
				// console.log("步进");
				msg = obj.value;
      }
      this.msg+=msg;
      console.log(this.msg)
      this.msg = this.msg<0?0:this.msg;
      this.msg = this.msg>10?10:this.msg
      //调整圆圈的位置
      this.$refs.v_btn.style['-webkit-transform'] = 'translateX(' + parseInt(this.msg * this.width-13)  + 'px)';
    }
  },
  mounted() {
    //监听旋钮旋转的事件
    this.Event.addEventListener('spinbtn',this.knobing)
 
  },
  beforeDestroy(){
    this.Event.removeEventListener('spinbtn',this.knobing)


  }
}
</script>

<style lang='css' scoped>
.slidebar {
  position: relative;
}
.slider {
  padding-top: 10px;
  height: 13px;
  position: relative;
  /* z-index: 2; */
  display: -webkit-flex;
}
.line {
  position: absolute;
  width: 95%;
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
}

.slider-bar {
  /* 每一条部分 */
  position: relative;
  height: 3px;
  background-color: #fff;
}
.nthlast::after{
  position: absolute;
  content: "";
  display: block;
  border-radius: 50%;
  width: 9px;
  height: 9px;
  top: -3px;
  right: -7px;
  background-color: #fff;
}
.slider-bar::before {
  /* 每一条结尾 */
  position: absolute;
  content: "";
  display: block;
  border-radius: 50%;
  width: 9px;
  height: 9px;
  top: -3px;
  background-color: #fff;
}
.slider-bar.active {
  background-color: #f28e02;
}
.active.slider-bar::before {
  position: absolute;
  content: "";
  display: block;
  border-radius: 50%;
  width: 9px;
  height: 9px;
  top: -3px;
  background-color: #f28e02;
}
.mybtn {
  position: absolute;
  top: -3px;
  left: 0;
  transform: translateX(-15px);
  width: 30px;
  height: 30px;
  /* top: 15px; */
  border-radius: 50%;
  background-color: #f28e02;
}
.bar-touch {
  position: absolute;
  /* background-color: black; */
  height: 30px;
  top: 0;
  left: 0;
}
</style>
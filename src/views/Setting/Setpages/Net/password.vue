<!-- 输入发页面 -->
<template>
  <div>
    <Headers></Headers>
    <div class="pagebody">
      <input class="inputele" ref="inputele" type="text" v-model="psd" />
      <div class="confirm">确认</div>
      <Keyboard @input="input"></Keyboard>
    </div>
  </div>
</template>

<script>
// 引入头部组件
import Headers from '@/components/Header.vue';
//引入输入法组件
import Keyboard from "@/components/Keyboard.vue"

export default {
  components: { Headers, Keyboard },
  data() {
    return {
      psd: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    input(val) {
      if (val === 'back') {
       this.psd = this.psd.substr(0, this.psd.length - 1);
      } else if(val === 'clear'){
        this.psd = ''
      }else{
        this.psd+=val;
      }
      this.$refs.inputele.focus()

    }

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang='css' scoped>
.inputele{
  border: 2px solid #F28E02;
  width: 600px;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  font-size: 32px;
  position: absolute;
  top: 60px;
  left: 30px;
}
.confirm{
  position: absolute;
  top: 60px;
  right: 40px;
  background-color: #F28E02;
  text-align: center;
  width: 120px;
  height: 60px;
  font-size: 32px;
  line-height: 60px;
}
</style>
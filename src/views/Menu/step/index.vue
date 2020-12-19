<!-- 步骤页面 -->
<template>
  <div>
    <!-- 我是步骤页面 -->
    <Headers><div slot="center">木瓜</div></Headers>
    <!-- 图文展示 -->
    <div class="pagebody">
      <template v-for="(item, index) in allstep">
        <div :key="index" v-if="index === stepindex">
          <div class="imgsty">
            <img :src="item.photoUrl" draggable="false" />
          </div>
          <div class="describe">{{ item.description }}</div>
        </div>
      </template>
      <div class="starting btn3" v-if="btnStr[2]">{{ btnStr[2] }}</div>
      <div class="starting btn2" @click="next(-1)">{{ btnStr[1] }}</div>
      <div class="starting btn1" @click="next(1)">{{ btnStr[0] }}</div>
    </div>
  </div>
</template>

<script>
import Headers from '@/components/Header.vue'
import { mapState } from 'vuex'
export default {
  components: { Headers },
  data() {
    return {
      allstep: [],
      stepindex: 1,
      stepBtn: { next: '下一步', weight: '称重', forward: '上一步', start: '启动' }
    };
  },
  computed: {
    ...mapState(['cookingID']),
    type() {
      var nowstep = this.allstep[this.stepindex - 1];
      return nowstep.type;
    },
    btnStr() {
      var arrinit = [];
      //最下面的按钮，下一步或者是启动按钮
      arrinit.push(this.type === 3 ? this.stepBtn.start : this.stepBtn.next);
      //中间的按钮，称重或者上一步按钮若果是第一步并且
      if (this.stepindex === 1 && this.type === 1) {
        arrinit.push(this.stepBtn.weight);
      } else {
        arrinit.push(this.stepBtn.forward);
      }
      if (this.stepindex !== 1 && this.type === 1) {
        arrinit.push(this.stepBtn.weight);
      }
      return arrinit;
    },
  },
  watch: {},
  methods: {
    next(msg) {
      if(this.type===1&&msg===-1){
        console.log('去称重页面');
        this.$router.push('/weight')
        return;
      }
      if(this.type===3&&msg===1){
        console.log('去启动页面')
        this.$router.push({
          path:'/DIY',
          query:{
            name:'芋泥波波鲜奶',
            lock:true,
            trun:3,
            temp:150,
            time:4200,
          }
        })
        return;
      }
      this.stepindex += msg;
      this.stepindex = this.stepindex>this.allstep.length-1?this.allstep.length-1:this.stepindex;
      this.stepindex = this.stepindex<0?0:this.stepindex;
    }
  },
  created() {
    console.log(this.cookingID)
    var msg = sessionStorage.getItem(this.cookingID)
    console.log()
    this.allstep = JSON.parse(msg)?.steps||[]



    // 将数据取出来
    // var stepstr = sessionStorage.getItem('step');
    // this.allstep = JSON.parse(stepstr)
  },
  mounted() {
    // 过去vuex中的数据

  }
}
</script>

<style lang='css' scoped>
.imgsty {
  width: 600px;
  background-color: #221a0e;
  margin-left: 10px;
  margin-top: 8px;
}
.btn3 {
  bottom: 200px;
}
.btn2 {
  bottom: 110px;
}
.btn1 {
  bottom: 20px;
}
.describe {
  width: 600px;
  height: 120px;
  font-size: 26px;
  line-height: 30px;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
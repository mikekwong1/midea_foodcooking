<!-- 系统设置 -->
<template>
  <div class="setbody">
    <p class="xitong-p" ><span>系统版本号</span> <span class="right" >Midea-CCJ-5-JCCICF0-V1.0.11</span> </p>
    <p class="xitong-p"><span>设备ID</span><span class="right" >000023111640005001981911000080</span></p>
    <div class="sysitem">
      <div v-for="(item, index) in sysitem" :key="index" class="lineitem" @click="tangchu(index)" >
        <span>{{ item.name }}</span>
        <span>></span>
      </div>
    </div>
    <Modal v-show="showModal" v-on:closeme="closeme" ></Modal>
  </div>
</template>

<script>
import Modal from '../../../components/Modal'
export default {
  components: {Modal},
  data() {
    return {
      sysitem: [{
        name: '快速指引',url:''
      }, {
        name: '食谱升级',url:''
      }, {
        name: '高原模式',url:''
      }, {
        name: '系统升级',url:''
      }, {
        name: '恢复出厂设置',url:''
      }, {
        name: '关机',url:''
      },],
      showModal:false,
    };
  },
  computed: {},
  watch: {},
  methods: {
    tangchu(e){
      if(e == 0){
        this.$router.push('/operation')
      } if( e == 2){
        this.$router.push('/highland')
      }else if(e==1){
        this.$router.push('/footup')
        // this.showModal = !this.showModal
      }else if(e==3) {
        this.$router.push('/systemup')
        // this.showModal = !this.showModal
      }else if(e==4) {
        this.$router.push('/factory')
        // this.showModal = !this.showModal
      } else{
        return;
      }
    },
    closeme:function(){
      this.showModal = !this.showModal;
    },
  },
  created() {

  },
  mounted() {
    
  }
}
</script>

<style lang='css' scoped>
.sysitem {
  display: -webkit-flex;
  -webkit-flex-wrap: wrap;
  -webkit-justify-content: space-around;
}
.lineitem{
  width: 390px;
  height: 60px;
  font-size: 32px;
  line-height: 60px;
  background-color: #1E1A0E;
  margin-top: 20px;
  padding: 0px 10px;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
}
.right{
  float: right;
}
.xitong-p{
  padding-top: 10px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
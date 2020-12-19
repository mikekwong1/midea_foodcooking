<!-- 开始和面页面 -->

<template>
  <!-- 开始··高温洗页面 -->
  <div class="startmix" v-if="wholemsg">
    <Headers
      ><div slot="center">{{ wholemsg.title }}</div></Headers
    >
    <div class="pagebody">
      <img :src="wholemsg.src" draggable="false" class="mixinimg" />
      <div class="illustrate"></div>
      <div class="tips">
        <p class="warning">温馨提示：</p>
        <div>{{ wholemsg.tips }}</div>
      </div>
      <div class="starting btn1">启动</div>
      <div class="explain">
        <div>食材及比例：</div>

        {{ wholemsg.ingredients }}
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "@/components/Header.vue";
import Swiper from '@/components/Swiper.vue'

export default {
  components: { Headers, Swiper },
  data() {
    return {
      // 传进来的字符串
      paramsstr: '',
      // 传进来的字符串和index对应起来
      alignindex: {
        lflow: 0,
        mflow: 1,
        hflow: 2,
        wash: 3,
        shred: 4,
        section: 5,
        mince: 6
      },
      showWho: [
        {
          title: '底筋面点',
          src: require('../img/zlflow.png'),
          ingredients: '150克低筋面粉，150克（3个）鸡蛋，50克食用油，50克白砂糖，100克牛奶，15克泡打粉。',
          tips: '若增加面粉量，需同比例增加其他食材分量。',
        },
        {
          title: '中筋面点',
          src: require('../img/zmflow.png'),
          ingredients: '400克中筋面粉，190-200克水。',
          tips: '面粉含量最好在200克-400克的范围哦。',
        },
        {
          title: '高筋面点',
          src: require('../img/zhflow.png'),
          ingredients: '250克高筋面粉，90克水，35克黄油，25克（1/2）鸡蛋，3克酵母，4克盐，25克糖，10克奶粉。',
          tips: '可根据个人喜好适当调整盐、糖、奶粉分量。',
        },
        {
          title: '高温洗',
          src: require('../img/zwash.png'),
          tips: '若高温清洗后锅内仍有少量油渍残留，可自行加入适量洗洁精清洗',
          ingredients: '锅中加入800克水',
        },
        {
          title: '切丝',
          src: require('../img/zshred.png'),
          tips: '为了您的安全，当食物较小或较少时，请使用堆料筒辅助操作',
          warn: '操作指引',
          ingredients: '请在刀盘上安装切丝刀，合上盖子，将食材放入进料口',
        },
        {
          title: '切片',
          src: require('../img/zsection.png'),
          tips: '为了您的安全，当食物较小或较少时，请使用堆料筒辅助操作',
          warn: '操作指引',
          ingredients: '请在刀盘上安装切片刀，合上盖子，将食材放入进料口',
        },
        {
          title: '绞肉',
          src: require('../img/zmince.png'),
          tips: '为防止锅体晃动，可将食材切小块放入杯中',
          warn: '操作指引',
          ingredients: '请取下刀盘，将食物放入杯中，合上杯盖，用堆料筒堵住进料口',
        },
      ]
    };
  },
  computed: {
    wholemsg() {
      var index = this.alignindex[this.paramsstr]
      return this.showWho[index]
    }

  },
  watch: {},
  methods: {

  },
  created() {

  },
  mounted() {
    // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
    this.paramsstr = this.$route.params.type;

  }
}
</script>

<style lang='css' scoped>
.mixinimg {
  margin-top: 20px;
  margin-left: 20px;
}
.btn1 {
  bottom: 20px;
}
</style>
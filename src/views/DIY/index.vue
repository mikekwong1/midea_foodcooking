<!--  -->
<template>
  <div>
    <Headers
      ><div slot="center">{{ title }}</div></Headers
    >
    <div class="pagebody">
      <div v-if="!lock">
        <div class="mytips" v-if="!msg">
          <div v-if="!DIYrunning">选择功能设置参数值</div>
          <div v-else>烹饪中</div>
        </div>
        <div class="mytips" v-else>{{ msg }}</div>
      </div>

      <div class="diywrap">
        <Trun
          class="citem"
          @click.native="myfocus('trun')"
          ref="trun"
          :activemsg="activemsg"
          :turnnum="turnnum"
          :class="{ lock: lock }"
        ></Trun>
        <Temp
          class="citem"
          @click.native="myfocus('temp')"
          ref="temp"
          :activemsg="activemsg"
          :tempnum="tempnum"
          :class="{ lock: lock }"
        ></Temp>
        <Time
          class="citem"
          @click.native="
            myfocus('time');
          "
          @isswitch="isswitch"
          ref="time"
          :activemsg="activemsg"
          :setTimes="timenum"
          :class="{ lock: lock }"
        ></Time>
      </div>
      <div v-if="!lock">
        <div class="direction" v-if="direct" @click="direct = !direct">
          <span class="direct-icon"></span>切为正转
        </div>
        <div class="direction" v-else @click="direct = !direct">
          <span class="direct-icon dire-false"></span>切为反转
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 导入头部组将
import Headers from '@/components/Header.vue'
// 导入转速，温度，时间等组件
import Trun from '@/components/Circles/Turn.vue'
import Temp from '@/components/Circles/Temp.vue'
import Time from '@/components/Circles/Time.vue'
// 导入完成组件
// import Complet from '@/components/Circles/Time.vue';
// 导入时间格式化js;
import { changTime } from '@/lib/util/fomat.js';
let fivetimesindex = 1;
export default {
  components: { Headers, Trun, Temp, Time },
  data() {
    return {
      title: 'DIY',
      lock: false,
      //记录背景颜色是哪个
      activemsg: -1,
      //记录温度相关的
      tempcontent: ["-"],
      tempindex: 0,
      // 时间相关的
      setTimes: 0,
      // 转速相关
      turnindex: 0,
      turncontent: [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 7, 8, 9, "H"],
      // 记录显示的字符串
      msg: null,
      //电机转动方向
      direct: true,
      //锁定状态
      fixedparams: {
        runing: false,
        temp: 0,
        turn: 0,
        time: 0
      },
      //diy是不是正在运行中
      DIYrunning: false,
      //记录倒计时还是正向计时
      counting: -1,

    };
  },
  computed: {
    turnnum() {
      if (this.lock) {
        return this.fixedparams.turn;
      } else {
        return this.turncontent[this.turnindex];
      }
    },
    tempnum() {
      if (this.lock) {
        return this.fixedparams.temp;
      } else {
        return this.tempcontent[this.tempindex]
      }
    },
    timenum() {
      if (this.lock) {
        return this.fixedparams.time;
      } else {
        return this.setTimes;
      }

    }
  },
  watch: {},
  methods: {
    Interval() {
      fivetimesindex++;
      if (fivetimesindex > 5) {
        fivetimesindex = 1;
        // console.log('定时器申请成功')
        if (this.lock) {
          // 让时间减减
          this.fixedparams.time--;
        } else {
          // console.log('我是自定义页面的定时器')
          if (this.DIYrunning) {
            //如果diy是running
            this.setTimes += this.counting;
          }
        }
      }
    },
    isswitch(flag) {
      // 是否取消开关
      if (this.lock) {
        if (this.fixedparams.runing) {
          this.fixedparams.runing = false;
          this.Event.removeEventListener('setInterval', this.Interval)
        } else {
          this.fixedparams.runing = true;
          this.Event.removeEventListener('setInterval', this.Interval)
          this.Event.addEventListener('setInterval', this.Interval)
        }
      } else {
        if (this.DIYrunning) {
          this.DIYrunning = false;
          this.Event.removeEventListener('setInterval', this.Interval)
        } else {
          // 如果setTimes小于零
          if (this.setTimes <= 0) {
            this.counting = 1;
          }
          this.DIYrunning = true;
          this.Event.removeEventListener('setInterval', this.Interval)
          this.Event.addEventListener('setInterval', this.Interval)
        }
      }
    },
    myfocus(msg) {
      this.activemsg = msg;
    },
    konbing(obj) {
      var msg = 0;
      if(obj?.type===3){
        msg = obj?.value;
      }else if(obj?.type === 4){
        msg = -obj?.value;
      }
      console.log(msg)
      //锁定状态下return
      if (this.lock) return;
      //没选中return
      if (this.activemsg === -1) return;
      // 根据msg修改对应的值
      if (this.activemsg === 'trun') {
        this.turnindex += msg
        if (this.turnindex < 0) this.turnindex = 0;
        if (this.turnindex > 13) this.turnindex = 13;
        if (this.turnindex > 8) {
          if (this.setTimes > 180) {
            this.setTimes = 180;
            this.err();
            this.msg = "转速大于5，时间最多为三分钟";
          }
        }
      } else if (this.activemsg === 'time') {
        // 修改counting为-1
        this.counting = -1;
        this.setTimes = changTime(this.setTimes, msg);
        if (this.setTimes > 180) {
          if (this.turnindex > 8) {
            this.turnindex = 8;
            this.err();
            this.msg = "时间超过3分钟，最高5挡";
          }
        }
      } else if (this.activemsg === 'temp') {
        this.tempindex += msg;
        this.tempindex = this.tempindex < 0 ? 0 : this.tempindex;
        this.tempindex = this.tempindex > 27 ? 27 : this.tempindex;
      }
      if (this.tempindex > 7) {
        if (this.turnindex > 5) {
          this.turnindex = 5;
          this.err();
          this.msg = "温度大于60，最高2.5挡";
        }
      }
    },
    err() {
      if (this.msg) return;
      setTimeout(() => {
        this.msg = null;
      }, 2000)
    },
    isLock() {
      // 从其他页面跳转过来
      if (this.$route.query.hasOwnProperty('lock') && this.$route.query.lock) {
        // console.log(this.$route.query)
        var { name, lock, trun, temp, time } = this.$route.query;
        this.title = name;
        this.lock = lock;
        // console.log(time)
        this.fixedparams.temp = temp;
        this.fixedparams.time = time;
        this.fixedparams.turn = trun;
        this.fixedparams.runing = true; 
      }
    }
  },
  created() {
    var m = 30;
    for (var i = 0; i < 27; i++) {
      this.tempcontent.push(m);
      m += 5;
    }
  },
  mounted() {
    this.isLock();
    //监听微动的函数
    this.Event.addEventListener('spinbtn', this.konbing)
    //监听确认按键的函数
    this.Event.addEventListener('setInterval', this.Interval)
  },
  beforeDestroy() {
    this.Event.removeEventListener('spinbtn', this.konbing)
    this.Event.removeEventListener('setInterval', this.Interval)
  },
  beforeRouteLeave(to, from, next) {
    //判断是不是正在运行中，如果正在运行中，不让跳转路由
    if (this.fixedparams.runing || this.DIYrunning) {
      next(false);
    } else {
      next();
    }
  }
}
</script>

<style lang='css' scoped>
.mytips {
  position: absolute;
  text-align: center;
  font-size: 24px;
  width: 854px;
  top: 20px;
}
.diywrap {
  display: -webkit-flex;
  margin-top: 60px;
  height: 250px;
  width: 854px;
  -webkit-justify-content: space-around;
}
.direction {
  height: 36px;
  line-height: 36px;
  font-size: 24px;
  position: absolute;
  left: 80px;
  bottom: 30px;
  /* margin-left: 80px; */
  /* margin-top: 10px; */
}
.direct-icon {
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url(../../assets/dire-true.png) no-repeat center;
  vertical-align: middle;
}
.dire-false {
  background: url(../../assets/dire-false.png) no-repeat center;
}
.lock {
  background: url("../../assets/focus.png") no-repeat center;
  color: #ffa20d;
}
</style>
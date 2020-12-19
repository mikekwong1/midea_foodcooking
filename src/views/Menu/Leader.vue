<!-- 菜谱 -->
<template>
  <div class="pagebody">
    <div class="navbar">
      <!-- 点击切换的部分 -->
      <!--  -->
      <div
        v-for="(item, index) in cooktitles"
        class="navitem"
        :class="{ activetxt: index === activeline }"
        :key="index"
        @click="itemclick(item.code, index)"
      >
        <div :class="{ activeline: index === activeline }"></div>
        {{ item.title }}
      </div>
    </div>
    <!-- 触摸部分 -->
    <div class="wrap-touch" ref="touch" @mousedown="m_down">
      <!-- 主体部分 -->
      <div
        class="menu-simplify"
        :style="'width:' + menu_pages + '00%;'"
        ref="move_wraper"
      >
        <!-- 分页部分 -->
        <!-- 以文字的方式展示 -->
        <template v-if="!imgsty">
          <div
            class="colomstext"
            v-for="(arrs, indez) in menudata"
            :key="indez"
          >
            <div
              v-for="(item, index) in arrs"
              :key="index"
              class="simp-item"
              :class="{
                textfocus: item.index === focusmsg.index,
              }"
              @click="simpclick(item.recipeCode, item.index)"
            >
              {{ item.recipeName }}
              <div class="icon" v-if="item"></div>
            </div>
          </div>
        </template>
        <template v-if="imgsty">
          <div class="pageimg" v-for="(arrs, index) in menudata" :key="index">
            <div
              v-for="(item, index) in arrs"
              :key="index"
              @click="simpclick(item.recipeCode, item.index)"
              class="img-item"
              :class="{
                imgfocus: item.index === focusmsg.index,
              }"
            >
              <!-- {{PCBsrc(item.recipeCode)}} -->
              <img
                v-if="inPCB"
                :src="PCBsrc(item.recipeCode)"
                draggable="false"
              />
              <img v-else :src="item.thumbnailUrl169" draggable="false" />
              <div class="imgtitle">{{ item.recipeName }}</div>
              <div class="imgcontent" v-if="item">
                <span class="time-icon"></span>
                <span>约{{ item.costTimeMin }}分钟</span>
                <span class="star-icon"></span>
                <span>简单</span>
              </div>
              <div class="icon" v-if="item"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// 获取当前杯子类型
import { mapState,mapMutations } from 'vuex';
//导入食材分类js文件
import { sortCup, sortMenu } from '@/network/storage/sort.js';
// 导入mixin的js文件
import { mixinmenu } from '@/mixin/index.js';
//导入下载图片的js文件
// import { collectimg } from '@/network/downlode/mock.js';
// 导入切换的js文件
export default {
  components: {},
  props: ['imgsty'],
  mixins: [mixinmenu],
  data() {
    return {
      // 定义activeindex
      activeline: 0,
      // 定义收到的所有菜谱数据
      cookingmsg: [],
      // 定义杯子类型，根据杯子类型生成杯子的标题
      cuptype: [{ cupIndex: 0, cupName: 'brokenCup' }, { cupIndex: 1, cupName: 'cookingCup' }, { cupIndex: 2, cupName: 'juiceCup'},],
      // 定义杯子的标题，根据标题生成菜谱数据
      cooktitles: [],
      // 定义菜谱数据，收到的所有菜谱数据根据点击切换得来的，是一个二维数组，以文字的类型展示
      menudata: [],
      // 是一个二维数组，以图书的类型展示
      menudateimg: [],
      // 以下是偏移相关的
      // 记录是否点下
      isDown: false,
      // 记录是否移动
      isMove: false,
      // 记录event对象
      Down_e: null,
      // 原始偏移量
      transX: 0,
      // 定义偏移的ingdex值
      moveindex: 0,
    };
  },
  computed: {
    ...mapState(['cupIndex']),
    menu_pages() {
      // 记录一共有多少页
      if (this.imgsty) {
        return this.menudata.length;
      } else {
        return Math.ceil(this.menudata.length / 2);
      }
    },
    inPCB() {
      // 是不是在线路板里面
      return true;
      return !!window.iBrowser;
    },
    PCBsrc() {
      return function (msg) {
        // console.log(msg)
        if (!msg) {
          return '';
        }
        return require('../../network/server/' + msg + '.png')
      }
    }
  },
  watch: {
    cupIndex() {
      this.initdata()
    },
    imgsty(val) {
      // 一页显示多少个数据
      var doublearr = sortMenu(this.cookingmsg.categories, this.cooktitles[this.activeline] ? this.cooktitles[this.activeline].code : undefined)
      this.initTitle(doublearr);
    }
  },
  methods: {
    ...mapMutations(['cookstate']),
    simpclick(msg, index) {
      // console.log('发生了点击')
      if (this.isMove) return;
      // 将focusindex变为msg
      console.log(msg)
      this.focusmsg.index = index;
      this.cookstate(msg);
      this.pushing('/menu/details/'+msg,true)
    },
    paging(arr, num) {
      if (!arr) return []
      //进行分页处理的函数
      var overarr = [];
      var initarr = [];
      for (var i = 0; i < arr.length; i++) {
        initarr.push(arr[i]);
        if ((i + 1) % num === 0) {
          overarr.push([...initarr]);
          initarr.length = 0;
        }
        if (i + 1 === arr.length) {
          if (initarr.length === 0) {
            continue;
          }
          //判断initarr是不是8个不够8个给他添加到8个
          if (initarr.length < num) {
            var complete = num - initarr.length;
            for (var j = 0; j < complete; j++) {
              initarr.push('');
            }
          }
          overarr.push([...initarr]);
          initarr.length = 0;
        }
      }
      return overarr;
    },
    initTitle(doublearr){
      // 初始化头部数据
      // 初始化分页数据
       // 8个元素一页
      if (this.imgsty) {
        this.menudata = this.paging(doublearr, 3)
      } else {
        this.menudata = this.paging(doublearr, 4)
      }
      //头部数据传出去
      if (this.moveindex > this.menu_pages - 1) {
        this.moveindex = this.menu_pages - 1;
        // 把body挪过来
        var endplace = -this.moveindex * 854;
        this.$refs.move_wraper.style['transition'] = 'none'
        this.$refs.move_wraper.style['-webkit-transform'] = 'translateX(' + endplace + 'px)'
      }
      // console.log(this.menudata)
      // 初始化滚动条总共的数据。
      // console.log(this.cookingmsg?.categories[this.activeline]?.recipes?.length)
      this.focusmsg.total = this.cookingmsg?.categories[this.activeline]?.recipes?.length;
      // 初始化头部数据
      this.$emit('headmsg', this.moveindex, this.menu_pages)
    },
    initdata(msg) {
      //去本地去取数据
      var menustr = localStorage.getItem('menu')
      var menuobj = JSON.parse(menustr)
      //杯子类型是
      var cupstr = this.cuptype.filter((item) => {
        return item.cupIndex === this.cupIndex;
      })[0];
      var { cupName } = cupstr ? cupstr : { cupName: undefined };

      this.cookingmsg = sortCup(menuobj.data, cupName)
      // console.log(this.cookingmsg.categories)
      this.cooktitles = this.cookingmsg.titles
      var doublearr = sortMenu(this.cookingmsg.categories, this.cooktitles[0] ? this.cooktitles[0].code : undefined)
      // 进行分页处理
      this.initTitle(doublearr)
    },
    itemclick(msg, index) {
      var doublearr = sortMenu(this.cookingmsg.categories, msg)
      this.activeline = index;
      // 进行分页处理
      this.initTitle(doublearr);
    },
    m_down(e) {
      this.isDown = true;
      this.isMove = false;
      // 记录点击的时候的event
      this.$refs.move_wraper.style['transition'] = 'none'
      this.Down_e = e;
      //点击的时候
      var moveWraper = this.$refs.move_wraper;
      var styles = getComputedStyle(moveWraper);
      var stylesArr = styles['-webkit-transform'].split(',')
      this.transX = parseInt(stylesArr[4])
      window.addEventListener('mousemove', this.m_move)
      window.addEventListener('mouseup', this.m_up)
    },
    m_move(e) {
      this.isMove = true;
      //计算鼠标移动的距离
      var moveX = e.pageX - this.Down_e.pageX;
      //判读那moveX是不是
      var xx = moveX + this.transX;
      this.$refs.move_wraper.style['-webkit-transform'] = 'translateX(' + xx + 'px)'
    },
    m_up(e, msg) {
      if (!this.isDown) {
        //说明是旋钮触发的
        var aaa = Math.floor(this.focusmsg.index / this.pageitem);
        //aaa代表停留在那个页面
        if (typeof msg === 'number') {
          this.moveindex = msg;
        }
      } else {
        var mov = e.pageX - this.Down_e.pageX;
        if (mov < -30) {
          this.moveindex++;
        } else if (mov > 30) {
          this.moveindex--;
        }
        // 重置光标的位置
        this.focusmsg.index = this.moveindex * this.pageitem-0.5;
      }
      this.moveindex = this.moveindex < 0 ? 0 : this.moveindex;
      this.moveindex = this.moveindex > this.menu_pages - 1 ? this.menu_pages - 1 : this.moveindex;
      // console.log(this.moveindex)
      this.$emit('headmsg', this.moveindex, this.menu_pages)
      var endplace = -this.moveindex * 854;
      this.$refs.move_wraper.style['-webkit-transform'] = 'translateX(' + endplace + 'px)'
      this.$refs.move_wraper.style['transition'] = '-webkit-transform 0.3s'
      window.removeEventListener('mousemove', this.m_move)
      window.removeEventListener('mouseup', this.m_up)
      // this.isMove = false;
      this.isDown = false;
    }
  },
  created() {
    // 初始化数据
    this.initdata();
  },
  mounted() {
    //判断sessionStorage中有没有数据，如果没有数据把localstroage中的数据保存到sessionStorage中
    var allIdstr = localStorage.getItem('foodid');
    var allId = JSON.parse(allIdstr)?.ID;
    // console.log(allId);
    if(Array.isArray(allId)){
      for(var i=0;i<allId.length;i++){
        if(sessionStorage.getItem(allId[i])){
          console.log('数据已经加载')
          return;
        }
      }
    }
    console.log('数据第一次加载')
    //将localstroage的数据保存到sessionStorage里面
    var msg = localStorage.getItem('foodLists')
    var allDetail = JSON.parse(msg)?.foodLists;
    //将所有的detail放到
    if(Array.isArray(allDetail)){
      allDetail.forEach(item=>{
        sessionStorage.setItem(item.recipeCode,JSON.stringify(item));
      })
    }
  }
}
</script>

<style lang='css' scoped>
.activeline {
  position: absolute;
  width: 80px;
  height: 4px;
  background: url("./imgs/line.png");
  top: 45px;
  left: 50%;
  -webkit-transform: translateX(-50%);
}
.activetxt {
  font-size: 28px;
  color: #ffffff;
}
.navbar {
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  width: 824px;
  font-size: 20px;
  height: 30px;
  color: #545454;
  margin-top: 25px;
  margin-left: 15px;
  line-height: 30px;
}
.navitem {
  position: relative;
}
.wrap-touch {
  position: absolute;
  top: 90px;
  left: 0px;
  width: 854px;
  height: 300px;
}
.menu-simplify {
  background: black;
  display: -webkit-flex;
  height: 300px;
  -webkit-transform: translateX(0px);
  -webkit-flex-wrap: wrap;
}
.pagetext {
  width: 854px;
  height: 300px;
  display: -webkit-flex;
  -webkit-justify-content: space-around;
}

.colomstext {
  width: 427px;
  height: 300px;
}
.flotright {
  -webkit-transform: translateY(-300px);
  float: right;
}
.pageimg {
  width: 854px;
  height: 300px;
  display: -webkit-flex;
  -webkit-justify-content: space-around;
}
.img-item {
  position: relative;
  width: 258px;
  height: 246px;
}
.img-item .imgtitle {
  margin-top: 17px;
  font-size: 32px;
}
.img-item .imgcontent {
  margin-top: 17px;
  height: 28px;
  font-size: 24px;
}
.imgcontent span {
  display: inline-block;
  line-height: 28px;
  vertical-align: top;
}
.time-icon,
.star-icon {
  width: 28px;
  height: 28px;
  /* background: url(); */
}
.time-icon {
  background: url("./imgs/time-icon.png") no-repeat center;
}
.star-icon {
  background: url("./imgs/star-icon.png") no-repeat center;
}
.simp-item {
  width: 423px;
  height: 72px;
  font-size: 16px;
  box-sizing: border-box;
  margin: 2px;
  /* margin-top: 3px; */
  padding-left: 15px;
  background-color: #1e1a0e;
  position: relative;
  line-height: 72px;
  position: relative;
}
.textfocus::after {
  content: "";
  display: block;
  position: absolute;
  width: 420px;
  height: 70px;
  top: 0px;
  left: 0px;
  border: 2px solid #f28e02;
}
.imgfocus::after {
  content: "";
  display: block;
  position: absolute;
  width: 260px;
  height: 260px;
  top: -3px;
  left: -3px;
  border: 2px solid #f28e02;
}
.simp-item .icon {
  width: 14px;
  height: 14px;
  position: absolute;
  right: 17px;
  top: 25px;
  background: url("./imgs/lt.png") no-repeat center;
}
</style>
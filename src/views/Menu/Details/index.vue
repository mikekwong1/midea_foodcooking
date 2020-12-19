<!-- 清单页面 -->
<template>
  <div class="pagebody">
    <!-- 我是清单页面 -->
    <div class="material">
      <div class="listhead">食材清单</div>
      <div class="listbody">
        <div class="mainlist">
          <h3 class="list_title">主食材</h3>
          <ul>
            <li
              class="fooditem"
              v-for="(item, index) in food.mainfood"
              :key="index"
            >
              <div>{{ item.foodName }}</div>
              <div>
                <span>{{ item.accurateWeight }}</span>
                <span>{{ item.accurateUnit }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="vicelist">
          <h3 class="list_title">副食材</h3>
          <Swiper>
            
          </Swiper>
          <ul>
            <li
              class="fooditem"
              v-for="(item, index) in food.vicefood"
              :key="index"
            >
              <div>{{ item.foodName }}</div>
              <div>
                <span>{{ item.accurateWeight }}</span>
                <span>{{ item.accurateUnit }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="tips">
      <p class="warning">温馨提示</p>
      <p>{{ info.tips }}</p>
    </div>
    <div @click="starting(true)" class="starting btn1">一锅鲜</div>
    <div @click="starting(false)" class="starting btn2">烹饪教学</div>
  </div>
</template>

<script>
//导入食材分类的函数
import { sortfood } from '@/network/storage/sort.js';
//导入滚动组件
import  Swiper  from '@/components/Swiper.vue'
export default {
  components: { Swiper },
  data() {
    return {
      food: {},
      info: {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    starting(msg) {
      // 把数据保存到sessionStorage中
      if (msg) {
        console.log('一锅鲜')
        this.$router.push({
          path: '/menu/Apot',
        })
      } else {
        console.log('烹饪教学')
        this.$router.push({
          path: '/step',
        })
      }
    }
  },
  created() {

  },
  mounted() {
    // console.log()
    var foodId = this.$route.params.id
    if (foodId in sessionStorage) {
      // console.log(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;')
      var foodsSTR = sessionStorage.getItem(foodId)
      var foods = JSON.parse(foodsSTR)
      
      // console.log(foods)
      this.food = sortfood(foods);
      this.info = sortfood(foods,true);
      // var datastr = localStorage.getItem('detail')
      // var data = JSON.parse(datastr)
      // this.food = sortfood(data.data)
      // this.info = sortfood(data.data, true)
      // console.log(data.data.steps)
      // sessionStorage.setItem('step', JSON.stringify(data.data.steps))
    }
  }
}
</script>

<style lang='css' scoped>
.material {
  width: 594px;
  height: 300px;
  position: relative;
  margin-top: 20px;
  margin-left: 20px;
}
.listhead {
  background: #342611;
  font-size: 28px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.listbody {
  background: #191208;
  height: 250px;
  position: relative;
  display: -webkit-flex;
  -webkit-justify-content: space-around;
}
.mainlist,
.vicelist {
  font-size: 24px;
  width: 250px;
  overflow: hidden;
  /* background-color: black; */
}
.list_title {
  font-size: 24px;
  margin-top: 10px;
  margin-left: 10px;
  font-weight: normal;
}
.fooditem {
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  margin-top: 7px;
  margin-left: 10px;
}
.btn1 {
  bottom: 110px;
}
.btn2 {
  bottom: 20px;
}
</style>
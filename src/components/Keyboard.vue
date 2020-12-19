<!-- 键盘 -->
<template>
  <div class="board" :class="{ numbord: lower === 4 }">
    <!-- <input type="text" v-model="keymodel"> -->
    <div class="k1" :class="{ numbers: lower === 4 }">
      <div
        v-for="(item, index) in lowcase.k1"
        :key="index"
        class="itm abg"
        @click="input(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="k2" :class="{ numbers: lower === 4 }">
      <div
        v-for="(item, index) in lowcase.k2"
        :key="index"
        class="itm abg"
        @click="input(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="k3">
      <div
        v-for="(item, index) in lowcase.k3"
        :key="index"
        class="itm abg"
        @click="input(item)"
      >
        {{ item }}
      </div>
    </div>
    <div class="k4">
      <div class="num btto abg" @click="togglecode(4)">123</div>
      <div class="taggle btto abg" @click="togglecode('toggle')">A/a</div>
      <div class="space btto abg" @click="input(' ')">space</div>
      <div class="comma btto abg" @click="input(',')">,</div>
      <div class="spot btto abg" @click="input('.')">.</div>
    </div>
    <div class="sign abg" @click="togglecode(3)">@#</div>
    <div class="sign back abg" @mousedown="backdown" @mouseup="backup">&lt;=</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      keymodel: '',
      lower: 1,
      number: false,
      timer: null,
    };
  },
  computed: {
    lowcase() {
      if (this.lower === 1) {
        return {
          k1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
          k2: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
          k3: ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
        }
      } else if (this.lower === 2) {
        return {
          k1: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
          k2: ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
          k3: ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
        }
      } else if (this.lower === 3) {
        return {
          k1: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'],
          k2: ['`', '~', '。', '[', ']', '{', '}', '|', '\\'],
          k3: ['<', '>', ':', ';', ',', '?', '/'],
        }
      } else if (this.lower === 4) {
        return {
          k1: ['1', '2', '3', '4', '5'],
          k2: ['6', '7', '8', '9', '0'],
          k3: ['\"', '\'', '_', '-', '+', '=', '?'],
        }
      }
    }
  },
  watch: {},
  methods: {
    input(key) {
      // this.keymodel += key
      console.log(key)
      this.$emit('input', key)
    },
    togglecode(msg) {
      // 切换大小写
      if (msg === 'toggle') {
        this.lower = this.lower === 1 ? 2 : 1;
      } else {
        this.lower = msg;
      }
    },
    backdown() {
      this.timer = setTimeout(() => {
        // 执行长按操作
        this.$emit('input', 'clear')
      }, 1000)
    },
    backup() {
      clearTimeout(this.timer)
      this.$emit('input', 'back')
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style lang='css' scoped>
.sign {
  position: absolute;
  left: 12px;
  bottom: 60px;
  width: 100px;
  height: 50px;
  border-radius: 4px;
  text-align: center;
  line-height: 50px;
  background-color: rgb(50, 50, 50);
}
.sign.back {
  left: 740px;
}
.board .numbers {
  width: 854px;
  height: 70px;
  font-size: 20px;
}
.numbers > .itm {
  width: 160px;
  height: 70px;
  line-height: 70px;
}
.board {
  width: 854px;
  height: 224px;
  font-size: 16px;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.numbord {
  height: 264px;
}
.k1 {
  display: -webkit-flex;
  -webkit-justify-content: space-around;
  width: 854px;
  height: 50px;
  margin-top: 5px;
}
.k2 {
  display: -webkit-flex;
  -webkit-justify-content: space-around;
  width: 770px;
  height: 50px;
  margin: 5px auto;
}
.k3 {
  margin-top: 5px;
  -webkit-justify-content: space-around;
  width: 600px;
  height: 50px;
  margin: 0px auto;
  display: -webkit-flex;
}
.k4 {
  display: -webkit-flex;

  -webkit-justify-content: space-between;
  width: 840px;
  height: 50px;
  margin: 5px auto;
}
.itm {
  width: 80px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: rgb(50, 50, 50);
  border-radius: 4px;
}
.board .abg:active{
  background-color: #010101;
}
.btto {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 4px;
  background-color: rgb(42, 42, 42);
}
.k4 .space {
  width: 428px;
  background-color: rgb(50, 50, 50);
}
</style>
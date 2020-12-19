// 模拟键盘，测试用的代码
export function keypress() {
  window.addEventListener('keydown', (event) => {
    // console.log(event.which)
    switch (event.keyCode) {
      case 27:
        this.Event.dispachEvent('keybtn', { press: true, type: 0, value: 4 });
        // console.log('返回')
        break;
      case 32:
        this.Event.dispachEvent('keybtn', { press: true, type: 0, value: 13 });
        // console.log('空格,确认');
        break;
      case 38:
        this.Event.dispachEvent('spinbtn', { press: true, type: 3, value: 1 });
        break;
      case 40:
        this.Event.dispachEvent('spinbtn', { press: true, type: 4, value: 1 });
        break;
      case 13:
        var msg = this.$store.state.cupIndex;
        console.log(msg)
        msg++;
        if (msg > 3) {
          msg = 0;
        }
        this.$store.commit('changeCup', msg)
        break;
      case 49:
        // 进入主页面
        // this.$router.push('/')
        this.Event.dispachEvent('keybtn', { press: true, type: 0, value: 8 });
        break;
      case 50:
        // this.$router.push('/menu')
        this.Event.dispachEvent('keybtn', { press: true, type: 0, value: 16 });
        // 进入菜单页面
        break;
      case 51:
        // this.$router.push('/weight')
        this.Event.dispachEvent('keybtn', { press: true, type: 0, value: 1 });

        // 进入称重页面
        break;
      case 52:
        // this.$router.push('/jog')
        this.Event.dispachEvent('keybtn', { press: true, type: 0, value: 2 });
        // 进入点动页面
        break;
      case 53:
        // this.$router.push('/set')
        // 进入设置页面
        break;
    }

  })
}
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { myevent } from "./lib/Event.js";
//导入event.js
const { myevent } = require("@/lib/Event.js");
import { Plugin } from "./lib/plugin";
import { dzSmartTest } from "@/lib/dzSmart.js";

// 导入串口发送指令
// const q7proto = require("@/lib/COM/q7proto.js");

Vue.config.productionTip = false;
Vue.prototype.Event = myevent;
Vue.prototype.plugin = new Plugin();
// 标记跳转路由为false；
Vue.prototype.pushsign = false;
Vue.prototype.pushing = function(pathing, flag, times = 50) {
	//如果将要跳转的路由和现在的路由是一样的，不再执行
	var isHome = this.$route.path === '/home' && pathing === '/';
	if (this.$route.path === pathing||isHome) {
		//播放豆豆豆豆声音
		// console.log('豆豆豆豆豆')
		return;
	};

	if (typeof flag === "undefined") {
		//flag为undefined，直接跳转路由
		this.$router.push(pathing);
	} else {
		// 延时跳转路由;
		if (this.pushsign) return;
		setTimeout(() => {
			this.$router.push(pathing);
			this.pushsign = false;
		}, times);
		this.pushsign = true;
	}
};

// add dzSmartTest testing
dzSmartTest();

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");

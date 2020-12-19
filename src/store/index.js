import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// 记录当前是那个杯子

		cupIndex: 0,
		cookingID:null,
		// 记录每个菜谱类型的第一个
		// type: ['', '','']
	},
	mutations: {
		changeCup(state, msg) {
			state.cupIndex = msg;
		},
		cookstate(state, msg) {
			state.cookingID = msg;
		}
	},
	getters: {
		cupName(state) {
			var msg = ["烹饪杯", "破壁杯", "料理杯", ["果汁杯", "研磨杯"]];
			return msg[state.cupIndex];
		}
	},
	actions: {},
	modules: {},
});

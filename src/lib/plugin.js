// 导入串口和json相互转换的js文件
const q7proto = require("@/lib/COM/q7proto.js");
// import { gettime } from "./gettime.js";
//导入检查串口的函数
// import { che_mcu } from "./receiveOk.js";
//导入vuex
import store from "@/store/index.js";
export class Plugin {
	constructor() {}
	inithome(e) {
		this.home = e;
		if (this.home.BrownVersion) {
			this.home.BrownVersion;
			console.log(this.home.BrownVersion);
		}
	}
	init(ele) {
		this.ele = ele;
	}
	// j2d(msg) {
	// 	q7proto.jsonToData(msg);
	// }
	// d2j(msg) {
	// var objwap = { msg };
	// q7proto.dataToJson(objwap);
	// }
	$_send(arr) {
		var initarr = [];
		// var aaa = "AA,2A,23,00,00,00,00,00,01,02,AA,55,00,24,75,5B,03,00,04,01,00,00,00,00,00,00,00,01,01,03,12,00,96,03,0B,00,00,00,00,0A,0F,41,A0"
		if (typeof arr === "string") {
			var bbb = arr.split(',')
			initarr = bbb.map((item) => {
				return parseInt('0X'+item)
			})
			//initarr是发出去的数据
		}
	}
	receive (...msg) {
		// console.log("收到数据: " + msg);

		q7proto.onData(msg);
		// if (packet) {
		// 	console.log("packet: ", packet);
		// }

		// var initarr = undefined;
		// for (var i = 0; i < msg.length; i++) {
		// 	initarr = che_mcu(msg[i]);
		// }
		// if (!initarr) return;
		// console.log(initarr);
		// var initD2J = q7proto.dataToJson(initarr);
		// return initD2J;
	}
	play(msg) {
		//播放声音
		var initObj = {
			sele: this.selM,
			succ: this.sucM,
			end: this.endM,
		};
		if (initObj[msg]) {
			initObj[msg].load();
			initObj[msg].play();
		}
	}
}

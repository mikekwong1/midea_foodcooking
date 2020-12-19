class Myevents {
	constructor() {
		this.events = {};
	}
	addEventListener(type, handle) {
		// 判断events有没有相应的type
		if (type in this.events) {
			this.events[type].push(handle);
		} else {
			this.events[type] = [];
			this.events[type].push(handle);
		}
	}
	dispachEvent(type, params) {
		//判断有没有type事件类型
		if (type in this.events) {
			this.events[type].forEach((item) => {
				if (typeof item == "function") {
					item(params);
				} else {
					console.log("绑定类型不是函数" + item);
				}
			});
		} else {
			// console.log("未注册" + type + "事件类型");
		}
	}
	removeEventListener(type, handle) {
		// 判断handle有没有值
		if (!handle) {
			//handle没有值
			delete this.events[type];
		} else {
			//删除type数组的handle
			if (type in this.events) {
				this.events[type].findIndex((index) => {
					if (index === -1) {
						//type没有这个事件
						console.log("未注册" + handle + "事件");
					} else {
						this.events[type].splice(index, 1);
						if (this.events[type].length === 0) {
							delete this.events[type];
						}
					}
				});
			}
		}
	}
}
const myevent = new Myevents();
module.exports.myevent = myevent;

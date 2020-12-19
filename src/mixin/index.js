// 定义全局的旋钮改变focus边框方法
// 定义：class="{classname:index === focus_index}"
// 调用this.focus(array,[arrayCount])
// 取出focus_index.index代表当前元素
export const mixinhome = {
	// 主页切换mixin
	data() {
		return {
			focus_index: {
				// 总共数量
				total: 0,
				// 现在的索引
				index: -1,
			},
		};
	},
	methods: {
		// mag可以是数组可以是数字
		initfocus(msg) {
			if (typeof msg === "number") {
				this.focus_index.total = msg;
			} else {
				if (Array.isArray(msg)) {
					this.focus_index.total = msg.length;
				}
			}
		},
		pressSure() {
			// 跳转路由这个是主页的切换的方法。
			// console.log(this.cupImg)
			if (Array.isArray(this.cupImg)) {
				this.cupImg.forEach((list) => {
					//判断现在的索引和
					var mark = list?.mark;
					// console.log(mark)
					if (mark === this.focus_index.index) {
						var pat = list?.path;
						if (typeof pat === "string") {
							this.pushing(pat);
						}
					}
				});
			}
		},
		focuseon(obj) {
			var msg = 0;
			if (obj.type === 3) {
				console.log("步退");
				msg = -obj.value;
			} else if (obj.type === 4) {
				console.log("步进");
				msg = obj.value;
			}
			this.focus_index.index += msg;
			this.focus_index.index = this.focus_index.index > this.focus_index.total - 1 ? 0 : this.focus_index.index;
			this.focus_index.index = this.focus_index.index < 0 ? this.focus_index.total - 1 : this.focus_index.index;
		},
	},
	mounted() {
		//监听旋钮旋转事件
		this.Event.addEventListener("spinbtn", this.focuseon);
		//监听确定事件
		this.Event.addEventListener("OK", this.pressSure);
	},
	beforeDestroy() {
		this.Event.removeEventListener("spinbtn", this.focuseon);
		this.Event.removeEventListener("OK", this.pressSure);
	},
};
export const mixinmenu = {
	// 菜谱旋钮切换mixin
	data() {
		return {
			focusmsg: {
				// 索引
				index: 0,
				// 共多少个
				total: 0,
			},
		};
	},
	computed: {
		pageitem() {
			if (this.imgsty) {
				return 3;
			} else {
				return 8;
			}
		},
	},
	// 方法
	methods: {
		pressSure() {
			// 菜单按键的确认键
			console.log(this.focusmsg.index);
			// 利用index取出id
			if (Array.isArray(this.menudata)) {
				this.menudata.forEach((data) => {
					// console.log(data);
					if (Array.isArray(data)) {
						data.forEach((food) => {
							if (food?.index === this.focusmsg.index) {
								// console.log()
								var recipeCode = food?.recipeCode;
								if (typeof recipeCode === "number") {
									this.pushing("/menu/details/" + recipeCode);
								}
							}
						});
					}
				});
			}
		},
		focuseon(obj) {
			console.log(this.focusmsg.total);
			var msg = 0;
			if (obj.type === 3) {
				console.log("步退");
				msg = -obj.value;
			} else if (obj.type === 4) {
				console.log("步进");
				msg = obj.value;
			}
			var page = this.focusmsg.index / this.pageitem;
			if (this.focusmsg.index % 1 === 0.5) {
				if (msg > 0) {
					this.focusmsg.index = Math.ceil(this.focusmsg.index);
				} else {
					this.focusmsg.index = Math.floor(this.focusmsg.index);
				}
			} else {
				this.focusmsg.index = parseInt(this.focusmsg.index + msg);
			}
			if (this.focusmsg.index > this.focusmsg.total - 1) {
				this.focusmsg.index = this.focusmsg.total - 1;
			}
			if (this.focusmsg.index < 0) {
				this.focusmsg.index = 0;
			}
			var mmm = Math.floor(this.focusmsg.index / this.pageitem);
			// console.log(mmm)
			if (mmm !== this.moveindex) {
				this.m_up(undefined, mmm);
			}
		},
	},
	mounted() {
		//点击确定按钮
		this.Event.addEventListener("OK", this.pressSure);
		// 旋转按钮
		this.Event.addEventListener("spinbtn", this.focuseon);
	},
	beforeDestroy() {
		this.Event.addEventListener("OK", this.pressSure);
		this.Event.removeEventListener("spinbtn", this.focuseon);
	},
};

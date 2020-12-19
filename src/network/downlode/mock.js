// 模拟下载
//导入请求模块
import { request } from "../request.js";
//导入下载图片的方法

// import download from 'ly-downloader'
//导入到本地的方法
import { save } from "../storage/index.js";
export function mock() {
	if (window.iBrowser) {
		// 取本地去取数据
		var scriptele = document.createElement("script");
		scriptele.src = "./JSON/menu.json?callBack=getMenu";
		scriptele.type = "text/javascript";
		document.body.appendChild(scriptele);
		window.getMenu = function(ele) {
			if ("menu" in localStorage) {
				console.log("数据已经加载到本地");
			} else {
				localStorage.setItem("menu", JSON.stringify(ele));
			}
		};
		//添加菜谱详情数据
		var scriptdetail = document.createElement("script");
		scriptdetail.src = "./JSON/detail.json?callBack=getDetail";
		scriptdetail.type = "text/javascript";
		document.body.appendChild(scriptdetail);
		window.getDetail = function(ele) {
			if ("detail" in localStorage) {
				console.log("数据已经加载到本地");
			} else {
				localStorage.setItem("detail", JSON.stringify(ele));
			}
		};
	} else {
		// 去服务器取数据
		if ("menu" in localStorage) {
			console.log("menu下载成功");
		} else {
			request({
				url: "/recipe-service/screen/recipe/categories",
				params: {
					applianceType: "0x23",
					modelNo: 64000377,
					moudletype: 1,
					sn: 1,
					version: "V2",
				},
			}).then((msg) => {
				if (msg.errorCode === 0) {
					console.log("菜谱请求成功");
					var data = msg.data;
					// console.log(data)
					var ID = [];
					data.forEach((msg) => {
						var menuTitle = msg?.categories;
						menuTitle.forEach((list) => {
							var cookfood = list?.recipes;
							cookfood.forEach((foodID) => {
								var myID = foodID?.recipeCode;
								// console.log(myID)
								ID.push(myID);
							});
						});
						// console.log(menuTitle?.recipes)
					});
					// console.log(arrID)
					// 把所有的id存到localstroage里面。
					save("menu", msg);
					save("foodid", { ID });
				}
			});
		}
		if ("foodLists" in localStorage) {
			console.log("foodLists下载成功");
			var liststr = localStorage.getItem("foodLists");
			// var {foodLists} = JSON.parse(liststr);
			// console.log(foodLists)
			// foodLists.forEach((list) => {
			// 	console.log(list?.data?.data);
			// });
			// console.log(foodLists)

		} else {
			console.log('正在请求菜谱')
			// console.log('lllllllllllllllllllllllllllllllll')
			if ("foodid" in localStorage) {
				var IDliststr = localStorage.getItem("foodid");
				var { ID } = JSON.parse(IDliststr);
				// console.log(ID);
				request(ID)
					.then((Lists) => {
						// console.log(foodLists);
						// 先把所有的数据拷贝一份
						var foodLists = Lists.map((list) => {
							// 取出data，代表每个菜谱
							var data = list?.data?.data;
							//取出菜谱的id
							var { recipeCode } = data?.info;
							data.recipeCode = recipeCode;
							return data;
						});
						var jsons = JSON.stringify({ foodLists });
						localStorage.setItem("foodLists", jsons);
						console.log('菜谱下载成功')
					})
					.catch((err) => {
						console.log(err);
					});
			}

			// request({
			// 	url: "/recipe-service/screen/recipe/detail",
			// 	// https://ce5.midea.com/recipe-service/screen/recipe/detail?recipeCode=220021&
			// 	params: {
			// 		applianceType: "0x23",
			// 		modelNo: 64000377,
			// 		recipeCode: 220021,
			// 		sn: 1,
			// 	},
			// }).then((msg) => {
			// 	if (msg.errorCode === 0) {
			// 		console.log("请求成功");
			// 		var data = msg.data;
			// 		// console.log(data)
			// 		// save("detail", msg);
			// 	}
			// });
		}
	}
}

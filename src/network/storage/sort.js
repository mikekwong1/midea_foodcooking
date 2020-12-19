// 信息分类，第一个，根据杯子的类型生成杯子的标题
export function sortCup(msg, type) {
	//msg代表所有的数据，type代表杯子类型，kind代表是那种食物
	//需求是获取所有的食物类型，点击每一种食物类型，跳转到相应的食物类型页面
	var titles = [];
	var categories = [];

	msg.forEach((item) => {
		//如果杯子类型是相同的返回titles数组和每个title下面说有的内容
		if (item.groupKey === type) {
			categories = item.categories;
			// console.log(categories[this.activeline])
			
			categories.forEach((cupmsg,index) => {
				// 把所有的name添加到titile上，
				cupmsg.recipes && cupmsg.recipes.forEach((item,index) => {
					item.index = index;
				})
				titles.push({ title: cupmsg.name, code: cupmsg.code });
				// menus.push(cupmsg.recipes)
			});
		}
	});
	return {
		titles,
		categories,
	};
}
// 信息分类，第二个，根据标题的类型生成不同的菜谱数据
export function sortMenu(categories, title) {
	// 这里有所有类型的菜谱
	if (!title) return;
	var msg = categories.filter((item) => {
		return item.code === title;
	});
	if (msg[0]) {
		return msg[0]["recipes"];
	} else {
		return [];
	}
	// msg[0]
}
//生成主食材分类和副食材分类
export function sortfood(foods, msg) {
	// console.log(foods)
	var fods = foods.foods;
	var steps = foods.steps;
	// console.log(foods)
	if (msg) {
		var stepdescribe = [];
		if (Array.isArray(steps)) {
			steps.forEach((msg) => {
				// console.log(msg.description)
				stepdescribe.push(msg.description)
			})
		}
		return {
			tips: foods.info.tips, 
			stepdescribe
		}
		
	} else {
		var mainfood = [];
		var vicefood = [];
		if (Array.isArray(fods)) {
			fods.forEach((item) => {
				// console.log(item)
				if (item.foodType === 1) {
					mainfood.push(item);
				} else if (item.foodType === 2) {
					vicefood.push(item);
				}
			});
		}
		return {
			mainfood,
			vicefood,
		};
	}
}

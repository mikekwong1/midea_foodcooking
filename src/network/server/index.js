let fs = require("fs");
let request = require("request");
// 保存图片到本地
let data = fs.readFileSync("./json/menu.json", "utf-8");
let msg = JSON.parse(data);
let initarr = [];
msg.data.forEach((item) => {
	item.categories.forEach((list) => {
		list.recipes.forEach((scrs) => {
			var obj = {
				id:scrs.recipeCode,
				scr:scrs.thumbnailUrl169
			}
			initarr.push(obj);
		});
	});
});
initarr.forEach((arritem, idx) => {
  request({ url: arritem.scr }).pipe(
    fs.createWriteStream(`${ arritem.id }.png`)
	);
	// console.log(arritem)
});


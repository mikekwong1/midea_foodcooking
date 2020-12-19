/* eslint-disable*/

const recipeCategories = function(dataArray) {
  console.log(">>recipeCategories: dataArray LEN=" + dataArray.length);

  for (i in dataArray) {
    let item = dataArray[i];
    let itemstr = JSON.stringify(item, null, 2);
    console.log("\n>>itemstr, i=" + i);
    console.log(itemstr);   
  }
}

module.exports.recipeCategories = recipeCategories;
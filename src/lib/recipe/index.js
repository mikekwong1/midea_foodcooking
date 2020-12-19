/* eslint-disable*/

const { request } = require("@/network/request.js");
const { recipeCategories } = require("./recipe.js");

const testRecipe = function() {
  console.log(">>test recipe");
  getRecipeCategories();
}

const getRecipeCategories = function() {
  console.log("getRecipeCategories");

  request({
    url: "/recipe-service/screen/recipe/categories",
    params: {
      applianceType: "0x23",
      modelNo: 64000377,
      moudletype: 1,
      sn: 1,
      version: "V2",
    },
  })
  .then(function (response) {
    let errorCode = response.errorCode;
    let msg = response.msg;
    console.log(">>errorCode=" + errorCode + ", msg=" + msg);

    // 获取数据成功
    if (errorCode === 0) {
      let data = response.data;
      recipeCategories(data);
    }
  })
  .catch(function (error) {
    console.log(error);
  });;
}

module.exports.testRecipe = testRecipe;
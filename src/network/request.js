import axios from "axios";
import { Promise } from "core-js";
// import { all } from "core-js/fn/promise";
export function request(config) {
    // 创建一个数组，存放所有axios的请求
    var panddings = [];
    if (Array.isArray(config)) {
        var total = config.length;
        var AJAXover = 0;
        // 如果是数组，传进来的是所有菜谱的id
        config.forEach((item) => {
            // 将item放到config中
            var configInit = {
                applianceType: "0x23",
                modelNo: 64000377,
                recipeCode: item,
                sn: 1,
            };
            var promiseItem = axios({
                method: "get",
                url: process.env.VUE_APP_base + "/recipe-service/screen/recipe/detail",
                params: configInit,
            }).then((msg) => {
                AJAXover++;
                var speed = (AJAXover / total).toFixed(3);
                console.log(speed);
                // console.log(msg);
                return Promise.resolve(msg)
            });
            panddings.push(promiseItem);
        });
        var All = function(params) {
            return Promise.all(params);
        };
        return All(panddings);
    }
    const instance = axios.create({
        // baseURL: "https://ce5.midea.com",
        baseURL: process.env.VUE_APP_base,
        timeout: 5000,
        method: "get",
    });
    // 添加一个请求拦截
    instance.interceptors.request.use(
        (config) => {
            //在config中添加数据
            Object.assign(config, {});
            return config;
        },
        (err) => {
            console.log(err);
        }
    );
    //添加一个相应拦截
    instance.interceptors.response.use(
        (data) => {
            return data.data;
        },
        (err) => {
            console.log(err);
        }
    );

    return instance(config);
}
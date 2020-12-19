import Vue from "vue";
import VueRouter from "vue-router";
//首页入口页面
import Home from "@/views/Home";

//倒入称重页面
import weight from "@/views/Weight";
//倒入菜谱页面
import menu from "@/views/Menu";
//倒入设置页面
import set from "@/views/Setting";
//导入新手引导页面
import welcome from "@/views/Setting/Welcome";
// 
//导入点动页面
import jog from "@/views/Jog";

//菜单相关的二级页面
import menuhome from "@/views/Menu/Leader.vue";
import details from "@/views/Menu/Details";
import Apot from '@/views/Menu/Details/Allpot.vue'
// 导入开始教学页面
import step from '@/views/Menu/step'
//导入启动中页面

//二级页面
//导入破壁杯等各种杯子
import brokencup from "@/views/Cookcups";
//导入各个diy页面
import DIY from '@/views/DIY'

//导入口感页面ready,变为texture.vue;
import texture from "@/views/Cookcups/cuppages/Texture.vue";
//导入破壁进程页面going变为breakProcess
import breakprocess from "@/views/Cookcups/cuppages/breakProcess.vue";
// 导入和面页面,ok
import mixflour from '@/views/Cookcups/cuppages/mixFlour.vue'
// 导入和面，高温洗等启动页面
import mixstarting from '@/views/Cookcups/cuppages/startUp.vue'

//导入系统设置
import sys from "@/views/Setting/Setpages/Sys.vue";
import net from "@/views/Setting/Setpages/Net";
import bright from "@/views/Setting/Setpages/Bright.vue";
import voice from "@/views/Setting/Setpages/Voice.vue";
import wifi from '@/views/Setting/Setpages/Net/Wifilist.vue'
import wifipass from '@/views/Setting/Setpages/Net/password.vue'


//change
import  factory from "@/views/Setting/Setpages/system/factory.vue";
import systemup from  "@/views/Setting/Setpages/system/systemup/systemup.vue";
//import findsystem from  "@/views/Setting/Setpages/system/systemup/findsystem.vue";
import footup from  "@/views/Setting/Setpages/system/footup/footup.vue";
//import findfoot from  "@/views/Setting/Setpages/system/footup/findfoot.vue";
import operation from "@/views/Setting/Setpages/system/operation.vue";
import highland from "@/views/Setting/Setpages/system/highland.vue";
Vue.use(VueRouter);
const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	//首页各种杯子
	{
		path: "/home",
		component: Home,
		// component: set,
		children: [
			{
				path: "/",
				name: "pobibei",
				component: brokencup,
			},
			{
				path: "texture",
				name: "texture",
				component: texture,
			},
			{
				path: "breakprocess",
				name: "breakprocess",
				component: breakprocess,
			},
		],
	},
	// 首页其他功能
	//和面功能
	{
		path: "/mixflour",
		name: "mixflour",
		component: mixflour,
	},
	{
		path: "/startUp/:type",
		name: "startUp",
		component: mixstarting,
	},
	{
		path: "/DIY",
		name: "DIY",
		component: DIY,
	},

	// 称重
	{
		path: "/weight",
		name: "weight",
		component: weight,
	},
	//步骤页面
	{
		path: "/step",
		name: "step",
		component: step,
	},
	// 菜单
	{
		path: "/menu",
		// name:'menu',
		component: menu,
		children: [
			{
				path: "/",
				name: "menuhome",
				component: menuhome,
			},
			{
				path: "details/:id",
				name: "details",
				component: details,
			},
			{
				path: "Apot",
				name: "Apot",
				component: Apot,
			},
		],
	},
	//wifi页面
	{
		path: "/wifi",
		name: "wifi",
		component: wifi,
	},
	{
		path: "/wifipass",
		name: "wifipass",
		component: wifipass,
	},
	// 设置
	{
		path: "/set",
		// name:'set',
		component: set,
		children: [
			// 联网设置
			{
				path: "/",
				name: "net",
				component: net,
			},
			// 系统设置
			{
				path: "sys",
				name: "sys",
				component: sys,
			},
			//声音设置
			{
				path: "voice",
				name: "voice",
				component: voice,
			},
			// 亮度设置
			{
				path: "bright",
				name: "bright",
				component: bright,
			},
			
		],
	},
	// 点动
	{
		path: "/jog",
		name: "jog",
		component: jog,
	},
	//change
	// 快速指引
	{
		path: "/operation",
		name: "Operation",
		component : operation
   	},
	//高原模式
	{
		path: "/highland",
		name: "highland",
		component : highland
	},
	// 食品升级
	{
		path: "/footup",
		name: "footup",
		component : footup
	}
	, {
		path: "/systemup", 
		name: "systemup",
		component : systemup
	},
	// 工厂模式
	{
		path: "/factory",
		name: "factory",
		component :  factory
	},
];
// 防止router重复跳转造成问题。
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};
const router = new VueRouter({
	routes,
});

export default router;

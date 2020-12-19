/* eslint-disable*/
const Q7PROTO = require("./q7define.js");
const defq = Q7PROTO.DEFINE;
const props = Q7PROTO.props;
const { myevent } = require("@/lib/Event.js");

// data buffer(array)
let lastPacket = [];

class q7Message {
	constructor() {
		this.len = null;
		this.type = null;
		this.msgflag = null;
		this.msgtype = null;
		this.packet = [];
		this.chksum = null;
	}
}

// keybtn event
const keybtnEvent = function(type, jsonObject) {
	let jsonstr = JSON.stringify(jsonObject);
	console.log(">>KEY EVT: type=" + type + ", params=" + jsonstr);

	// let params = {
	// 	"press": false,
	// 	"type": 0,
	// 	"value": 4
	// }

	// press: false为抬起按键，true为按下
	// type：0-短按，1-长按，2-长按8秒，3-逆时针转，4-顺时针转
	// value：type=3/4，value为步进数
	//				4-取消，8-主页，16-菜谱，1-称重，2-点动，13-OK
	
	myevent.dispachEvent(type, jsonObject);
}

// spinbtn event
const spinbtnEvent = function(type, jsonObject) {
	let jsonstr = JSON.stringify(jsonObject);
	console.log(">>SPIN EVT: type=" + type + ", params=" + jsonstr);
	
	myevent.dispachEvent(type, jsonObject);
}

const mcuReportStatus = function(data) {
	// console.log(">>STATUS EVT: data=" + data);

	// // 工作状态: 0-关机，1-预约等待中，2-工作中，3-工作完成，4-保温中（预留）
	// //				 5-暂停，6-关机，7-开机；0x80-电子检测模式，0x89-总装检测模式，0xff-故障状态 

	// binary to model
	binToModel(data);

	// //
	// let jsonObject = getJsonFromModel();
	// var jsonstr = JSON.stringify(jsonObject);

	// console.log("jsonstr: " + jsonstr);
};

const mcuReportKey = function(data) {
	console.log(">>KEY EVT: data=" + data);

	let type = data[2];
	let val = data[3] | (data[4] << 8);
  
  // 第八位为1，则为按键抬起；为0为按下
  let keyRelease = (type & 0x80) >> 7;    
  let keyType = type & 0x7f;
  
	// console.log(">>KEY EVT: keyRelease=" + keyRelease + ", type=" + keyType + ", value=" + val);

	let json = {};
	json["press"] = !keyRelease;
	json["type"] = keyType;
	json["value"] = val;

	// spin button: type == 3 or type == 4
	if (type === 3 || type === 4) {
		spinbtnEvent("spinbtn", json);
	}
	else {
		keybtnEvent("keybtn", json);
	}
};

const binToModel = function(binData) {
	let len = binData.length;
	let messageBytes = binData;

	//
	let dataType = props.dataType;
	let subCmd = props.subCmd;

	// console.log(">>>dataType=" + dataType + ", subCmd=" + subCmd);
	// console.log(">>>binToModel: LEN=" + len + ", BINDATA=" + messageBytes);

	props.protocolVersion = messageBytes[2];
	props.ackType = messageBytes[3];
	props.controlSrc = messageBytes[4];
	props.workMode = messageBytes[6] + messageBytes[7] * 256 + messageBytes[8] * 65536 + messageBytes[9] * 16777216;
	props.workStatus = messageBytes[10];
	props.errorCode = messageBytes[11];

	props.remainAppointTimeSec = messageBytes[12] * 3600 + messageBytes[13] * 60 + messageBytes[14];
	props.remainWorkTimeSec = messageBytes[15] * 3600 + messageBytes[16] * 60 + messageBytes[17];
	props.keepWarmTimeSec = messageBytes[18] * 3600 + messageBytes[19] * 60 + messageBytes[20];
	props.setAppointTimeSec = messageBytes[21] * 3600 + messageBytes[22] * 60 + messageBytes[23];
	props.appointActualWorkTimeSec = messageBytes[24] * 3600 + messageBytes[25] * 60 + messageBytes[26];
	props.setWorkTimeSec = messageBytes[27] * 3600 + messageBytes[28] * 60 + messageBytes[29];
	props.setKeepWarmTimeSec = messageBytes[30] * 3600 + messageBytes[31] * 60 + messageBytes[32];

	props.currentBottomTemp = messageBytes[33];
	props.currentStep = messageBytes[34];
	props.totalStep = messageBytes[35];
	props.stepStatus = messageBytes[38];	// 工作阶段
	props.mouthfeel = messageBytes[39];		// 口感
	props.diyCurStep = messageBytes[40];	// DIY当前步骤
	
	props.flagLidStatus = messageBytes[41] & 0x01;						// 杯盖开合状态
	props.flagFinished = (messageBytes[41] & 0x02) >> 1;			// 工作完成标识
	props.flagHorseRaceLamp = (messageBytes[41] & 0x04) >> 2;	// 跑马灯显示标识
	props.flagOffScreen = (messageBytes[41] & 0x08) >> 3;			// 熄屏标识 
	props.flagPower = (messageBytes[41] & 0x10) >> 4;					// 开关机标识
	props.flagSpill = (messageBytes[41] & 0x20) >> 5;					// 防溢状态标识
	props.flagQuickCooking = (messageBytes[41] & 0x40) >> 6;	// 锅鲜标识
	props.flagKeepWarmSwitch = (messageBytes[41] & 0x80) >> 7;	// 保温开关标识

	props.flagWeighWorking = (messageBytes[42] & 0x01);	// 称重状态
	props.cupStatus = messageBytes[43];									// 杯身状态
	props.rotateDirection = (messageBytes[44] & 0x80) >> 7;		// 正反转标识
	props.speed = (messageBytes[44] & 0x7f);						// 工作速度
	props.setWorkTemp = messageBytes[45];								// 加热目标温度
	props.setKeepWarmTemp = messageBytes[46];						// 保温目标温度
};

const handleMCUMessage = function(msgbytes) {
	let magic = msgbytes[0];
	let msgLength = msgbytes[1];
	let type = msgbytes[2]; // 家电类型：破壁机（0x23）
	let byte4 = msgbytes[3]; // 帧同步校验，调试信息：超重标志
	let byte5 = msgbytes[4]; // 预留       调试信息：沸点
	let byte6 = msgbytes[5]; // 预留       调试信息：微动状态
	let byte7 = msgbytes[6]; // 预留       调试信息：磁控状态
	let byte8 = msgbytes[7]; // 预留       调试信息：加热状态
	let wprotoVer = msgbytes[8]; // 称重版本号 0x11
	let cmd = msgbytes[9]; // 0x70-0xx73
	let bodyLength = msgLength - defq.BYTE_PROTOCOL_HEAD_LENGTH;

	// console.log("--CMD=" + cmd + ", DATA=" + msgbytes);
	// console.log("msgLength=" + msgLength + ", bodyLength=" + bodyLength);

	// 获取body部分
	let bodyBytes = new Uint8Array(bodyLength);
	for (i = 0; i < bodyLength - 1; i++) {
		bodyBytes[i] = msgbytes[i + defq.BYTE_PROTOCOL_HEAD_LENGTH];
	}

	// console.log(">>MCU bodyBytes=" + bodyBytes);

	switch (cmd) {
		// 按键上报指令
		case 0x70:
			mcuReportKey(bodyBytes);
			break;

		// 称重/称重应答指令
		case 0x71:
			console.log(">>称重应答指令");
			break;

		// MCU对TFT状态上报命令
		case 0x72:
			mcuReportStatus(bodyBytes);
			break;

		// MCU状态同步命令心跳包400ms一帧
		case 0x73:
			console.log(">>MCU状态同步命令心跳包400ms一帧");
			break;

		default:
			break;
	}
};

const parsePacket = function(buffer) {
	console.log("q7protoParsePacket: ", buffer);
	console.log("KEY_SUB_CMD=%s, KEY_WORK_MODE=%s", defq.KEY_SUB_CMD, defq.KEY_WORK_MODE);

	let device_type = defq.BYTE_DEVICE_TYPE;
	let msg_type = defq.BYTE_MSG_TYPE_CONTROL;
	console.log("device_type=%d, msg_type=%d", device_type, msg_type);
};

const onData = function(buf) {
	let data = new Uint8Array(buf);
  
  // console.log(">>LEN=" + lastPacket.length + ", DATA=" + lastPacket);
	for (i = 0; i < data.length; i++) {
		let tmp = data[i];
		lastPacket.push(tmp);
  }
  
	// console.log("######缓存: 长度=" + lastPacket.length + ", 缓存数据=" + lastPacket);

	// get valid packet
	let q7msg = getValidPacket(lastPacket);
	let q7message = undefined;
	if (q7msg) {
		let len = q7msg.len;

		q7message = q7msg.packet;
		// console.log("VALID PACKET!!! LEN=" + len + ", Q7Message=" + q7message);

		// array to json
		arrayToJson(q7message);
	}

	return q7message;
};

const getValidPacket = function(buf) {
	// console.log("getValidPakcet: " + buf);

	for (i = 0; i < buf.length; i++) {
		let tmp = buf[i];

		if (tmp === 0xaa) {
			let packet = checkPacket(buf, i);
			if (packet !== undefined) return packet;
		}
	}
};

const checkPacket = function(buf, start) {
  // 有效buf数据长度，需减去开始位置start
  let buflen = buf.length - start;

  // 报文头长度为10，因此必须大于10；小于为无效数据包
  if (buflen < 10) {
    return undefined;
  }

  let len = buf[start + 1];
  let type = buf[start + 2];
  let msgflag = buf[start + 6];
  let msgtype = buf[start + 9];
  let q7message = [];

  // 缓存数据比较大于或等于 (len + 1-chksum)
  // len从长度字节开始到chksum
  // 若body为N，那么len=N+10（除0xaa之后9个字节+chksum）
  // pkglen=1+len
	let pkglen = len + 1; // 1为0xaa 
	
	// console.log(">>CHECK start=" + start + ", BUFF=" + buf);
	// console.log(">>BUFLEN=" + buflen + ", PKGLEN=" + pkglen);

  if (buflen < pkglen) {
    return undefined;
  }

  for (i = start; i < (pkglen + start); i++) {
		let index = i - start;
    q7message[index] = buf[i];
  }

  // checksum
  let end = i;
  let chksum = buf[i-1];
  // console.log("i=" + i + ", chksum=" + chksum);

	// 检查校验
	// 校验冲LEN字节开始，长度为LEN - 1
	let _start = 1;
	let _end = q7message.length - 1;
  let calsum = makeSum(q7message, _start, _end);

  if (chksum !== calsum) {
		console.log(">>makeSum: !!! chksum=" + chksum + ", calsum=" + calsum + ", i=" + i);
    return undefined;
  }

  // construct q7 packet
  let pkg = new q7Message();
  pkg.len = len;
  pkg.type = type;
  pkg.msgflag = msgflag;
  pkg.msgtype = msgtype;
  pkg.packet = q7message;
  pkg.chksum = chksum;

  // console.log(">>>>>>START: " + start + ", END=" + end);
  resetLastPacket(start, end);

  return pkg;
}

const resetLastPacket = function(start, end) {
	// console.log("end0 lastPakcet: " + lastPacket + ", len=" + lastPacket.length);

	let _end = lastPacket.length - 1;
	let _start = end;
	let newLastPacket = lastPacket.slice(_start, _end);

	//
	lastPacket = [];
	// console.log("end1 lastPacket: " + lastPacket + ", len=" + lastPacket.length);
	lastPacket = newLastPacket.slice();
	// console.log("end2 lastPacket: " + lastPacket + ", len=" + lastPacket.length);
};

const jsonToData = function(json) {
	if (json == undefined) return;

	console.log("jsonToData: ", json);
	let infoM = {};
	let bodyBytes = {};
	let cType;
	let query = json.query;
	let control = json.control;
	let status = json.status;

	// 当前为查询指令，构造固定二进制
	if (query) {
		cType = defq.BYTE_MSG_TYPE_QUERY;
		bodyBytes = packMsgQuery();
	} else if (control) {
		console.log("contron: ", control);

		// 先将原始状态转换为属性
		if (status) jsonToModel(status);

		// 将用户控制json转换为属性
		if (control) jsonToModel(control);

		// 菜单控制命令
		let subCmd = defq.subCmd;
		let infoM = packControlSubCmd(subCmd);
	} else console.log("Invalid command");

	infoM = getTotalMsg(bodyBytes, cType);
	console.log("infoM: ", infoM);

	return infoM;
};

const arrayToJson = function(msgBytes) {
	// console.log("*****msgBytes= " + msgBytes);

	// parser q7 dataframe
	// 处理业务数据
	handleMCUMessage(msgBytes);

	// AA3C2300000000000102AA5501000033855B030000000000000000000000000000000000000000000000001B0207BB02000000180004800000A0630008
	//let msgBytes = {};
	let msgLength = {};
	let bodyLength = {};

	props.dataType = msgBytes[9];
	props.subCmd = msgBytes[15];

	msgLength = msgBytes[1] + 1;
	bodyLength = msgLength - defq.BYTE_PROTOCOL_HEAD_LENGTH - 1;
	// console.log("msgLength=" + msgLength + ", bodyLength=" + bodyLength);

	// 获取body部分
	let bodyBytes = new Uint8Array(bodyLength);
	for (i = 0; i < bodyLength - 1; i++) {
		bodyBytes[i] = msgBytes[i + defq.BYTE_PROTOCOL_HEAD_LENGTH];
	}
	// console.log("bodyBytes=" + bodyBytes);

	let jsonObject = {};
	return jsonObject;
};

const dataToJson = function(jsonCmd) {
	if (jsonCmd == undefined) return;

	console.log("dataToJson: ", jsonCmd);
	let binData = jsonCmd.msg.data;

	console.log("binData: ", binData);

	// 转成hex/typeArray格式
	let msgBytes = new Uint8Array(
		binData.match(/[\da-f]{2}/gi).map(function(h) {
			return parseInt(h, 16);
		})
	);

	console.log(msgBytes);

	// AA3C2300000000000102AA5501000033855B030000000000000000000000000000000000000000000000001B0207BB02000000180004800000A0630008
	//let msgBytes = {};
	let msgLength = {};
	let bodyLength = {};

	props.dataType = msgBytes[9];
	props.subCmd = msgBytes[15];

	msgLength = msgBytes[1] + 1;
	bodyLength = msgLength - defq.BYTE_PROTOCOL_HEAD_LENGTH - 1;
	console.log("msgLength: %d, bodyLength: %d", msgLength, bodyLength);

	// 获取body部分
	let bodyBytes = new Uint8Array(bodyLength);
	for (i = 0; i < bodyLength - 1; i++) {
		bodyBytes[i] = msgBytes[i + defq.BYTE_PROTOCOL_HEAD_LENGTH];
	}
	console.log("bodyBytes: ", bodyBytes);

	// // bin to model
	// binToModel(bodyBytes);

	// //
	// let retJson = getJsonFromModel();

	return retJson;
};

const getJsonFromModel = function() {
	let json = {};

	// version
	json[defq.KEY_VERSION] = defq.VALUE_VERSION;

	//
	json[defq.KEY_PROTOCOL_VERSION] = props.protocolVersion;
	json[defq.KEY_WORK_MODE] = props.workMode;
	json[defq.KEY_WORK_STATUS] = props.workStatus;
	json[defq.KEY_SET_KEEP_WARM_TEMP] = props.setKeepWarmTemp;
	json[defq.KEY_SET_WORK_TEMP] = props.setWorkTemp;
	json[defq.KEY_ROTATE_DIRECTION] = props.rotateDirection;
	json[defq.KEY_SPEED] = props.speed;
	json[defq.KEY_MOUTHFEEL] = props.mouthfeel;

	// step status
	let stepStatus = props.stepStatus;
	let valss = "invalid";
	if (stepStatus == 0) valss = "invalid";
	else if (stepStatus == 1) valss = "speedHot";
	else if (stepStatus == 2) valss = "breakWall";
	else if (stepStatus == 3) valss = "infusion";
	else if (stepStatus == 4) valss = "pithy";
	else if (stepStatus == 5) valss = "aroma";
	else if (stepStatus == 255) valss = "making";

	json[defq.KEY_STEP_STATUS] = valss;

	json[defq.KEY_CUP_STATUS] = props.cupStatus;
	json[defq.KEY_ERROR_CODE] = props.errorCode;
	json[defq.KEY_CONTROL_SRC] = props.controlSrc;
	json[defq.KEY_SET_APPOINT_TIME_SEC] = props.setAppointTimeSec;
	json[defq.KEY_SET_WORK_TIME_SEC] = props.setWorkTimeSec;
	json[defq.KEY_SET_KEEP_WARM_TIME_SEC] = props.setKeepWarmTimeSec;
	json[defq.KEY_CURRENT_BOTTOM_TEMP] = props.currentBottomTemp;
	json[defq.KEY_CURRENT_STEP] = props.currentStep;
	json[defq.KEY_TOTAL_STEP] = props.totalStep;
	json[defq.KEY_ACK_TYPE] = props.ackType;
	json[defq.KEY_REMAIN_APPOINT_TIME_SEC] = props.remainAppointTimeSec;
	json[defq.KEY_REMAIN_WORK_TIME_SEC] = props.remainWorkTimeSec;
	json[defq.KEY_KEEP_WARM_TIME_SEC] = props.keepWarmTimeSec;
	json[defq.KEY_APPOINT_ACTUAL_WORK_TIME_SEC] = props.appointActualWorkTimeSec;

	// flag
	json[defq.KEY_FLAG_LID_STATUS] = props.flagLidStatus;
	json[defq.KEY_FLAG_FINISHED] = props.flagFinished;
	json[defq.KEY_FLAG_OFF_SCREEN] = props.flagOffScreen;
	json[defq.KEY_FLAG_HORSE_RACE_LAMP] = props.flagHorseRaceLamp;
	json[defq.KEY_FLAG_POWER] = props.flagPower;
	json[defq.KEY_FLAG_SPILL] = props.flagSpill;
	json[defq.KEY_FLAG_ONCE_COOK] = props.flagOnceCook;
	json[defq.KEY_FLAG_KEEP_WARM] = props.flagKeepWarm;
	json[defq.KEY_FLAG_QUICK_COOKING] = props.flagQuickCooking;
	json[defq.KEY_FLAG_KEEP_WARM_SWITCH] = props.flagKeepWarmSwitch;
	json[defq.KEY_FLAG_WEIGH_WORKING] = props.flagWeighWorking;
	json[defq.KEY_FLAG_STABLE_WEIGHT] = props.flagStableWeight;

	// diy
	json[defq.KEY_DIY_CUR_STEP] = props.diyCurStep;

	// console.log("getJsonFromModel=" + json);

	return json;
};

const packMsgQuery = function() {
	console.log("packMsgQuery");
	let bodyBytes = new Uint8Array(6);
	for (i = 0; i < 6; i++) {
		bodyBytes[i] = 0;
	}
	bodyBytes[0] = 0xaa;
	bodyBytes[1] = 0x55;
	bodyBytes[3] = 0x31;
	hexPrint(bodyBytes);
	return bodyBytes;
};

const getTotalMsg = function(bodyData, cType) {
	console.log("getTotalMsg=" + bodyData + ", cType=" + cType + ", bodyLength=" + bodyData.length);

	let bodyLength = bodyData.length + 1;
	let msgLength = bodyLength + defq.BYTE_PROTOCOL_HEAD_LENGTH;
	let msgBytes = new Uint8Array(msgLength);
	console.log("msgLength=" + msgLength);
	for (i = 0; i < msgLength - 1; i++) msgBytes[i] = 0;

	// 构造消息部分
	msgBytes[0] = defq.BYTE_PROTOCOL_HEAD;
	msgBytes[1] = msgLength - 1;
	msgBytes[2] = defq.BYTE_DEVICE_TYPE;
	msgBytes[8] = 0x01;
	msgBytes[9] = cType;

	for (i = 0; i < bodyLength - 1; i++) 
		msgBytes[i + defq.BYTE_PROTOCOL_HEAD_LENGTH] = bodyData[i];

	// checksum
	msgBytes[msgLength - 2] = makeSum(msgBytes, 0, msgLength - 3);

	let infoM = msgBytes;
	let hex = buf2hex(infoM.buffer);

	console.log("getTotalMsg=" + hex);

	return infoM;
};

const makeSum = function(tmpbuf, _start, _end) {
	let resVal = 0;

	// console.log(">>makeSum: _start=" + _start + ", _end=" + _end + ", q7=" + tmpbuf);

	for (si = _start; si < _end; si++) {
		resVal = resVal + tmpbuf[si];
	}

	resVal = ~resVal + 1;
	resVal = resVal & 0x00ff;

	// console.log("makeSum: resVal=" + resVal);

	return resVal;
};

const jsonToModel = function(jsonCmd) {
	console.log("jsonToModel: jsonCmd=" + jsonCmd);

	// 子命令
	let subCmd = jsonCmd.subCmd;
	if (subCmd) props.subCmd = subCmd;

	// 工作模式
	let workMode = json.workMode;
	if (workMode) props.workMode = workMode;

	// 控制编码
	let codeId = json.codeId;
	if (codeId) props.codeId = codeId;

	// 保温目标温度
	let setKeepWarmTemp = json.setKeepWarmTemp;
	if (setKeepWarmTemp) props.setKeepWarmTemp;

	// 加热目标温度
	let setWorkTemp = json.setWorkTemp;
	if (setWorkTemp) props.setWorkTemp = setWorkTemp;

	// 正反转标识
	let rotateDirection = json.rotateDirection;
	if (rotateDirection) props.rotateDirection = rotateDirection;

	// 工作速度
	let speed = json.speed;
	if (speed) props.speed = speed;

	// 口感
	let mouthfeel = json.mouthfeel;
	if (mouthfeel) props.mouthfeel = mouthfeel;

	// 控制来源
	let controlSrc = json.controlSrc;
	if (controlSrc) props.controlSrc = controlSrc;

	// 工作开关
	let iworkSwitch = json.workSwitch;
	if (iworkSwitch == "cancel") props.workSwitch = 0;
	else if (iworkSwitch == "schedule") props.workSwitch = 2;
	else if (iworkSwitch == "work") props.workSwitch = 1;

	// 预约设置时间秒
	let isetAppointTimeSec = json.setAppointTimeSec;
	if (isetAppointTimeSec) {
		let tempSec = Number(isetAppointTimeSec);

		props.setAppointTimeHour = getTimeHour(tempSec);
		props.setAppointTimeMin = getTimeMin(tempSec);
		props.setAppointTimeSec = getTimeSec(tempSec);
	}

	// 工作设置时间秒
	let isetWorkTimeSec = json.setAppointTimeSec;
	if (isetWorkTimeSec) {
		let tempSec = Number(isetWorkTimeSec);

		props.setWorkTimeHour = getTimeHour(tempSec);
		props.setWorkTimeMin = getTimeMin(tempSec);
		props.setWorkTimeSec = getTimeSec(tempSec);
	}

	// 保温设置时间秒
	let isetKeepWarmTimeSec = json.setKeepWarmTimeSec;
	if (isetKeepWarmTimeSec) {
		let tempSec = Number(isetKeepWarmTimeSec);

		props.setKeepWarmTimeHour = getTimeHour(tempSec);
		props.setKeepWarmTimeMin = getTimeMin(tempSec);
		props.setKeepWarmTimeSec = getTimeSec(tempSec);
	}

	// 保温开关标识
	let flagKeepWarmSwitch = json.flagKeepWarmSwitch;
	if (flagKeepWarmSwitch) props.flagKeepWarmSwitch = flagKeepWarmSwitch;

	// 调整选项
	let flagAdjustOption = json.flagAdjustOption;
	if (flagAdjustOption) props.flagAdjustOption = flagAdjustOption;

	let totalStep = json.totalStep;
	if (totalStep) props.totalStep = totalStep;

	let currentStep = json.currentStep;
	if (currentStep) props.currentStep = currentStep;

	let diyTotalStep = json.diyTotalStep;
	if (diyTotalStep) props.diyTotalStep;

	let diyParams = json.diyParams;
	if (diyParams) props.diyParams = diyParams;
};

const packControlSubCmd = function(subCmd) {
	console.log("packontrolSubCmd: subCmd=" + subCmd);

	let infoM = {};

	return infoM;
};

const hexPrint = function(data) {
	let hex = buf2hex(data.buffer);
	console.log("hex=" + hex);
};

// buffer is an ArrayBuffer
const buf2hex = function(buffer) {
	return Array.prototype.map.call(new Uint8Array(buffer), (x) => ("00" + x.toString(16)).slice(-2)).join("");
};

// 获取时间秒：小时
const getTimeHour = function(tempSec) {
	return tempSec % 3600;
};

// 获取时间秒：分钟
const getTimeMin = function(tempSec) {
	let timeHour = tempSec % 3600;
	let timeMin = (tempSec - timeHour * 3600) % 60;

	return timeMin;
};

// 获取时间秒：秒
const getTimeSec = function(tempSec) {
	let timeHour = tempSec % 3600;
	let timeMin = (tempSec - timeHour * 3600) % 60;
	let timeSec = tempSec - setWorkTimeHour * 3600 - setWorkTimeMin * 60;
	return timeSec;
};

// module.exports.parsePacket = parsePacket;
module.exports.onData = onData;
module.exports.jsonToData = jsonToData;
module.exports.dataToJson = dataToJson;

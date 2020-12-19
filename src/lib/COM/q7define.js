/* eslint-disable*/

let uptable = {
  KEY_VERSION:  "version",
  VALUE_VERSION:  5,

  //-----------------JSON相关key值变量-----------------
  //--子命令
  KEY_SUB_CMD:  "subCmd",
  //--模式
  KEY_WORK_MODE:  "workMode",
  //--控制编码
  KEY_CODE_ID:  "codeId",
  //--工作状态
  KEY_WORK_STATUS:  "workStatus",
  //--保温目标温度
  KEY_SET_KEEP_WARM_TEMP: "setKeepWarmTemp",
  //--加热目标温度
  KEY_SET_WORK_TEMP:  "setWorkTemp",
  //--工作速度
  KEY_SPEED:  "speed",
  //--口感
  KEY_MOUTHFEEL:  "mouthfeel",
  //--工作阶段
  KEY_STEP_STATUS:  "stepStatus",
  //--杯身状态
  KEY_CUP_STATUS: "cupStatus",
  //--当前底部实时温度
  KEY_CURRENT_BOTTOM_TEMP:  "currentBottomTemp",
  //--故障代码
  KEY_ERROR_CODE: "errorCode",
  //--电控协议版本
  KEY_PROTOCOL_VERSION: "protocolVersion",
  //--控制来源
  KEY_CONTROL_SRC:  "controlSrc",
  //--工作开关
  KEY_WORK_SWITCH:  "workSwitch",
  //--预约设置时间秒
  KEY_SET_APPOINT_TIME_SEC: "setAppointTimeSec",
  //--工作设置时间秒
  KEY_SET_WORK_TIME_SEC:  "setWorkTimeSec",
  //--保温设置时间秒
  KEY_SET_KEEP_WARM_TIME_SEC: "setKeepWarmTimeSec",
  //--正反转标志
  KEY_ROTATE_DIRECTION: "rotateDirection",
  //--应答类型
  KEY_ACK_TYPE: "ackType",
  //--预约剩余时间秒
  KEY_REMAIN_APPOINT_TIME_SEC:  "remainAppointTimeSec",
  //--工作剩余时间秒
  KEY_REMAIN_WORK_TIME_SEC: "remainWorkTimeSec",
  //--保温时间秒
  KEY_KEEP_WARM_TIME_SEC: "keepWarmTimeSec",
  //--预约状态菜单实际烹饪时间
  KEY_APPOINT_ACTUAL_WORK_TIME_SEC: "appointActualWorkTimeSec",
  //--杯盖状态标识
  KEY_FLAG_LID_STATUS:  "flagLidStatus",
  //--工作完成标识
  KEY_FLAG_FINISHED:  "flagFinished",
  //--保温开关标识
  KEY_FLAG_KEEP_WARM: "flagKeepWarm",
  //--跑马灯显示标识
  KEY_FLAG_HORSE_RACE_LAMP: "flagHorseRaceLamp",
  //--熄屏标识
  KEY_FLAG_OFF_SCREEN:  "flagOffScreen",
  //--开关机标识
  KEY_FLAG_POWER: "flagPower",
  //--防溢状态标识
  KEY_FLAG_SPILL: "flagSpill",
  //--一锅鲜标识
  KEY_FLAG_ONCE_COOK: "flagOnceCook",
  //--加热功率
  KEY_HEATING_POWER:  "heatingPower",
  //--食谱当前步骤
  KEY_CURRENT_STEP: "currentStep",
  //--食谱总步骤
  KEY_TOTAL_STEP: "totalStep",
  //--重量
  KEY_WEIGHT: "weight",
  //--一锅鲜烹饪标识位
  KEY_FLAG_QUICK_COOKING: "flagQuickCooking",
  //--保温开关标识
  KEY_FLAG_KEEP_WARM_SWITCH:  "flagKeepWarmSwitch",
  //--称重工作标识位
  KEY_FLAG_WEIGH_WORKING: "flagWeighWorking",
  //--重量稳定标识
  KEY_FLAG_STABLE_WEIGHT: "flagStableWeight",
  //--DIY步骤工作模式
  KEY_STEP_WORK_MODE: "stepWorkMode",
  //--调整选项
  KEY_FLAG_ADJUST_OPTION: "flagAdjustOption",
  //--diy当前步骤
  KEY_DIY_CUR_STEP: "diyCurStep",
  //--diy总步骤
  KEY_DIY_TOTAL_STEP: "diyTotalStep",
  //--DIY参数
  KEY_DIY_PARAMS: "diyParams",
  //----------------JSON相关value值变量----------------

  //-----------------二进制相关属性变量----------------
  //--设备（西式烹饪机）
  BYTE_DEVICE_TYPE: 0x23,
  //--控制命令
  BYTE_MSG_TYPE_CONTROL:  0x02,
  //--查询命令
  BYTE_MSG_TYPE_QUERY:  0x03,
  //--M-smart协议头
  BYTE_PROTOCOL_HEAD: 0xAA,
  //--M-smart协议头长度
  BYTE_PROTOCOL_HEAD_LENGTH:  0x0A,
};

let props = {
 //-------------------定义属性变量--------------------
  //--子命令
  subCmd: 0,
  //--工作模式
  workMode: 0,
  //--控制编码
  codeId: 0,
  //--保温目标温度
  setKeepWarmTemp:  0,
  //--加热目标温度
  setWorkTemp:  0,
  //--正反转标识
  rotateDirection:  0,
  //--工作速度
  speed:  0,
  //--口感
  mouthfeel:  0,
  //--控制来源
  controlSrc: 0,
  //--工作开关
  workSwitch: 0,
  //--预约设置时间秒
  setAppointTimeSec:  0,
  //--预约设置时间分
  setAppointTimeMin:  0,
  //--预约设置时间时
  setAppointTimeHour: 0,
  //--工作设置时间秒
  setWorkTimeSec: 0,
  //--工作设置时间分
  setWorkTimeMin: 0,
  //--工作设置时间时
  setWorkTimeHour:  0,
  //--保温设置时间秒
  setKeepWarmTimeSec: 0,
  //--保温设置时间分
  setKeepWarmTimeMin: 0,
  //--保温设置时间时
  setKeepWarmTimeHour:  0,

  protocolVersion:  0,

  ackType:  0,
  //--工作状态
  workStatus: 0,
  //--故障代码
  errorCode:  0,
  //--预约剩余时间秒
  remainAppointTimeSec: 0,
  //--工作剩余时间秒
  remainWorkTimeSec:  0,
  //--保温时间秒
  keepWarmTimeSec:  0,
  //--预约状态菜单实际烹饪时间秒
  appointActualWorkTimeSec: 0,
  //--工作阶段
  stepStatus: 0,
  //--盖子状态
  flagLidStatus:  0,
  //--工作完成标识
  flagFinished: 0,
  //--跑马灯显示标识
  flagHorseRaceLamp:  0,
  //--熄屏标识
  flagOffScreen:  0,
  //--开关机标识
  flagPower:  0,
  //--防溢标识
  flagSpill:  0,
  //--一锅鲜标识
  flagOnceCook: 0,
  //--保温开关标识
  flagKeepWarm: 0,
  //--杯身状态
  cupStatus:  0,
  //--当前底部实时温度
  currentBottomTemp:  0,
  //--食谱当前步骤
  currentStep:  0,
  //--食谱总步骤
  totalStep:  0,
  //--加热功率
  heatingPower: 0,
  //--数据返回类型（查询返回，控制返回，主动上报）
  dataType: 0,
  //--一锅鲜烹饪标识位
  flagQuickCooking: 0,
  //--保温开关标识
  flagKeepWarmSwitch: 0,
  //--称重工作标识位
  flagWeighWorking: 0,
  //--重量稳定标识
  flagStableWeight: 0,
  //--DIY步骤工作模式
  stepWorkMode: 1,
  //--调整选项
  flagAdjustOption: 1,
  //--diy当前步骤
  diyCurStep: 0,
  diyTotalStep: 0,
  diyParams:  0,
}

module.exports.DEFINE = uptable;
module.exports.props = props;
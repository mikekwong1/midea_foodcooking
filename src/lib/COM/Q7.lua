----西式烹饪机协议解析

local JSON = require "cjson"
-- local bit = require "bit"
--版本号
local KEY_VERSION = "version"
local VALUE_VERSION = "5"

local uptable = {

    -----------------JSON相关key值变量-----------------
    --子命令
    KEY_SUB_CMD = "sub_cmd",
    --模式
    KEY_WORK_MODE = "work_mode",
    --控制编码
    KEY_CODE_ID = "code_id",
    --工作状态
    KEY_WORK_STATUS = "work_status",
    --保温目标温度
    KEY_SET_KEEP_WARM_TEMP = "set_keep_warm_temp",
    --加热目标温度
    KEY_SET_WORK_TEMP = "set_work_temp",
    --工作速度
    KEY_SPEED = "speed",
    --口感
    KEY_MOUTHFEEL = "mouthfeel",
    --工作阶段
    KEY_STEP_STATUS = "step_status",
    --杯身状态
    KEY_CUP_STATUS = "cup_status",
    --当前底部实时温度
    KEY_CURRENT_BOTTOM_TEMP = "current_bottom_temp",
    --故障代码
    KEY_ERROR_CODE = "error_code",
    --电控协议版本
    KEY_PROTOCOL_VERSION = "protocol_version",
    --控制来源
    KEY_CONTROL_SRC = "control_src",
    --工作开关
    KEY_WORK_SWITCH = "work_switch",
    --预约设置时间秒
    KEY_SET_APPOINT_TIME_SEC = "set_appoint_time_sec",
    --工作设置时间秒
    KEY_SET_WORK_TIME_SEC = "set_work_time_sec",
    --保温设置时间秒
    KEY_SET_KEEP_WARM_TIME_SEC = "set_keep_warm_time_sec",
    --正反转标志
    KEY_ROTATE_DIRECTION = "rotate_direction",
    --应答类型
    KEY_ACK_TYPE = "ack_type",
    --预约剩余时间秒
    KEY_REMAIN_APPOINT_TIME_SEC = "remain_appoint_time_sec",
    --工作剩余时间秒
    KEY_REMAIN_WORK_TIME_SEC = "remain_work_time_sec",
    --保温时间秒
    KEY_KEEP_WARM_TIME_SEC = "keep_warm_time_sec",
    --预约状态菜单实际烹饪时间
    KEY_APPOINT_ACTUAL_WORK_TIME_SEC = "appoint_actual_work_time_sec",
    --杯盖状态标识
    KEY_FLAG_LID_STATUS = "flag_lid_status",
    --工作完成标识
    KEY_FLAG_FINISHED = "flag_finished",
    --保温开关标识
    KEY_FLAG_KEEP_WARM = "flag_keep_warm",
    --跑马灯显示标识
    KEY_FLAG_HORSE_RACE_LAMP = "flag_horse_race_lamp",
    --熄屏标识
    KEY_FLAG_OFF_SCREEN = "flag_off_screen",
    --开关机标识
    KEY_FLAG_POWER = "flag_power",
    --防溢状态标识
    KEY_FLAG_SPILL = "flag_spill",
    --一锅鲜标识
    KEY_FLAG_ONCE_COOK = "flag_once_cook",
    --加热功率
    KEY_HEATING_POWER = "heating_power",
    --食谱当前步骤
    KEY_CURRENT_STEP = "current_step",
    --食谱总步骤
    KEY_TOTAL_STEP = "total_step",
    --重量
    KEY_WEIGHT = "weight",
    --一锅鲜烹饪标识位
    KEY_FLAG_QUICK_COOKING = "flag_quick_cooking",
    --保温开关标识
    KEY_FLAG_KEEP_WARM_SWITCH = "flag_keep_warm_switch",
    --称重工作标识位
    KEY_FLAG_WEIGH_WORKING = "flag_weigh_working",
    --重量稳定标识
    KEY_FLAG_STABLE_WEIGHT = "flag_stable_weight",
    --DIY步骤工作模式
    KEY_STEP_WORK_MODE = "step_work_mode",
    --调整选项
    KEY_FLAG_ADJUST_OPTION = "flag_adjust_option",
    --diy当前步骤
    KEY_DIY_CUR_STEP = "diy_cur_step",
    --diy总步骤
    KEY_DIY_TOTAL_STEP = "diy_total_step",
    --DIY参数
    KEY_DIY_PARAMS = "diy_params",
    ----------------JSON相关value值变量----------------

    -----------------二进制相关属性变量----------------
    --设备（西式烹饪机）
    BYTE_DEVICE_TYPE = 0x23,
    --控制命令
    BYTE_MSG_TYPE_CONTROL = 0x02,
    --查询命令
    BYTE_MSG_TYPE_QUERY = 0x03,
    --M-smart协议头
    BYTE_PROTOCOL_HEAD = 0xAA,
    --M-smart协议头长度
    BYTE_PROTOCOL_HEAD_LENGTH = 0x0A,

    -------------------定义属性变量--------------------
    --子命令
    subCmd = 0,
    --工作模式
    workMode = 0,
    --控制编码
    codeId = 0,
    --保温目标温度
    setKeepWarmTemp = 0,
    --加热目标温度
    setWorkTemp = 0,
    --正反转标识
    rotateDirection = 0,
    --工作速度
    speed = 0,
    --口感
    mouthfeel = 0,
    --控制来源
    controlSrc = 0,
    --工作开关
    workSwitch = 0,
    --预约设置时间秒
    setAppointTimeSec = 0,
    --预约设置时间分
    setAppointTimeMin = 0,
    --预约设置时间时
    setAppointTimeHour = 0,
    --工作设置时间秒
    setWorkTimeSec = 0,
    --工作设置时间分
    setWorkTimeMin = 0,
    --工作设置时间时
    setWorkTimeHour = 0,
    --保温设置时间秒
    setKeepWarmTimeSec = 0,
    --保温设置时间分
    setKeepWarmTimeMin = 0,
    --保温设置时间时
    setKeepWarmTimeHour = 0,

    protocolVersion = 0,

    ackType = 0,
    --工作状态
    workStatus = 0,
    --故障代码
    errorCode = 0,
    --预约剩余时间秒
    remainAppointTimeSec = 0,
    --工作剩余时间秒
    remainWorkTimeSec = 0,
    --保温时间秒
    keepWarmTimeSec = 0,
    --预约状态菜单实际烹饪时间秒
    appointActualWorkTimeSec = 0,
    --工作阶段
    stepStatus = 0,
    --盖子状态
    flagLidStatus = 0,
    --工作完成标识
    flagFinished = 0,
    --跑马灯显示标识
    flagHorseRaceLamp = 0,
    --熄屏标识
    flagOffScreen = 0,
    --开关机标识
    flagPower = 0,
    --防溢标识
    flagSpill = 0,
    --一锅鲜标识
    flagOnceCook = 0,
    --保温开关标识
    flagKeepWarm = 0,
    --杯身状态
    cupStatus = 0,
    --当前底部实时温度
    currentBottomTemp = 0,
    --食谱当前步骤
    currentStep = 0,
    --食谱总步骤
    totalStep = 0,
    --加热功率
    heatingPower = 0,
    --数据返回类型（查询返回，控制返回，主动上报）
    dataType = 0,
    --一锅鲜烹饪标识位
    flagQuickCooking = 0,
    --保温开关标识
    flagKeepWarmSwitch = 0,
    --称重工作标识位
    flagWeighWorking = 0,
    --重量稳定标识
    flagStableWeight = 0,
    --DIY步骤工作模式
    stepWorkMode = 1,
    --调整选项
    flagAdjustOption = 1,
    --diy当前步骤
    diyCurStep = 0,
    diyTotalStep = 0,
    diyParams = 0,
}

--String转int
local function string2Int(data)
    if (not data) then
        data = tonumber("0")
    end
    data = tonumber(data)
    if(data == nil) then
        data = 0
    end
    return data
end
--int转String
local function int2String(data)
    if (not data) then
        data = tostring(0)
    end
    data = tostring(data)
    if(data == nil) then
        data = "0"
    end
    return data
end
--table 转 string
local function table2string(cmd)
    local ret = ""
    local i
    for i = 1, #cmd do
        ret = ret..string.char(cmd[i])
    end
    return ret
end
--十六进制 string 转 table
local function string2table(hexstr)
    local tb = {}
    local i = 1
    local j = 1
    for i = 1, #hexstr - 1, 2 do
        local doublebytestr = string.sub(hexstr, i, i + 1)
        tb[j] = tonumber(doublebytestr, 16)
        j = j + 1
    end
    return tb
end
--十六进制 string 输出
local function string2hexstring(str)
    local ret = ""
    for i = 1, #str do
        ret = ret .. string.format("%02x", str:byte(i))
    end
    return ret
end
-- 字符串分割  return table
local function splitStrByChar(str, sepChar)
    local splitList = {}
    local pattern = '[^' .. sepChar .. ']+'
    string.gsub(str, pattern, function(w) table.insert(splitList, w) end)
    return splitList
end

--sum校验
local function makeSum(tmpbuf, start_pos, end_pos)
    local resVal = 0
    for si = start_pos, end_pos do
        resVal = resVal + tmpbuf[si]
    end
    resVal = bit.bnot(resVal) + 1
    resVal = bit.band(resVal, 0x00FF)
    return resVal
end

-----------根据电控协议不同，需要改变的函数-------------
--根据 json 修改属性变量
local function jsonToModel(jsonCmd)
    local streams = jsonCmd
    --子命令
    if(streams[uptable["KEY_SUB_CMD"]] ~= nil) then
        uptable["subCmd"] = string2Int(streams[uptable["KEY_SUB_CMD"]])
    end

    --工作模式
    if(streams[uptable["KEY_WORK_MODE"]] ~= nil) then
        uptable["workMode"] = string2Int(streams[uptable["KEY_WORK_MODE"]])
    end

    --控制编码
    if(streams[uptable["KEY_CODE_ID"]] ~= nil) then
        uptable["codeId"] = string2Int(streams[uptable["KEY_CODE_ID"]])
    end

    --保温目标温度
    if(streams[uptable["KEY_SET_KEEP_WARM_TEMP"]] ~= nil) then
        uptable["setKeepWarmTemp"] = string2Int(streams[uptable["KEY_SET_KEEP_WARM_TEMP"]])
    end

    --加热目标温度
    if(streams[uptable["KEY_SET_WORK_TEMP"]] ~= nil) then
        uptable["setWorkTemp"] = string2Int(streams[uptable["KEY_SET_WORK_TEMP"]])
    end

    --正反转标识
    if(streams[uptable["KEY_ROTATE_DIRECTION"]] ~= nil) then
        uptable["rotateDirection"] = string2Int(streams[uptable["KEY_ROTATE_DIRECTION"]])
    end

    --工作速度
    if(streams[uptable["KEY_SPEED"]] ~= nil) then
        uptable["speed"] = string2Int(streams[uptable["KEY_SPEED"]])
    end

    --口感
    if(streams[uptable["KEY_MOUTHFEEL"]] ~= nil) then
        uptable["mouthfeel"] = string2Int(streams[uptable["KEY_MOUTHFEEL"]])
    end

    --控制来源
    if(streams[uptable["KEY_CONTROL_SRC"]] ~= nil) then
        uptable["controlSrc"] = string2Int(streams[uptable["KEY_CONTROL_SRC"]])
    end

    --工作开关
    if(streams[uptable["KEY_WORK_SWITCH"]] == "cancel") then
        uptable["workSwitch"] = 0
    elseif(streams[uptable["KEY_WORK_SWITCH"]] == "schedule") then
        uptable["workSwitch"] = 2
    elseif(streams[uptable["KEY_WORK_SWITCH"]] == "work") then
        uptable["workSwitch"] = 1
    end

    --预约设置时间秒
    if(streams[uptable["KEY_SET_APPOINT_TIME_SEC"]] ~= nil) then
        local temp = string2Int(streams[uptable["KEY_SET_APPOINT_TIME_SEC"]])

        uptable["setAppointTimeHour"] = math.modf(temp / 3600)
        uptable["setAppointTimeMin"] = math.modf((temp - uptable["setAppointTimeHour"] * 3600) / 60)
        uptable["setAppointTimeSec"] = temp - uptable["setAppointTimeHour"] * 3600 - uptable["setAppointTimeMin"] * 60
    end

    --工作设置时间秒
    if(streams[uptable["KEY_SET_WORK_TIME_SEC"]] ~= nil) then
        local temp = string2Int(streams[uptable["KEY_SET_WORK_TIME_SEC"]])

        uptable["setWorkTimeHour"] = math.modf(temp / 3600)
        uptable["setWorkTimeMin"] = math.modf((temp - uptable["setWorkTimeHour"] * 3600) / 60)
        uptable["setWorkTimeSec"] = temp - uptable["setWorkTimeHour"] * 3600 - uptable["setWorkTimeMin"] * 60
    end

    --保温设置时间秒
    if(streams[uptable["KEY_SET_KEEP_WARM_TIME_SEC"]] ~= nil) then
        local temp = string2Int(streams[uptable["KEY_SET_KEEP_WARM_TIME_SEC"]])

        uptable["setKeepWarmTimeHour"] = math.modf(temp / 3600)
        uptable["setKeepWarmTimeMin"] = math.modf((temp - uptable["setKeepWarmTimeHour"] * 3600) / 60)
        uptable["setKeepWarmTimeSec"] = temp - uptable["setKeepWarmTimeHour"] * 3600 - uptable["setKeepWarmTimeMin"] * 60
    end

    --保温开关标识
    if(streams[uptable["KEY_FLAG_KEEP_WARM_SWITCH"]] ~= nil) then
        uptable["flagKeepWarmSwitch"] = string2Int(streams[uptable["KEY_FLAG_KEEP_WARM_SWITCH"]])
    end

    --调整选项
    if(streams[uptable["KEY_FLAG_ADJUST_OPTION"]] ~= nil) then
        uptable["flagAdjustOption"] = string2Int(streams[uptable["KEY_FLAG_ADJUST_OPTION"]])
    end

    if(streams[uptable["KEY_TOTAL_STEP"]] ~= nil) then
        uptable["totalStep"] = string2Int(streams[uptable["KEY_TOTAL_STEP"]])
    end
    if(streams[uptable["KEY_CURRENT_STEP"]] ~= nil) then
        uptable["currentStep"] = string2Int(streams[uptable["KEY_CURRENT_STEP"]])
    end
    if(streams[uptable["KEY_DIY_TOTAL_STEP"]] ~= nil) then
        uptable["diyTotalStep"] = string2Int(streams[uptable["KEY_DIY_TOTAL_STEP"]])
    end
    --DIY参数
    if(streams[uptable["KEY_DIY_PARAMS"]] ~= nil) then
        uptable["diyParams"] = streams[uptable["KEY_DIY_PARAMS"]]
    end
end

--根据 bin 修改属性变量
local function binToModel(binData)
    if (#binData < 11) then
        return nil
    end
    local messageBytes = binData
    if (uptable["dataType"] == 0x02 and uptable["subCmd"] == 0x20) or (uptable["dataType"] == 0x02 and uptable["subCmd"] == 0x21) or (uptable["dataType"] == 0x02 and uptable["subCmd"] == 0x22) or (uptable["dataType"] == 0x02 and uptable["subCmd"] == 0x23) or (uptable["dataType"] == 0x02 and uptable["subCmd"] == 0x24) or (uptable["dataType"] == 0x02 and uptable["subCmd"] == 0x33) or (uptable["dataType"] == 0x03 and uptable["subCmd"] == 0x31) or (uptable["dataType"] == 0x04 and uptable["subCmd"] == 0x04) then
        --电控协议版本
        uptable["protocolVersion"] = messageBytes[2]

        uptable["ackType"] = messageBytes[3]

        uptable["controlSrc"] = messageBytes[4]
        --工作模式
        uptable["workMode"] = messageBytes[6] + messageBytes[7] * 256 + messageBytes[8] * 65536 + messageBytes[9] * 16777216
        --工作状态
        uptable["workStatus"] = messageBytes[10]
        --故障信息
        uptable["errorCode"] = messageBytes[11]
        --预约剩余时间秒
        uptable["remainAppointTimeSec"] = messageBytes[12] * 3600 + messageBytes[13] * 60 + messageBytes[14]
        --工作剩余时间秒
        uptable["remainWorkTimeSec"] = messageBytes[15] * 3600 + messageBytes[16] * 60 + messageBytes[17]
        --保温时间
        uptable["keepWarmTimeSec"] = messageBytes[18] * 3600 + messageBytes[19] * 60 + messageBytes[20]
        --预约设置时间
        uptable["setAppointTimeSec"] = messageBytes[21] * 3600 + messageBytes[22] * 60 + messageBytes[23]
        --预约状态菜单实际烹饪时间
        uptable["appointActualWorkTimeSec"] = messageBytes[24] * 3600 + messageBytes[25] * 60 + messageBytes[26]
        --工作设置时间
        uptable["setWorkTimeSec"] = messageBytes[27] * 3600 + messageBytes[28] * 60 + messageBytes[29]
        --保温设置时间
        uptable["setKeepWarmTimeSec"] = messageBytes[30] * 3600 + messageBytes[31] * 60 + messageBytes[32]
        --当前底部实时温度
        uptable["currentBottomTemp"] = messageBytes[33]
        --食谱当前步骤
        uptable["currentStep"] = messageBytes[34]
        --食谱总步骤
        uptable["totalStep"] = messageBytes[35]
        --工作阶段
        uptable["stepStatus"] = messageBytes[38]
        --口感
        uptable["mouthfeel"] = messageBytes[39]
        --DIY当前步骤
        uptable["diyCurStep"] = messageBytes[40]
        --杯盖开合状态
        uptable["flagLidStatus"] = bit.band(messageBytes[41], 0x01)
        --工作完成标识
        uptable["flagFinished"] = bit.rshift(bit.band(messageBytes[41], 0x02), 1)
        --跑马灯显示标识
        uptable["flagHorseRaceLamp"] = bit.rshift(bit.band(messageBytes[41], 0x04), 2)
        --熄屏标识
        uptable["flagOffScreen"] = bit.rshift(bit.band(messageBytes[41], 0x08), 3)
        --开关机标识
        uptable["flagPower"] = bit.rshift(bit.band(messageBytes[41], 0x10), 4)
        --防溢状态标识
        uptable["flagSpill"] = bit.rshift(bit.band(messageBytes[41], 0x20), 5)
        --一锅鲜标识
        uptable["flagQuickCooking"] = bit.rshift(bit.band(messageBytes[41], 0x40), 6)
        --保温开关标识
        uptable["flagKeepWarmSwitch"] = bit.rshift(bit.band(messageBytes[41], 0x80), 7)
        --称重状态
        uptable["flagWeighWorking"] = bit.band(messageBytes[42], 0x01)
        --杯身状态
        uptable["cupStatus"] = messageBytes[43]
        --正反转标识
        uptable["rotateDirection"] = bit.rshift(bit.band(messageBytes[44], 0x80), 7)
        --工作速度
        uptable["speed"] = bit.band(messageBytes[44], 0x7F)
        --加热目标温度
        uptable["setWorkTemp"] = messageBytes[45]
        --保温目标温度
        uptable["setKeepWarmTemp"] = messageBytes[46]

    end
end

local function getStreamsFromModel()
    local streams = {}

    streams[KEY_VERSION] = VALUE_VERSION
    streams[uptable["KEY_PROTOCOL_VERSION"]] = int2String(uptable["protocolVersion"])
    streams[uptable["KEY_WORK_MODE"]] = int2String(uptable["workMode"])
    streams[uptable["KEY_WORK_STATUS"]] = int2String(uptable["workStatus"])
    streams[uptable["KEY_SET_KEEP_WARM_TEMP"]] = int2String(uptable["setKeepWarmTemp"])
    streams[uptable["KEY_SET_WORK_TEMP"]] = int2String(uptable["setWorkTemp"])
    streams[uptable["KEY_ROTATE_DIRECTION"]] = int2String(uptable["rotateDirection"])

    streams[uptable["KEY_SPEED"]] = int2String(uptable["speed"])

    streams[uptable["KEY_MOUTHFEEL"]] = int2String(uptable["mouthfeel"])

    if(uptable["stepStatus"] == 0) then
        streams[uptable["KEY_STEP_STATUS"]] = "invalid"
    elseif(uptable["stepStatus"] == 1) then
        streams[uptable["KEY_STEP_STATUS"]] = "speed_hot"
    elseif(uptable["stepStatus"] == 2) then
        streams[uptable["KEY_STEP_STATUS"]] = "break_wall"
    elseif(uptable["stepStatus"] == 3) then
        streams[uptable["KEY_STEP_STATUS"]] = "infusion"
    elseif(uptable["stepStatus"] == 4) then
        streams[uptable["KEY_STEP_STATUS"]] = "pithy"
    elseif(uptable["stepStatus"] == 5) then
        streams[uptable["KEY_STEP_STATUS"]] = "aroma"
    elseif(uptable["stepStatus"] == 255) then
        streams[uptable["KEY_STEP_STATUS"]] = "making"
    end

    streams[uptable["KEY_CUP_STATUS"]] = int2String(uptable["cupStatus"])
    streams[uptable["KEY_ERROR_CODE"]] = int2String(uptable["errorCode"])
    streams[uptable["KEY_CONTROL_SRC"]] = int2String(uptable["controlSrc"])
    streams[uptable["KEY_SET_APPOINT_TIME_SEC"]] = int2String(uptable["setAppointTimeSec"])
    streams[uptable["KEY_SET_WORK_TIME_SEC"]] = int2String(uptable["setWorkTimeSec"])
    streams[uptable["KEY_SET_KEEP_WARM_TIME_SEC"]] = int2String(uptable["setKeepWarmTimeSec"])
    streams[uptable["KEY_CURRENT_BOTTOM_TEMP"]] = int2String(uptable["currentBottomTemp"])
    streams[uptable["KEY_CURRENT_STEP"]] = int2String(uptable["currentStep"])
    streams[uptable["KEY_TOTAL_STEP"]] = int2String(uptable["totalStep"])
    streams[uptable["KEY_ACK_TYPE"]] = int2String(uptable["ackType"])
    streams[uptable["KEY_REMAIN_APPOINT_TIME_SEC"]] = int2String(uptable["remainAppointTimeSec"])
    streams[uptable["KEY_REMAIN_WORK_TIME_SEC"]] = int2String(uptable["remainWorkTimeSec"])
    streams[uptable["KEY_KEEP_WARM_TIME_SEC"]] = int2String(uptable["keepWarmTimeSec"])
    streams[uptable["KEY_APPOINT_ACTUAL_WORK_TIME_SEC"]] = int2String(uptable["appointActualWorkTimeSec"])
    streams[uptable["KEY_FLAG_LID_STATUS"]] = int2String(uptable["flagLidStatus"])
    streams[uptable["KEY_FLAG_FINISHED"]] = int2String(uptable["flagFinished"])
    streams[uptable["KEY_FLAG_OFF_SCREEN"]] = int2String(uptable["flagOffScreen"])
    streams[uptable["KEY_FLAG_HORSE_RACE_LAMP"]] = int2String(uptable["flagHorseRaceLamp"])
    streams[uptable["KEY_FLAG_POWER"]] = int2String(uptable["flagPower"])
    streams[uptable["KEY_FLAG_SPILL"]] = int2String(uptable["flagSpill"])
    streams[uptable["KEY_FLAG_ONCE_COOK"]] = int2String(uptable["flagOnceCook"])
    streams[uptable["KEY_FLAG_KEEP_WARM"]] = int2String(uptable["flagKeepWarm"])
    streams[uptable["KEY_FLAG_QUICK_COOKING"]] = int2String(uptable["flagQuickCooking"])
    streams[uptable["KEY_FLAG_KEEP_WARM_SWITCH"]] = int2String(uptable["flagKeepWarmSwitch"])
    streams[uptable["KEY_FLAG_WEIGH_WORKING"]] = int2String(uptable["flagWeighWorking"])
    streams[uptable["KEY_FLAG_STABLE_WEIGHT"]] = int2String(uptable["flagStableWeight"])
    streams[uptable["KEY_DIY_CUR_STEP"]] = int2String(uptable["diyCurStep"])

    return streams
end

local function getTotalMsg(bodyData, cType)

    local bodyLength = #bodyData + 1
    -- print(bodyLength)

    local msgLength = bodyLength + uptable["BYTE_PROTOCOL_HEAD_LENGTH"] + 1
    local msgBytes = {}

    for i = 0, msgLength - 1 do
        msgBytes[i] = 0
    end
    --构造消息部分
    msgBytes[0] = uptable["BYTE_PROTOCOL_HEAD"]
    msgBytes[1] = msgLength - 1
    msgBytes[2] = uptable["BYTE_DEVICE_TYPE"]
    msgBytes[8] = 0x01
    msgBytes[9] = cType

    -- body
    for i = 0, bodyLength - 1 do
        msgBytes[i + uptable["BYTE_PROTOCOL_HEAD_LENGTH"]] = bodyData[i]
    end

    msgBytes[msgLength - 1] = makeSum(msgBytes, 1, msgLength - 2)

    -- lua table 索引从1 开始，因此此处要重新转换一次
    local msgFinal = {}

    for i = 1, msgLength do
        msgFinal[i] = msgBytes[i - 1]
    end

    return msgFinal
end

--json转二进制，可传入原状态
function jsonToData(jsonCmd)
    if (#jsonCmd == 0) then
        return nil
    end

    local infoM = {}
    local bodyBytes = {}

    local json = JSON.decode(jsonCmd)

    local query = json["query"]
    local control = json["control"]
    local status = json["status"]
    --当前是查询指令，构造固定的二进制即可
    if (query) then

        --构造消息 body 部分
        for i = 0, 6 do
            bodyBytes[i] = 0
        end

        bodyBytes[0] = 0xAA
        bodyBytes[1] = 0x55
        bodyBytes[3] = 0x31

        infoM = getTotalMsg(bodyBytes, uptable["BYTE_MSG_TYPE_QUERY"])
    elseif (control) then
        --先将原始状态转换为属性
        if (status) then
            jsonToModel(status)
        end

        --将用户控制 json 转换为属性
        if (control) then
            jsonToModel(control)
        end
        --菜单功能控制命令
        if(uptable["subCmd"] == 32) then
            --构造消息 body 部分
            for i = 0, 28 do
                bodyBytes[i] = 0
            end

            bodyBytes[0] = 0xAA
            bodyBytes[1] = 0x55
            bodyBytes[2] = uptable["controlSrc"]
            --cmd
            bodyBytes[3] = 0x20

            --工作模式
            bodyBytes[4] = bit.band(uptable["workMode"], 0xFF)
            bodyBytes[5] = bit.band(bit.rshift(uptable["workMode"], 8), 0xFF)
            bodyBytes[6] = bit.band(bit.rshift(uptable["workMode"], 16), 0xFF)
            bodyBytes[7] = bit.band(bit.rshift(uptable["workMode"], 24), 0xFF)

            --工作开关
            bodyBytes[9] = uptable["workSwitch"]

            --预约设置时间时
            bodyBytes[10] = uptable["setAppointTimeHour"]
            --预约设置时间分
            bodyBytes[11] = uptable["setAppointTimeMin"]
            --预约设置时间秒
            bodyBytes[12] = uptable["setAppointTimeSec"]

            --工作设置时间时
            bodyBytes[13] = uptable["setWorkTimeHour"]
            --工作设置时间分
            bodyBytes[14] = uptable["setWorkTimeMin"]
            --工作设置时间秒
            bodyBytes[15] = uptable["setWorkTimeSec"]

            --保温设置时间时
            bodyBytes[16] = uptable["setKeepWarmTimeHour"]
            --保温设置时间分
            bodyBytes[17] = uptable["setKeepWarmTimeMin"]
            --保温设置时间秒
            bodyBytes[18] = uptable["setKeepWarmTimeSec"]

            --保温目标温度
            bodyBytes[19] = uptable["setKeepWarmTemp"]

            --加热目标温度
            bodyBytes[20] = uptable["setWorkTemp"]

            --工作速度
            bodyBytes[21] = uptable["speed"]

            --口感
            bodyBytes[22] = uptable["mouthfeel"]

            --加热功率
            bodyBytes[23] = 0xF0

            bodyBytes[25] = uptable["flagKeepWarmSwitch"] + 2 * uptable["flagAdjustOption"]

            --构造消息部分
            infoM = getTotalMsg(bodyBytes, uptable["BYTE_MSG_TYPE_CONTROL"])
            --菜单功能控制命令
        elseif(uptable["subCmd"] == 33) then
            --构造消息 body 部分
            for i = 0, 28 do
                bodyBytes[i] = 0
            end

            bodyBytes[0] = 0xAA
            bodyBytes[1] = 0x55
            bodyBytes[2] = uptable["controlSrc"]
            --cmd
            bodyBytes[3] = 0x21

            --工作模式
            bodyBytes[4] = bit.band(uptable["workMode"], 0xFF)
            bodyBytes[5] = bit.band(bit.rshift(uptable["workMode"], 8), 0xFF)
            bodyBytes[6] = bit.band(bit.rshift(uptable["workMode"], 16), 0xFF)
            bodyBytes[7] = bit.band(bit.rshift(uptable["workMode"], 24), 0xFF)

            bodyBytes[8] = uptable["codeId"]

            --工作开关
            bodyBytes[9] = uptable["workSwitch"]

            --预约设置时间时
            bodyBytes[10] = uptable["setAppointTimeHour"]
            --预约设置时间分
            bodyBytes[11] = uptable["setAppointTimeMin"]
            --预约设置时间秒
            bodyBytes[12] = uptable["setAppointTimeSec"]

            --工作设置时间时
            bodyBytes[13] = uptable["setWorkTimeHour"]
            --工作设置时间分
            bodyBytes[14] = uptable["setWorkTimeMin"]
            --工作设置时间秒
            bodyBytes[15] = uptable["setWorkTimeSec"]

            --保温设置时间时
            bodyBytes[16] = uptable["setKeepWarmTimeHour"]
            --保温设置时间分
            bodyBytes[17] = uptable["setKeepWarmTimeMin"]
            --保温设置时间秒
            bodyBytes[18] = uptable["setKeepWarmTimeSec"]

            --保温目标温度
            bodyBytes[19] = uptable["setKeepWarmTemp"]

            --加热目标温度
            bodyBytes[20] = uptable["setWorkTemp"]

            --工作速度
            bodyBytes[21] = uptable["speed"]

            --口感
            bodyBytes[22] = uptable["mouthfeel"]

            --加热功率
            bodyBytes[23] = 0xF0

            bodyBytes[25] = uptable["flagKeepWarmSwitch"] + 2 * uptable["flagAdjustOption"]

            --构造消息部分
            infoM = getTotalMsg(bodyBytes, uptable["BYTE_MSG_TYPE_CONTROL"])
            --步骤同步
        elseif(uptable["subCmd"] == 51) then
            --构造消息 body 部分
            for i = 0, 14 do
                bodyBytes[i] = 0
            end

            bodyBytes[0] = 0xAA
            bodyBytes[1] = 0x55
            bodyBytes[2] = uptable["controlSrc"]
            --cmd
            bodyBytes[3] = 0x33

            --工作模式
            bodyBytes[4] = bit.band(uptable["workMode"], 0xFF)
            bodyBytes[5] = bit.band(bit.rshift(uptable["workMode"], 8), 0xFF)
            bodyBytes[6] = bit.band(bit.rshift(uptable["workMode"], 16), 0xFF)
            bodyBytes[7] = bit.band(bit.rshift(uptable["workMode"], 24), 0xFF)

            bodyBytes[9] = uptable["currentStep"]
            bodyBytes[10] = uptable["totalStep"]
            bodyBytes[11] = 3 -- 11 开机、亮屏
            --构造消息部分
            infoM = getTotalMsg(bodyBytes, uptable["BYTE_MSG_TYPE_CONTROL"])
            --进入食谱详情
        elseif(uptable["subCmd"] == 52) then
            --构造消息 body 部分
            for i = 0, 14 do
                bodyBytes[i] = 0
            end

            bodyBytes[0] = 0xAA
            bodyBytes[1] = 0x55
            bodyBytes[2] = uptable["controlSrc"]
            --cmd
            bodyBytes[3] = 0x34

            --工作模式
            bodyBytes[4] = bit.band(uptable["workMode"], 0xFF)
            bodyBytes[5] = bit.band(bit.rshift(uptable["workMode"], 8), 0xFF)
            bodyBytes[6] = bit.band(bit.rshift(uptable["workMode"], 16), 0xFF)
            bodyBytes[7] = bit.band(bit.rshift(uptable["workMode"], 24), 0xFF)

            --构造消息部分
            infoM = getTotalMsg(bodyBytes, uptable["BYTE_MSG_TYPE_CONTROL"])
            --DIY
        elseif(uptable["subCmd"] == 35) then
            --构造消息 body 部分
            for i = 0, 14 do
                bodyBytes[i] = 0
            end

            bodyBytes[0] = 0xAA
            bodyBytes[1] = 0x55
            bodyBytes[2] = uptable["controlSrc"]
            --cmd
            bodyBytes[3] = 0x23

            --工作模式
            bodyBytes[4] = bit.band(uptable["workMode"], 0xFF)
            bodyBytes[5] = bit.band(bit.rshift(uptable["workMode"], 8), 0xFF)
            bodyBytes[6] = bit.band(bit.rshift(uptable["workMode"], 16), 0xFF)
            bodyBytes[7] = bit.band(bit.rshift(uptable["workMode"], 24), 0xFF)
            --烹饪类别
            bodyBytes[8] = 64
            --工作开关
            bodyBytes[9] = uptable["workSwitch"]
            --工作模式
            local set_appoint_time_min_ = uptable["setAppointTimeHour"] * 60 + uptable["setAppointTimeMin"]

            bodyBytes[10] = bit.band(set_appoint_time_min_, 0xFF)
            bodyBytes[11] = bit.band(bit.rshift(set_appoint_time_min_, 8), 0xFF)

            local set_work_time_sec_ = uptable["setWorkTimeHour"] * 60 * 60 + uptable["setWorkTimeMin"] * 60 + uptable["setWorkTimeSec"]
            bodyBytes[12] = bit.band(set_work_time_sec_, 0xFF)
            bodyBytes[13] = bit.band(bit.rshift(set_work_time_sec_, 8), 0xFF)

            local set_keep_warm_time_sec_ = uptable["setKeepWarmTimeHour"] * 60 * 60 + uptable["setKeepWarmTimeMin"] * 60 + uptable["setKeepWarmTimeSec"]
            bodyBytes[14] = bit.band(set_keep_warm_time_sec_, 0xFF)
            bodyBytes[15] = bit.band(bit.rshift(set_keep_warm_time_sec_, 8), 0xFF)

            bodyBytes[16] = uptable["setKeepWarmTemp"]

            if(uptable["diyParams"] ~= nil) then

                bodyBytes[17] = uptable["diyTotalStep"]
                local tempList = splitStrByChar(uptable["diyParams"], "|")
                local list = splitStrByChar(tempList[1], ",")
                local j = 17
                for i = 1, uptable["diyTotalStep"] do
                    local param = splitStrByChar(tempList[i], ",")
                    -- step_work_mode,speed,temperature,set_work_time_sec
                    bodyBytes[j + 1] = i
                    bodyBytes[j + 2] = string2Int(param[1])

                    bodyBytes[j + 3] = math.modf(string2Int(param[4]) / 60)
                    bodyBytes[j + 4] = string2Int(param[4]) - bodyBytes[j + 3] * 60

                    bodyBytes[j + 5] = string2Int(param[3])
                    bodyBytes[j + 6] = 0
                    bodyBytes[j + 7] = string2Int(param[2])
                    bodyBytes[j + 8] = 0
                    bodyBytes[j + 9] = 0
                    bodyBytes[j + 10] = 0
                    bodyBytes[j + 11] = 1
                    bodyBytes[j + 12] = 0
                    bodyBytes[j + 13] = 0
                    bodyBytes[j + 14] = 0
                    j = j + 14
                end
            end
            --构造消息部分
            infoM = getTotalMsg(bodyBytes, uptable["BYTE_MSG_TYPE_CONTROL"])
        end
    end
    --table 转换成 string 之后返回
    local ret = table2string(infoM)
    ret = string2hexstring(ret)
    return ret
end

--二进制转json
function dataToJson(jsonCmd)
    if (not jsonCmd) then
        return nil
    end

    local json = JSON.decode(jsonCmd)

    local binData = json["msg"]["data"]
    local info = {}
    local msgBytes = {}
    local bodyBytes = {}
    local msgLength = 0
    local bodyLength = 0

    info = string2table(binData)

    uptable["dataType"] = info[10] ---下标9
    uptable["subCmd"] = info[16] ---下标15

    for i = 1, #info do
        msgBytes[i - 1] = info[i]
    end

    msgLength = msgBytes[1] + 1

    bodyLength = msgLength - uptable["BYTE_PROTOCOL_HEAD_LENGTH"] - 1

    --获取 body 部分
    for i = 0, bodyLength - 1 do
        bodyBytes[i] = msgBytes[i + uptable["BYTE_PROTOCOL_HEAD_LENGTH"]]
    end

    --将二进制状态解析为属性值
    binToModel(bodyBytes)

    local retTable = {}
    retTable["status"] = getStreamsFromModel()

    local ret = JSON.encode(retTable)
    return ret
end

-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "query": {"sub_cmd":"1"}}]]
-- print(jsonToData(t)) -- query
-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "status": {"work_status": "0"}, "control":{"work_mode":"12","work_switch":"schedule","code_id":"12","set_appoint_time_sec":13140,"sub_cmd":"32"}}]]
-- print(jsonToData(t)) -- control
-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "status": { }, "msg": {"data": "AA3C2300000000000102AA5501000033855B030000000000000000000000000000000000000000000000001B0207BB02000000180004800000A0630008"}}]]
-- print(dataToJson(t)) -- status
-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "status": {"work_status": "0"}, "control":{"work_mode":"12","total_step":"12","current_step":1,"sub_cmd":"51"}}]]
-- print(jsonToData(t)) -- control
-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "status": {"work_status": "0"}, "control":{"work_mode":"12","sub_cmd":"52"}}]]
-- print(jsonToData(t)) -- control
-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "status": {"work_status": "0"}, "control":{"sub_cmd":"35","work_mode":"54","work_switch":"work","diy_params":"1,11,0,15|2,0,30,20|3,12,30,15","diy_total_step":"3"}}]]
-- print(jsonToData(t)) -- control
-- local t = [[{"deviceinfo": {"deviceType": "", "deviceSubType": "", "deviceSN": ""}, "status": {"work_status": "0"}, "control":{"work_mode":"12","work_switch":"schedule","code_id":"12","set_appoint_time_sec":13140,"sub_cmd":"33"}}]]
-- print(jsonToData(t)) -- control

-- 导出函数
local _M = {}
function _M.jsonToData(jsonStr)
    return jsonToData(jsonStr)
end
function _M.dataToJson(jsonStr)
    return dataToJson(jsonStr)
end
return _M
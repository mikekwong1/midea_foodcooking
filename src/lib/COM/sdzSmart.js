/* eslint-disable*/
const q7proto = require("./q7proto.js");
const jsonToData = q7proto.jsonToData;
const dataToJson = q7proto.dataToJson;

const sdzSmartTest = function() {
  console.log("RUN sdzSmartTest");

  // query
  sdzMsgQuery();

  // data to json
  sdzBinaryDataToJson();
};

// cmd: query
const sdzMsgQuery = function() {
  console.log("sdzMsgQuery");

  const json = {
    "query": true
  };

  jsonToData();
  jsonToData(json);
};

// data to json
const sdzBinaryDataToJson = function() {
  console.log("sdzBinaryDataToJson");

  const json = {
    "deviceinfo": {
      "deviceType": "", 
      "deviceSubType": "", 
      "deviceSN": ""
    },
    "status": { }, 
    "msg": {
      "data": "AA3C2300000000000102AA5501000033855B030000000000000000000000000000000000000000000000001B0207BB02000000180004800000A0630008"
    }
  };

  dataToJson(json);
};

module.exports.sdzSmartTest = sdzSmartTest;
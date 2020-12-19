/* eslint-disable*/
const q7proto = require("./COM/q7proto.js");
const wsclient = require("./websocket.js");
const  { testRecipe } = require("./recipe/index.js");

const jsonToData = q7proto.jsonToData;
const dataToJson = q7proto.dataToJson;

const dzSmartTest = function() {
  console.log("RUN sdzSmartTest");

  testRecipe();

  // query
  // sdzMsgQuery();

  // data to json
  // sdzBinaryDataToJson();

  // wsclient testing
  // wsclientTest();
};

// wsclient testing
const wsclientTest = function() {
  console.log("wsclientTest...");

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

  wsclient.createDzClient("ws://192.168.0.136:7681");
  wsclient.sendWSPush(json);
}

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

module.exports.dzSmartTest = dzSmartTest;
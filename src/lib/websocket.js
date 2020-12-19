/* eslint-disable*/

let wsclient = '';
let setIntervalWebsocketPush = null;
let wsUrl = "ws://localhost:7681";

const createDzClient = function(url) {
  console.log("createDzClient: url=", url);
  if (url == undefined)
    url = wsUrl;
  else
    wsUrl = url;

  if (!wsclient) {
    console.log("create websocket client to dzServd: ", url);

    wsclient = new WebSocket(url);
    wsclient.onopen = onOpenWS;
    wsclient.onmessage = onMessageWS;
    wsclient.onerror = onErrorWS;
    wsclient.onclose = onCloseWS;
  }
  else 
    console.log("websocket already connected!");
}

const onOpenWS = function() {
  console.log("onOpenWS...");
  sendPing();
}

const onErrorWS = function() {
  console.log("onErrorWS");

  wsclient.close();
  clearInterval(setIntervalWebsocketPush);

  console.log("reconnecting...");
  if (wsclient.readyState !== 3) {
    wsclient = null;
    createDzClient();
  }
}

const onMessageWS = function(e) {
  window.dispatchEvent(new CustomEvent('onMessageWS', {
    detail: {
      data: e.data
    }
  }));
}

const connecting = function(message) {
  setTimeout(() => {
    if (wsclient.readyState === 0) 
      connecting(message);
    else
      wsclient.send(JSON.stringify(message));
  }, 1000);
}

const sendWSPush = function(message) {
  if (wsclient && wsclient.readyState === 3) {
    wsclient.close();
    createDzClient();
  } else if (wsclient.readyState === 1) {
    wsclient.send(JSON.stringify(message));
  } else if (wsclient.readyState === 0) {
    wsclient = null;
    createDzClient();
  }
}

const onCloseWS = function() {
  clearInterval(setIntervalWebsocketPush);

  console.log("websocket disconnected, try to reconnect...");

  if (wsclient.readyState !== 2) {
    wsclient = null;
    createDzClient();
  }
}

const sendPing = function(time = 5000, ping = "ping") {
  console.log("sendPing, readyState=", wsclient.readyState);

  if (wsclient.readyState == 0)
    return;

  clearInterval(setIntervalWebsocketPush);

  wsclient.send(ping);
  setIntervalWebsocketPush = setInterval(() => {
    wsclient.send(ping);
  }, time);
}

module.exports.createDzClient = createDzClient;
module.exports.sendWSPush = sendWSPush;
module.exports.sendPing = sendPing;
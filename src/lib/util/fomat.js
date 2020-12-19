// 旋钮改变时间格式化
export function changTime(nower, msg) {
  // 格式化时间
  if (nower < 300) {
    nower += (msg * 10);
  } else if (nower === 300) {
    if (msg > 0) {
      nower = 360
    } else {
      nower = 290
    }
  } else {
    nower +=(msg*60)
  }
  nower = nower < 0 ? 0 : nower;
  nower = nower > 7200 ? 7200 : nower;
  return nower;
}
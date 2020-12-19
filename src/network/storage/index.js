// 将请求到的数据存到localstrage里面
export function save(name, msg) {
    // 将请求的数据存到本地
    console.log('msg', msg)
    var str = JSON.stringify(msg);

    localStorage.setItem(name, str)
}
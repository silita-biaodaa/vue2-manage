//时间戳转为日期格式;
export const timestampToTime = timestamp => {
  var date = new Date(timestamp);
  if (timestamp) {
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() + ' ' < 10 ? '0' + date.getDate() : date.getDate();
    var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return `${Y}-${M}-${D} ${h}:${m}:${s}`;
  }else {
    return null;
  }
}
// 手机号验证
export var checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
  if (!value) {
    return callback(new Error('电话号码不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (phoneReg.test(value)) {
        callback();
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }
  }, 100)
};
/**
 * 封装cookie;
 * 
 */
export var setCookie = (name, val, day) => {
  let expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + day);
  document.cookie = `${name}=${val};expires=${expireDate.toGMTString()}`;
}
export var getCookies = () => {
  let cookies = {};
  if(document.cookie) {
    let cookieArr = document.cookie.split(';');
    for (let i = 0;i<cookieArr.length;i++) {
      let keyArr = cookieArr[i].split("=");
      let name = keyArr[0].trim();
      let key = keyArr[1].trim();
      cookies= {[name]: key};
    }
  } else {
    return false;
  }
  return cookies;
}
export var removeCookie = name => {
  let cookies = getCookies();
  if (cookies) {
    for(let cookie of cookies) {
     if(cookie.name === name) {
        setCookie(name, null, -99);
        break;
      }
    }
  } else {
    return false;
  }
}

//判断两个数组是否相同；如果是相同则返回true
export var checkValue = (a,b) => {
  var m = new Map()
  a.forEach(o => m.set(o, (m.get(o)||0) + 1));
  b.forEach(o => m.set(o, (m.get(o)||0) - 1));
  for (var value of m.values()) {
      if(value !== 0){ return false}
  }
  return true
}

//防止多次点击触发事件;
export var rePeated = (isClick) => {
  if(isClick) {
    isClick = false;
    
  }
}
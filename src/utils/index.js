import { POINT_CONVERSION_COMPRESSED } from "constants";

function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// 计算离当前多久
export function passTime(time) {
  const now = Date.now(), passDateTime = new Date(time).getTime();
  const t = (now - passDateTime) / 1000 / 60;// 分钟
  let result;
  if (t / 60 / 24 /30 / 12 >1 ){
    return result = `${Math.floor(t / 60 / 24 / 30 / 12)}年前`;
  }else if (t / 60 / 24 / 30 > 1) {
    return result = `${Math.floor(t / 60 / 24 / 30)}月前`;
  } else if (t / 60 / 24 >1) {
    return result = `${Math.floor(t / 60 / 24)}天前`;
  } else if (t / 60 > 1) {
    // 小时
    return result = `${Math.floor(t / 60)}小时前`;
  } else {
    // 分钟
    return result = `${Math.floor(t)}分钟前`;
  }
}

// 获取当前的路由
export function getURL() {
  return getCurrentPages().slice(-1)[0].route
}


export function debounce(fn, interval = 300) {
  let timeout = null;
  return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          fn.apply(this, arguments);
      }, interval);
  };
}
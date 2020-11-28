export function debounce(func, delay) {
  // 防抖函数
  let timer = null

  return (...args) => {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay);
  }
}

// 格式化函数，格式化日期
// date为Date对象，fmt为待格式化的格式
export function formatDate(date, fmt) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    let dateY = date.getFullYear() + ""
    fmt = fmt.replace(RegExp.$1, dateY.substr(4 - RegExp.$1.length))
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  }
  for(let k in o) {
    if(new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ""
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length)
}
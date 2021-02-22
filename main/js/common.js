/**
 * 检查设备
 */
function isPc() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function getNow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  return year + "-" + month + "-" + date;
}

/**
 * eg:
 *	new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *	new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 */
// Date.prototype.format = function (fmt) {
// 	if (/(y+)/.test(fmt)) {
// 		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
// 	}
// 	let o = {
// 		'M+': this.getMonth() + 1,
// 		'd+': this.getDate(),
// 		'h+': this.getHours(),
// 		'm+': this.getMinutes(),
// 		's+': this.getSeconds()
// 	}
// 	for (let k in o) {
// 		if (new RegExp(`(${k})`).test(fmt)) {
// 			let str = o[k] + ''
// 			fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
// 		}
// 	}
// 	return fmt
// };

/**
 * 字符串去除首尾空格
 */
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * js控制台输出方法，调用：logger.info("hello");
 */
var logger = {
  info: function (msg) {
    if (typeof console == "undefined") {
      return;
    }
    if (null != console && console.info != null) {
      console.info(msg);
    }
  },
  error: function (err) {
    if (typeof console == "undefined") {
      return;
    }
    if (null != console && console.error != null) {
      console.error(err);
    }
  },
};

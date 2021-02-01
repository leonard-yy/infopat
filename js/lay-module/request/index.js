/*
 * @Description:
 */

layui.define(function (exports) {
  var request = {};
  var token = "96fe4d35788780783a290ace37190fb8632c9c54";
  var token2 = "a36d36723ce2310f4ec2b8ece87e9b3e7bc263d9";
  var v = 1;
  // 模拟代理location
  // 正式环境
  var apiPrefix = "https://www.infodossier.com/api/";
  // 测试环境
  var apiTestPrefix = "https://www.infodossier.test:2080/api/";
  // nginx 环境
  var nginxDevPrefix = "api/";

  var getParamString = function (param) {
    var str = "";
    $.each(param, function (key, val) {
      str += "&" + key + "=" + val;
    });
    return str;
  };

  request.get = function async(url, cb = function () {}, err = function () {}) {
    // url = apiTestPrefix + url;
    url = nginxDevPrefix + url;
    if (url.indexOf("?") !== -1) {
      url += `&v=${v}`;
    } else {
      url += `?&v=${v}`;
    }
    $.ajax({
      url: url,
      type: "get",
      async: false,
      success: function (data) {
        cb(data);
      },
      error: function (xhr, textstatus, thrown) {
        err(xhr);
        console.log("error", thrown);
      },
    });
  };

  request.delete = function (url, cb = function () {}, err = function () {}) {
    // url = apiTestPrefix + url;
    url = nginxDevPrefix + url;
    if (url.indexOf("?") !== -1) {
      url += `&v=${v}`;
    } else {
      url += `?&v=${v}`;
    }
    $.ajax({
      url: url,
      type: "delete",
      success: function (data) {
        cb(data);
      },
      error: function (xhr, textstatus, thrown) {
        err(xhr);
        console.log("error", thrown);
      },
    });
  };

  request.ajax = function (url, cb = function () {}, err = function () {}) {
    // url = apiTestPrefix + url;
    url = nginxDevPrefix + url;
    $.ajax({
      url: url,
      type: "get",
      success: function (data) {
        cb(data);
      },
      error: function (xhr, textstatus, thrown) {
        err(xhr);
        console.log("error", thrown);
      },
    });
  };

  request.getParamFromUri = function (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
    const r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; // 返回参数值
  };

  exports("request", request);
});

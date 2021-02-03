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
  var apiTestPrefix = "http://www.infodossier.test:2080/api/";
  // nginx 环境
  var nginxDevPrefix = "api/";

  var realPrefix = nginxDevPrefix;

  request.get = function (url, cb = function () {}, err = function () {}) {
    request.ajax(url, {}, "GET", true, cb, err);
  };

  request.getAsync = function async(url, cb = function () {}, err = function () {}) {
    request.ajax(url, {}, "GET", false, cb, err);
  };

  request.post = function (url, params = {}, cb = function () {}, err = function () {}) {
    request.ajax(url, params, "POST", true, cb, err);
  };

  request.delete = function (url, cb = function () {}, err = function () {}) {
    request.ajax(url, {}, "DELETE", true, cb, err);
  };

  request.deleteAsync = function async(url, cb = function () {}, err = function () {}) {
    request.ajax(url, {}, "DELETE", false, cb, err);
  };

  request.ajax = function (url, params, type, needAsync, cb = function () {}, err = function () {}) {
    url = realPrefix + url;
    if (url.indexOf("?") !== -1) {
      url += `&v=${v}`;
    } else {
      url += `?v=${v}`;
    }
    $.ajax({
      url: url,
      type: type,
      async: needAsync,
      data: params,
      headers: {
        Authorization: "w3WhhyPz5Ri34vaEtepRoM58G4VtJIyC",
      },
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

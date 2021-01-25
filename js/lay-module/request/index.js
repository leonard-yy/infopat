/*
 * @Description:
 */

layui.define(function (exports) {
  var request = {};
  var token = "96fe4d35788780783a290ace37190fb8632c9c54";
  var token2 = "a36d36723ce2310f4ec2b8ece87e9b3e7bc263d9";
  var v = 1;

  var getParamString = function (param) {
    var str = "";
    $.each(param, function (key, val) {
      str += "&" + key + "=" + val;
    });
    return str;
  };

  request.get = function (url, cb = function () {}, err = function () {}) {
    if (url.indexOf("?") !== -1) {
      url += `&v=${v}`;
    } else {
      url += `?&v=${v}`;
    }

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

  request.ajax = function (url, cb = function () {}, err = function () {}) {
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

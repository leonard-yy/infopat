/*
 * @Description:
 */

layui.define(function (exports) {
  var request = {};
  var baseUrl = "https://www.patenthub.cn/api/patent/";
  var token = "96fe4d35788780783a290ace37190fb8632c9c54";
  var v = 1;

  var getParamString = function (param) {
    var str = "";
    $.each(param, function (key, val) {
      str += "&" + key + "=" + val;
    });
    return str;
  };

  request.getJsonp = function (url, param, cb) {
    $.ajax({
      type: "get",
      dataType: "jsonp",
      url: baseUrl + url + `?t=${token}&v=${v}` + getParamString(param),
      jsonpCallback: cb,
      error: function (e) {
        console.log("请求异常：", e);
      },
      complete: function () {},
    });
  };

  exports("request", request);
});

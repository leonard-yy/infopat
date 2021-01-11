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

  request.get = function (url, tokenType = "search", cb = function () {}) {
    var t = "";
    if (tokenType === "search") {
      t = token;
    }
    if (tokenType === "statistic") {
      t = token2;
    }
    if (url.indexOf("?") !== -1) {
      url += `&t=${t}&v=${v}`;
    } else {
      url += `?t=${t}&v=${v}`;
    }

    $.ajax({
      url: url,
      type: "get",
      success: function (data) {
        cb(data);
      },
      error: function (xhr, textstatus, thrown) {
        console.log("error", thrown);
      },
    });
  };

  exports("request", request);
});

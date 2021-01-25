layui.use(["layuipotal", "loader"], function () {
  var $ = layui.jquery,
    layuipotal = layui.layuipotal;
  var $containerDom = $(".checkbox-block");
  var checkbox =
    '<div class="checkbox-block">' +
    layuipotal.getBtnSelf("btn-chn", "中国", "CN", true) +
    '<span class="ml10" style="margin-right:40px;">中国</span>' +
    layuipotal.getBtnSelf("btn-chn-other", "中国港澳台", "CNALL", true) +
    '<span class="ml10" style="margin-right:40px;">中国港澳台</span>' +
    layuipotal.getBtnSelf("btn-foreign", "国外", "FOREIGN", false) +
    '<span class="ml10">国外</span>';

  $containerDom.append(checkbox);

  /**
   * 检索
   */
  $("#intelSearchBtn").on("click", function () {
    var value = $("#intelSearchInput").val();
    if (value && value !== "") {
      var dp = "";
      var ds = "";
      var cn = $("#btn-chn").attr("value") == "checked";
      var cnOth = $("#btn-chn-other").attr("value") == "checked";
      var foreign = $("#btn-foreign").attr("value") == "checked";
      if (cn) {
        ds += ",CN";
      }
      if (cnOth) {
        ds += ",TW,HK,MO";
      }
      if (foreign) {
        ds += "ALL";
      }
      if (ds.startsWith(",")) ds = ds.replace(",", "");
      if (ds.indexOf("ALL") !== -1) ds = "ALL";
      if (cn && cnOth) {
        dp = "CHINA";
      }
      window.location.href = "/list.html?s=" + value + `&dp=${dp}&ds=${ds}`;
    }
  });
});

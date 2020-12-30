layui.use(["layuipotal", "loader"], function () {
  var $ = layui.jquery,
    layuipotal = layui.layuipotal;
  var $containerDom = $(".checkbox-block");
  var checkbox =
    '<div class="checkbox-block">' +
    layuipotal.getBtnSelf("btn-chn", "中国", "CHN", true) +
    '<span class="ml10" style="margin-right:40px;">中国</span>' +
    layuipotal.getBtnSelf("btn-chn-other", "中国港澳台", "CHN_HK_MC_TW", true) +
    '<span class="ml10" style="margin-right:40px;">中国港澳台</span>' +
    layuipotal.getBtnSelf("btn-foreign", "国外", "FOREIGN", false) +
    '<span class="ml10">国外</span>';

  $containerDom.append(checkbox);

  /**
   * 去列表页面 本页跳转
   */
  function gotoListPage() {
    layui.sessionData("session", { key: "listValue", value: "I" });
    window.location.href = "/list.html";
  }
  /**
   * 检索
   */
  $("#intelSearchBtn").on("click", function () {
    var value = $("#intelSearchInput").val();
    var cValue = [];
    $("#choose-country")
      .find('input[value="checked"]')
      .each(function () {
        cValue.push($(this).data().value);
      });
    if (value && value !== "") {
      layui.sessionData("session", {
        key: "intellectSearchValue",
        value: value,
      });
      layui.sessionData("session", {
        key: "advanceCountryValue",
        value: cValue,
      });
      gotoListPage();
    }
  });
});

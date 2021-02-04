layui.use(["layuipotal", "loader"], function () {
  var $ = layui.jquery,
    layuipotal = layui.layuipotal;
  var $containerDom = $(".checkbox-block");
  var checkbox =
    layuipotal.getBtnSelf("btn-chn", "中国", "CN", true) +
    '<span class="ml10" style="margin-right:40px;">中国</span>' +
    layuipotal.getBtnSelf("btn-chn-other", "中国港澳台", "CNALL", true) +
    '<span class="ml10" style="margin-right:40px;">中国港澳台</span>' +
    layuipotal.getBtnSelf("btn-foreign", "国外", "FOREIGN", false) +
    '<span class="ml10">国外</span>';

  $containerDom.append(checkbox);

  function gotoResultPage() {
    var value = $("#intelSearchInput").val();
    if (value && value !== "") {
      var dp = "";
      var ds = "";
      var df = ""; // 过滤条件
      var dd = ""; // 过滤节点 针对全球
      var cn = $("#btn-chn").attr("value") == "checked";
      var cnOth = $("#btn-chn-other").attr("value") == "checked";
      var foreign = $("#btn-foreign").attr("value") == "checked";
      // 选中一个
      // 用ds=cn&t=xx&q=xx&v=1
      if (cn && !cnOth && !foreign) {
        ds = "CN";
      }
      if (!cn && cnOth && !foreign) {
        ds = "TW,HK,MO";
      }
      if (!cn && !cnOth && foreign) {
        ds = "all";
        dp = "all-CHINA";
        dd = "CN,TW,HK,MO";
        df = value + " AND NOT countryCode:(CN OR TW OR HK OR MO)";
      }

      // 选中两个，中国+中国港澳台
      // 用ds=all & q=countryCode:(CN OR TW OR HK OR MO) AND 石墨烯
      if (cn && cnOth && !foreign) {
        ds = "CN,TW,HK,MO";
        dp = "CHINA";
        df = value + " AND countryCode:(CN OR TW OR HK OR MO)";
      }
      // 用ds=all & q=石墨烯 AND NOT countryCode:CN
      // not一定要写在检索式最后
      if (!cn && cnOth && foreign) {
        ds = "all";
        dd = "CN";
        dp = "all-CHINA";
        df = value + " AND NOT countryCode:CN";
      }
      // 用ds=all & q=石墨烯 AND NOT countryCode:(CN OR TW OR HK OR MO)
      // not一定要写在检索式最后
      if (cn && !cnOth && foreign) {
        ds = "all";
        dp = "all-CHINA";
        dd = "TW,HK,MO";
        df = value + " AND NOT countryCode:(TW OR HK OR MO)";
      }
      // 选中全部
      // not一定要写在检索式最后
      if (cn && cnOth && foreign) {
        ds = "all";
        dp = "all";
      }
      window.location.href = "/patent/list.html?s=" + value + `&ds=${ds}&dp=${dp}&f=${df}&dd=${dd}`;
    }
  }

  /**
   * 检索
   */
  $("#intelSearchBtn").on("click", function () {
    gotoResultPage();
  });

  $(".checkbox-block").on("click", ".common-checkbox", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    if (input.length > 0) {
      // 取消
      $(e.currentTarget).prev().attr("value", "unchecked");
    } else {
      // 选择
      $(e.currentTarget).prev().attr("value", "checked");
    }
  });

  $(document).on("keypress", "#intellectSearch", function (event) {
    if (event.keyCode === 13) {
      gotoResultPage();
    }
    return;
  });
});

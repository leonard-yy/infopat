(function () {
  initData();

  function initData() {
    layui.use(["layuipotal", "loader"], function () {
      var $ = layui.jquery,
        loader = layui.loader,
        layuipotal = layui.layuipotal;
      //动态加载CSS
      // layui.link("./page/IntellectSearch/index.css");
      // 从session里面获取模拟数据
      // var data = layui.sessionData("session").basicInfo;
      var $containerDom = $(".checkbox-block");
      var checkbox =
        '<div class="checkbox-block">' +
        layuipotal.getBtnSelf("btn-chn", "中国", "CHN", true) +
        '<span class="ml10" style="margin-right:40px;">中国</span>' +
        layuipotal.getBtnSelf(
          "btn-chn-other",
          "中国港澳台",
          "CHN_HK_MC_TW",
          true
        ) +
        '<span class="ml10" style="margin-right:40px;">中国港澳台</span>' +
        layuipotal.getBtnSelf("btn-foreign", "国外", "FOREIGN", false) +
        '<span class="ml10">国外</span>';

      $containerDom.append(checkbox);
    });

    function showResult() {
      // 列表本页渲染
      // 隐藏检索页
      $(".search-container").hide();

      // 加载左侧列表
      // $.ajax({
      //   url: '',
      //   type: "get",
      //   success: function (data) {
      //   },
      //   error: function (xhr, textstatus, thrown) {
      //   },
      // });
      $.getJSON("api/resultselect.json", function (res, status) {
        renderLeftSelctor(res.analysis_total || []);
      });
    }

    /**
     * 左侧选择框
     */
    function renderLeftSelctor() {}

    /**
     * 中间列表
     */

    $("#intelSearchBtn").on("click", function () {
      // 得到检索条件 查询
      // loader.show($("#loading"));
      // $.ajax({
      //   url: '',
      //   type: "get",
      //   success: function (data) {
      //   },
      //   error: function (xhr, textstatus, thrown) {
      //   },
      // });
      $.getJSON("api/searchresult.json", function (res, status) {
        showResult(res || {});
      });
      //关闭loading层
      // loader.hide($("#loading"));
    });
  }
})();

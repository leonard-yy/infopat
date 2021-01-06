function initPage() {
  layui.use(["laytpl", "layer", "form", "request", "resultpat"], function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      resultpat = layui.resultpat,
      request = layui.request;
    form = layui.form;
    //动态加载CSS
    layui.link("./page/PatentBaseInfo/index.css");

    var pageData = [];

    // var resultId = layui.sessionData("session").resultId || "";

    var render = function (id) {
      var fieldview = document.getElementById("resultBaseInfo");
      $.getJSON("api/resultInfo.json", function (res, status) {
        laytpl(resultpat).render([res.baseInfo.patent], function (html) {
          fieldview.innerHTML = html;
        });
      });
    };

    /**
     * 获取详情数据
     */
    var getPageData = function () {};

    // 初始化
    getPageData();
  });
}

initPage();

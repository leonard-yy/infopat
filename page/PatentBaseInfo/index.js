function initPage() {
  layui.use(["laytpl", "layer", "form", "request", "resultpat"], function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      layer = layui.layer,
      resultpat = layui.resultpat,
      request = layui.request;
    form = layui.form;
    //动态加载CSS
    layui.link("./page/PatentBaseInfo/index.css");

    var render = function (res) {
      var fieldview = document.getElementById("resultBaseInfo");
      laytpl(resultpat).render([res.patent], function (html) {
        fieldview.innerHTML = html;
      });
    };

    /**
     * 获取详情数据
     */
    var getPageData = function () {
      $.getJSON("api/resultInfo.json", function (res, status) {
        render(res.baseInfo);
      });
    };

    getPageData();
  });
}

initPage();

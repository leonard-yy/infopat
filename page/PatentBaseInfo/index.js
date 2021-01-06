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
        var patent = res.baseInfo.patent;
        laytpl(resultpat).render([patent], function (html) {
          fieldview.innerHTML = html;
        });

        $("#resultSumaryContent").html(patent.summary);
        $("#resultImgContent").attr("src", patent.imagePath);
      });
    };

    // 初始化
    render();
  });
}

initPage();

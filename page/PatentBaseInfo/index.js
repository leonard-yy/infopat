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
      $.getJSON("mock/resultInfo.json", function (res, status) {
        var patent = res.baseInfo.patent;

        // 标题
        $("#pageTitle").html(patent.id + "  " + patent.title);
        var imgClass = "";
        if (patent.type === "发明授权") {
          imgClass = "fmsq-img";
        }
        if (patent.type === "有权") {
          imgClass = "yq-img";
        }
        if (patent.type === "发明公开") {
          imgClass = "fmgk-img";
        }
        if (patent.type === "外观设计") {
          imgClass = "wgsj-img";
        }
        if (patent.type === "实用新型") {
          imgClass = "syxx-img";
        }
        // 图片
        $("#pageImg").addClass(imgClass);

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

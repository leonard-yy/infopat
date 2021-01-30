function initPage() {
  layui.use(["laytpl", "layer", "form", "request", "resultpat", "loader", "picture"], function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      resultpat = layui.resultpat,
      request = layui.request,
      layer = layui.layer;
    form = layui.form;
    //动态加载CSS
    layui.link("./page/PatentBaseInfo/index.css");

    var render = function () {
      if (option && option.id) {
        var fieldview = document.getElementById("resultBaseInfo");
        var data = layui.sessionData("session").basicInfo;

        if (data) {
          var patent = data.patentInfo || {};
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
          if (patent.legalStatus) {
            $("#legalImg").html(patent.legalStatus);
          }
          if (patent.currentStatus) {
            $("#currImg").html(patent.currentStatus);
          }

          laytpl(resultpat).render([patent], function (html) {
            fieldview.innerHTML = html;
          });

          $("#resultSumaryContent").html(patent.summary);

          $("#resultImgContent").attr("src", "api/adv/img?v=1&key=" + patent.imagePath);
        } else {
          $("#resultBaseInfo").loding("start");
          request.get(`adv/patent/base?id=${option.id}`, function (res) {
            $("#resultBaseInfo").loding("stop");
            var patent = res.patent;
            // 标题
            $("#pageTitle").html(patent.id + "  " + patent.title);
            var imgClass = "";
            if (patent.type === "发明授权") {
              imgClass = "fmsq-img";
            } else if (patent.type === "有权") {
              imgClass = "yq-img";
            } else if (patent.type === "发明公开") {
              imgClass = "fmgk-img";
            } else if (patent.type === "外观设计") {
              imgClass = "wgsj-img";
            } else if (patent.type === "实用新型") {
              imgClass = "syxx-img";
            } else {
              imgClass = "default-img";
              $("#pageImg").html(patent.type);
            }
            // 图片
            $("#pageImg").addClass(imgClass);

            laytpl(resultpat).render([patent], function (html) {
              fieldview.innerHTML = html;
            });

            $("#resultSumaryContent").html(patent.summary);

            $("#resultImgContent").attr("src", "api/adv/img?v=1&key=" + patent.imagePath);
          });
        }
      }
    };
    // 初始化
    render();

    // 查看图片
    $("#resultImgContent").on("click", function (e) {
      $(".preview-image").show();
      $("#previewImage").attr("src", $(this).attr("src"));
    });
    $(".close-preview").on("click", function (e) {
      $(".preview-image").hide();
    });
  });
}

function errorLoadImg() {
  $("#resultImgContent").remove();
}

initPage();

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
        $("#resultBaseInfo").loding("start");
        request.get(`adv/patent/base?id=${option.id}`, function (res) {
          $("#resultBaseInfo").loding("stop");
          var patent = res.patent;
          // 标题
          $("#pageTitle").html(patent.id + "  " + patent.title);
          var imgClass = "";
          $("#pageImg").html(patent.type);
          if (patent.type === "发明申请" || patent.type === "发明公开") {
            imgClass = "orange-back";
          } else if (patent.type === "发明授权") {
            imgClass = "red-back";
          } else if (patent.type === "实用新型") {
            imgClass = "green-back";
          } else if (patent.type === "外观设计") {
            imgClass = "blue-back";
          } else if (patent.type === "依法登记的发明") {
            imgClass = "brown-back2";
          } else {
            imgClass = "brown-back";
          }
          // 图片
          $("#pageImg").addClass(imgClass);
          if (patent.legalStatus) {
            $("#legalImg").html(patent.legalStatus);
          }

          laytpl(resultpat).render([patent], function (html) {
            fieldview.innerHTML = html;
            // 查看图片
            $("#resultImgContent").on("click", function (e) {
              $(".preview-image").show();
              $("#previewImage").attr("src", $(this).attr("src"));
            });
            $(".close-preview").on("click", function (e) {
              $(".preview-image").hide();
            });
          });

          $("#resultSumaryContent").html(patent.summary);

          $("#resultImgContent").attr("src", "api/adv/img?v=1&key=" + patent.imagePath);

          // 首项权利要求
          request.get(`adv/patent/claims?id=${option.id}`, function (res2) {
            if (res2 && res2.patent) {
              var claims = res2.patent.claims;
              var claimArr = claims.split(/\d\./);
              if (claimArr.length > 1) {
                $("#firstClaim").html(claimArr[1]);
              }
            }
          });
        });
      }
    };
    // 初始化
    render();
  });
}

function errorLoadImg() {
  $("#resultImgContent").remove();
}

initPage();

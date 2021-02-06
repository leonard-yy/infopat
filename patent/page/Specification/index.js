function initPage() {
  layui.use(["request", "patNodataPage", "loader"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      request = layui.request,
      loader = layui.loader;

    function init() {
      var p = request.getParamFromUri("p");
      var q = request.getParamFromUri("q");
      var id = option.id;
      $("#specificationContent").loding("start");
      request.get(`/api/adv/s?ds=cn&q=${q}&p=${p}`, function (res) {
        if (res) {
          request.get(`/api/adv/patent/desc?id=${id}`, function (res2) {
            $("#specificationContent").loding("stop");
            if (res2 && res2.patent) {
              var desc = res2.patent.description;
              if (desc && desc !== "") {
                desc = desc.replace(/\\n/g, "<br/>");
                $("#specificationContent").html(desc);
              } else {
                $("#specificationContent").html(patNodataPage.html);
              }
            } else {
              $("#specificationContent").html(patNodataPage.html);
            }
          });
        } else {
          $("#specificationContent").loding("stop");
        }
      });
    }

    init();
  });
}

initPage();

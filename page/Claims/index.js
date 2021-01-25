function initPage() {
  layui.use(["request", "patNodataPage", "loader"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      request = layui.request,
      loader = layui.loader;

    function init() {
      var p = request.getParamFromUri("p");
      var q = request.getParamFromUri("q");
      var id = request.getParamFromUri("id");
      loader.show($("#loading"));
      request.get(`api/s?ds=cn&q=${q}&p=${p}`, "search", function (res) {
        if (res) {
          request.get(`api/patent/claims?id=${id}`, "search", function (res2) {
            loader.hide($("#loading"));
            if (res2 && res2.patent) {
              $("#claimsContent").html(res2.patent.claims);
            } else {
              $("#claimsContent").html(patNodataPage.html);
            }
          });
        } else {
          loader.hide($("#loading"));
        }
      });
    }

    init();
  });
}

initPage();

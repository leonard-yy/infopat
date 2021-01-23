function initPage() {
  layui.use(["request", "patNodataPage"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      request = layui.request;

    function init() {
      var p = request.getParamFromUri("p");
      var q = request.getParamFromUri("q");
      var id = request.getParamFromUri("id");
      request.get(`api/s?ds=cn&q=${q}&p=${p}`, "search", function (res) {
        if (res) {
          request.get(`api/patent/claims?id=${id}`, "search", function (res2) {
            if (res2 && res2.patent) {
              $("#claimsContent").html(res2.patent.claims);
            } else {
              $("#claimsContent").html(patNodataPage.html);
            }
          });
        }
      });
    }

    init();
  });
}

initPage();

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
      $("#claimsContent").loding("start");
      request.get(`/api/adv/s?ds=cn&q=${q}&p=${p}`, function (res) {
        if (res) {
          request.get(`/api/adv/patent/claims?id=${id}`, function (res2) {
            $("#claimsContent").loding("stop");
            if (res2 && res2.patent && res2.patent.claims) {
              $("#claimsContent").html(res2.patent.claims);
            } else {
              $("#claimsContent").html(patNodataPage.html);
            }
          });
        } else {
          $("#claimsContent").loding("start");
        }
      });
    }

    init();
  });
}

initPage();

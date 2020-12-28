layui.use(["layuipotal"], function () {
  var layuipotal = layui.layuipotal;
  layuipotal._init("api/potal.json");
  layuipotal._requirePreview(
    "page/ResultList/index.html",
    ".search-result-container"
  );
});

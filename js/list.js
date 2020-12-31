layui.use(["layuipotal"], function () {
  var layuipotal = layui.layuipotal;
  layuipotal.init("api/potal.json");
  layuipotal.requirePreview("page/ResultList/index.html", ".search-result-container");
});

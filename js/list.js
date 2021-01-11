layui.use(["layuipotal"], function () {
  var layuipotal = layui.layuipotal;
  layuipotal.init("mock/potal.json");
  layuipotal.requirePreview("page/ResultList/index.html", ".search-result-container");
});

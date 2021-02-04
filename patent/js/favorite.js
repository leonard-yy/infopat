layui.use(["layuipotal"], function () {
  var layuipotal = layui.layuipotal;
  layuipotal.init("mock/potal.json");
  layuipotal.requirePreview("page/Favorite/index.html", ".search-favorite-container");
  layuipotal.requirePreview("page/Header/index.html", ".layui-header.header");
});

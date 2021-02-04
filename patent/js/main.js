layui.use(["element", "layer", "layuimini", "layuipotal", "form", "loader"], function () {
  layuipotal.init("mock/potal.json");
  //--以上是项目初始化结构 ------
  //初始化提示框
  ToolTip.init({
    delay: 400,
    fadeDuration: 250,
    fontSize: "1.0em",
    theme: "dark",
    textColor: "#333333",
    shadowColor: "#F9EDCD",
    fontFamily: "century gothic, texgyreadventor, stheiti, sans-serif,'Roboto-Medium', 'Roboto-Regular', Arial",
  });

  layuipotal.requirePreview("page/Header/index.html", ".layui-header.header");
});

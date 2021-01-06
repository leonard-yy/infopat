function initPage() {
  layui.use(["laytpl", "layer", "form", "request"], function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      request = layui.request;
    form = layui.form;
    //动态加载CSS
    layui.link("./page/Claims/index.css");

    // 初始化
    render();
  });
}

initPage();

function initData() {
  layui.use(["layuipotal"], function () {
    var $ = layui.jquery,
      layuipotal = layui.layuipotal;
    //动态加载CSS
    // layui.link("./page/IntellectSearch/index.css");
    // 从session里面获取模拟数据
    // var data = layui.sessionData("session").basicInfo;
    var $containerDom = $(".checkbox-block");
    var checkbox =
      '<div class="checkbox-block">' +
      layuipotal.getBtnSelf("btn-chn", "中国", "CHN", true) +
      '<span class="ml10" style="margin-right:40px;">中国</span>' +
      layuipotal.getBtnSelf(
        "btn-chn-other",
        "中国港澳台",
        "CHN_HK_MC_TW",
        true
      ) +
      '<span class="ml10" style="margin-right:40px;">中国港澳台</span>' +
      layuipotal.getBtnSelf("btn-foreign", "国外", "FOREIGN", false) +
      '<span class="ml10">国外</span>';

    $containerDom.append(checkbox);
  });
}

initData();

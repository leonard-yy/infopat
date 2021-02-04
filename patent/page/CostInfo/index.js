function initData() {
  layui.use(["laytpl", "patBasicInfo", "costTable"], function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      patBasicInfo = layui.patBasicInfo,
      Table = layui.costTable;
    //动态加载CSS
    // layui.link("./page/CostInfo/index.css");
    //从session里面获取模拟数据
    var data = layui.sessionData("session").basicInfo;
    var allInfo = layui.sessionData("session").allInfo;
    if (!allInfo) {
      return;
    }
    var jfData = allInfo["费用信息"] || {};

    //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
    let tpl = patBasicInfo.getTpl(true);
    //渲染模板以及数据到dom元素里去
    var view = document.getElementById("basicInfoView");
    laytpl(tpl).render(data, function (html) {
      view.innerHTML = html;
    });

    //渲染应缴费信息
    const yjData = jfData["应缴费信息"] || [];
    let yjTpl = Table.getTpl("yjTpl");
    var yjTable = document.getElementById("zl-yj-table");
    laytpl(yjTpl).render(yjData, function (html) {
      yjTable.innerHTML = html;
    });
    //渲染专利滞纳金
    const znData = jfData["滞纳金信息"] || [];
    let znTpl = Table.getTpl("znTpl");
    var znTable = document.getElementById("zl-zn-table");
    laytpl(znTpl).render(znData, function (html) {
      znTable.innerHTML = html;
    });
    //渲染专利已缴费信息
    const yjfData = jfData["已缴费信息"] || [];
    let yjfTpl = Table.getTpl("yjfTpl");
    var yjfTable = document.getElementById("zl-yjf-table");
    laytpl(yjfTpl).render(yjfData, function (html) {
      yjfTable.innerHTML = html;
    });
    //渲染专利退费信息
    const tfData = jfData["退费信息"] || [];
    let tfTpl = Table.getTpl("tfTpl");
    var tfTable = document.getElementById("zl-tf-table");
    laytpl(tfTpl).render(tfData, function (html) {
      tfTable.innerHTML = html;
    });
  });
}

initData();

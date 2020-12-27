/*
 * @Author: PengCheng
 * @Date: 2020-06-03 19:43:21
 * @Description:
 */

layui.use(["laytpl", "patBasicInfo", "nfctTable"], function() {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    patBasicInfo = layui.patBasicInfo,
    Table = layui.nfctTable;
  //动态加载CSS
  // layui.link('./page/ExaminationOption/index.css')
  //从session里面获取模拟数据
  var data = layui.sessionData("session").basicInfo;
  var allInfo = layui.sessionData("session").allInfo;
  var fwData = allInfo["发文信息"] || {};

  //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
  let tpl = patBasicInfo.getTpl(data);

  //渲染模板以及数据到dom元素里去
  var view = document.getElementById("basicInfoView");

  laytpl(tpl).render(data, function(html) {
    view.innerHTML = html;
  });

  //渲染专利通知书发文信息
  const tzsfwData = fwData["通知书发文"] || [];
  let tzsfwTpl = Table.getTpl("tzsfwTpl");
  var tzsfwTable = document.getElementById("zl-tzsfw-table");
  laytpl(tzsfwTpl).render(tzsfwData, function(html) {
    tzsfwTable.innerHTML = html;
  });

  //渲染专利证书发文信息
  const zsData = fwData["专利证书"] || [];
  let zsTpl = Table.getTpl("zsTpl");
  var zsTable = document.getElementById("zl-zs-table");
  laytpl(zsTpl).render(zsData, function(html) {
    zsTable.innerHTML = html;
  });

  //渲染专利退信信息
  const txData = fwData["退信"] || [];
  let txTpl = Table.getTpl("txTpl");
  var txTable = document.getElementById("zl-tx-table");
  laytpl(txTpl).render(txData, function(html) {
    txTable.innerHTML = html;
  });

  //loading框
  // $(".detailInfo").loding("start");
  // setTimeout(() => {
  //   $(".detailInfo").loding("stop");
  // }, 1000);
});

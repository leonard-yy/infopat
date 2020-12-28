/**
 * date:2019/08/16
 * author:Mr.Chung
 * description:此处放layui自定义扩展
 */

window.rootPath = (function (src) {
  src = document.scripts[document.scripts.length - 1].src;
  return src.substring(0, src.lastIndexOf("/") + 1);
})();

layui
  .config({
    base: rootPath + "lay-module/",
    version: true,
  })
  .extend({
    layuimini: "layuimini/layuimini", // layuimini扩展
    layuipotal: "layuipotal/layuipotal", // layuipotal
    patNodata: "pat/nodata", //暂无数据项
    patNodataPage: "pat/patNodataPage", //暂无数据项
    patBasicInfo: "pat/basicInfo",
    fieldspat: "pat/fieldspat",
    advancepat: "pat/advancepat",
    treeselectpat: "pat/treeselectpat",
    commonTable: "pat/table",
    costTable: "pat/costTable", //费用信息
    nfctTable: "pat/nfctTable", //发文信息
    eoTable: "pat/eoTable", //审查意见
    esTable: "pat/esTable", //审查检索数据
    lsTable: "pat/lsTable", //法律状态
    piTable: "pat/piTable", //专利全文
    loader: "pat/loader",
    picture: "pat/picture",
  });

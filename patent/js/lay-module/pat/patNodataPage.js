layui.define(function (exports) {
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  var obj = {};

  var html = '<div class="no-data-onepage"> <img src="./images/nodata.png" alt="_"> <div>暂无数据</div></div>';

  obj.html = html;

  obj.getNoDataTips = function (tips) {
    return '<div class="no-data-onepage"> <img src="./images/nodata.png" alt="_"> <div>' + tips + "</div></div>";
  };

  exports("patNodataPage", obj);
});

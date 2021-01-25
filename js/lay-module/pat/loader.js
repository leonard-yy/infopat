layui.define("layer", function (exports) {
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  let layer = layui.layer;
  var obj = {
    show: function ($ele) {
      layer.open({
        type: 4,
        shade: false,
        content: $ele,
        success: function (layero) {
          $ele.show();
          Splitting();
        },
      });
    },
    hide: function ($ele) {
      $ele.hide();
      $ele.removeClass("wrapperSearch");
    },
  };

  exports("loader", obj);
});

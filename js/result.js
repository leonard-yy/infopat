layui.use(["element", "layuipotal"], function () {
  var $ = layui.jquery,
    layuipotal = layui.layuipotal,
    element = layui.element;
  var _this = {};

  // _this.resultId = layui.sessionData("session").resultId || "";
  /**
   * 详情内容
   * @param {*} path
   */
  _this.initCont = function (value, type) {
    if (type == "path") {
      layuipotal.requirePreview(value, ".layuimini-content-page");
    } else {
      // type == 'name'
      var ahref = $(".layui-left-menu").find('a[title = "' + value + '"]');
      if (ahref.length > 0) {
        var v = ahref.parent().data().value;
        layuipotal.requirePreview(v, ".layuimini-content-page");
      }
    }
  };

  /**
   * 左侧菜单
   */
  _this.initMenu = function (data) {
    $.getJSON("api/menu.json", function (data) {
      if (data != null) {
        var menuList = data.menu || [];

        var html = '<ul class="layui-nav layui-nav-tree" >';

        menuList.map(function (item, index) {
          var child = item.child || [];
          var needMargin = false;
          if (index > 0) {
            needMargin = true;
          }
          child.map(function (c, idx) {
            var clazz = needMargin && idx == 0 ? "mt10" : "";
            if (idx == 0 && index == 0) {
              _this.firstMenu = c.title;
            }
            if (c.active) {
              html += '<li class="layui-nav-item layui-this ' + clazz + '" data-value="' + c.href + '">';
            } else {
              html += '<li class="layui-nav-item ' + clazz + '" data-value="' + c.href + '">';
            }
            html += '     <a href="javascript:;"  title=' + c.title + ">" + c.title + "</a>";
            html += "  </li>";
          });
        });

        $(".layui-left-menu").html(html);

        _this.initCont(_this.firstMenu || "", "name");
      }
    });
  };

  _this.initMenu();
  /**
   * 菜单点击事件
   */
  $(".layui-left-menu").on("click", ".layui-nav-item", function () {
    $(".layui-nav-item").removeClass("layui-this");
    $(this).addClass("layui-this");

    // 渲染菜单
    var value = $(this).data().value;
    _this.initCont(value || "", "path");
  });
});

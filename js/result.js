layui.use(["element", "layuipotal", "laypage", "element"], function () {
  var $ = layui.jquery,
    layuipotal = layui.layuipotal,
    laypage = layui.laypage,
    element = layui.element,
    element = layui.element;
  var _this = {};
  //动态加载CSS
  layui.link("./page/PatentBaseInfo/index.css");
  /**
   * 详情内容
   * @param {*} path
   */

  _this.renderList = function (res) {
    if (res.total > 0) {
      var patents = res.patents || [];
      var html = "";
      patents.map(function (item, index) {
        if (index == 0) {
          html += '<div class="result-list-item active" data-value="' + item.id + '">';
          html += '   <div class="flex">';
          html += "    <span>" + (index + 1) + ".</span>";
          html += '    <span class="ml10 title active" title="' + item.title + '">' + item.title + "</span>" + "</div>";
          html += '   <div class="subtitle active">' + item.id + "</div>";
          html += "</div>";
        } else {
          html += '<div class="result-list-item" data-value="' + item.id + '">';
          html += '   <div class="flex">';
          html += "    <span>" + (index + 1) + ".</span>";
          html += '    <span class="ml10 title" title="' + item.title + '">' + item.title + "</span>" + "</div>";
          html += '   <div class="subtitle">' + item.id + "</div>";
          html += "</div>";
        }
      });

      $(".result-list-content").html(html);

      $(".title-count").html("1 /" + res.total);
      // 分页
      laypage.render({
        elem: "pageNavagete",
        count: res.total || 0,
        first: "首页",
        last: "尾页",
        curr: res.page || 1,
        groups: 2,
        prev: '<i class="layui-icon layui-icon-left" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i>',
        next: '<i class="layui-icon layui-icon-right" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i> ',
      });

      element.init();
    }
  };

  _this.renderCont = function (value, type, showlist) {
    // _this.resultId = layui.sessionData("session").resultId || "";
    if (showlist) {
      $(".layuimini-content-list").show();
    } else {
      $(".layuimini-content-list").hide();
    }
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

  _this.initCont = function () {
    // 查询右侧分页
    $.getJSON("api/searchresult.json", function (res, status) {
      _this.renderList(res || {});
    });

    // 中间基础信息
    _this.renderCont("基础信息", "name", true);
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
              html += '<li class="layui-nav-item ' + clazz + '"data-value="' + c.href + '" data-parent="' + item.name + '">';
            }
            html += '     <a href="javascript:;"  title=' + c.title + ">" + c.title + "</a>";
            html += "  </li>";
          });
        });

        $(".layui-left-menu").html(html);

        _this.initCont();
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
    var p = $(this).data().parent;
    if (p === "other") {
      _this.renderCont(value, "path", false);
    } else {
      _this.renderCont(value, "path", true);
    }
  });

  /**
   * 右侧列表点击
   */
  $("#resultListCont").on("click", ".result-list-item", function (e) {
    $(".result-list-item").removeClass("active");
    $(".subtitle.active").removeClass("active");
    $(".title.active").removeClass("active");

    $(this).addClass("active");
    $(this).find(".title").addClass("active");
    $(this).find(".subtitle").addClass("active");

    var v = $(this).data().value;

    // 联动左侧
    $(".layui-nav-item").removeClass("layui-this");
    $(".layui-left-menu").find('a[title = "基础信息"]').parent().addClass("layui-this");
    _this.renderCont("基础信息", "name", true);
  });
});

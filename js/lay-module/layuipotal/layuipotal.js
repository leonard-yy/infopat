/**
 * date:2019/06/10
 * author:Mr.Chung
 * description:layuipotal 框架扩展
 */

layui.define(["element", "jquery", "loader", "layuimini"], function (exports) {
  var element = layui.element,
    $ = layui.$,
    loader = layui.loader,
    layuimini = layui.layuimini;
  layuipotal = new (function () {
    // 智能检索 I 高级检索 A
    this.currentPage = "I";
    this._init = function (url) {
      //自定义loading样式
      loader.show($("#loading"));
      $.getJSON(url, function (data, status) {
        if (data == null) {
          layuimini.msg_error("暂无菜单信息");
        } else {
          layuipotal._initPotalMenu(data.potal);
        }
      }).fail(function () {
        layuimini.msg_error("菜单接口有误");
      });
      //关闭loading层
      loader.hide($("#loading"));
      this._initPage("I");
    };

    /**
     * 头部菜单
     */
    this._initPotalMenu = function (potalList) {
      // 头部菜单 最多二级
      // 遍历生成节点
      var potalHtml = "";
      layui.each(potalList, function (index, item) {
        if (item.children && item.children.length > 0) {
          potalHtml += '<li class="layui-nav-item"><a href="javascript:;">';
          potalHtml += item.potalName;
          potalHtml += '</a><dl class="layui-nav-child">';
          layui.each(item.children, function (idx, child) {
            potalHtml += "<dd top-menu-item=";
            potalHtml += child.potalCode;
            potalHtml += '><a href="javascript:;">';
            potalHtml += child.potalName;
            potalHtml += "</a></dd>";
          });
          potalHtml += "</dl></li>";
        } else {
          potalHtml += '<li class="layui-nav-item" top-menu-item=';
          potalHtml += item.potalCode;
          potalHtml += '><a href="javascript:;">';
          potalHtml += item.potalName;
          potalHtml += "</a></li>";
        }
      });

      $(".layui-nav-top-header").html(potalHtml);
      element.render("nav");
    };

    /**
     *  初始化检索页面
     */
    this._initPage = function (type) {
      // 显示+隐藏列表
      $(".search-container").show();
      $(".search-result-container").remove();

      this._renderLeftMenu(type);
      this._renderContent(type);
    };

    /**
     * 初始化左侧菜单
     */
    this._renderLeftMenu = function (type) {
      var $menuDom = $(".search-menu");
      $menuDom.empty();
      $menuDom.append('<div class="search-left-menu"></div>');

      var $menuContainerDom = $(".search-left-menu");
      $menuContainerDom.append(
        '<div class="search-left-menu-title">检索功能列表</div>'
      );
      $menuContainerDom.append(
        '<div class="search-left-menu-item" data-value="I"><div class="intel-sch sch-icon"></div><span>智能检索</span></div>'
      );
      $menuContainerDom.append(
        '<div class="search-left-menu-item" data-value="A"><div class="advance-sch sch-icon"></div><span>高级检索</span></div>'
      );
      // 选中状态
      if (type === "I") {
        $(".intel-sch").addClass("active");
        $(".intel-sch").parent().addClass("active");
      }
      if (type === "A") {
        $(".advance-sch").addClass("active");
        $(".advance-sch").parent().addClass("active");
      }
      // 高级检索
      if (type === "A") {
        var $menuDom = $(".search-menu");
        $menuDom.append(
          '<div class="search-country-selector" id="choose-country"></div>'
        );
        var _this = this;
        $.getJSON("api/tree.json", function (res, status) {
          _this._getTreeDom(res.data || []);
        });
      }
    };

    this._getTreeDom = function (data) {
      var $selectorDom = $(".search-country-selector");
      var getParentNode = function (item) {
        // 叶子节点  COUNTRY-PARENT-VALUE
        var tpl = '<div class="search-country-item with-parent">';
        tpl += '      <div class="squared-checkbox">';
        tpl += '          <input type="checkbox" class="tree-search-parent" ';
        tpl += '              id="COUNTRY-PARENT-' + item.value + '" />';
        tpl += '          <label for="COUNTRY-PARENT-' + item.value + '" />';
        tpl += "      </div>";
        tpl += '      <span class="block-back ml10"/>';
        tpl +=
          '      <span class="ml10 search-country-title with-parent" >' +
          item.title +
          "</span>";
        tpl += "   </div>";
        return tpl;
      };
      var getChildNode = function (item) {
        // 叶子节点  COUNTRY-PARENT-VALUE
        var tpl = '<div class="search-country-item">';
        tpl += '      <div class="squared-checkbox">';
        tpl += '          <input type="checkbox" class="tree-search-child" ';
        tpl += '              id="COUNTRY-CHILD-' + item.value + '" />';
        tpl += '          <label for="COUNTRY-CHILD-' + item.value + '" />';
        tpl += "      </div>";
        tpl += '      <span class="block-back ml10"/>';
        tpl += '      <span class="ml10" >' + item.title + "</span>";
        tpl += "   </div>";
        return tpl;
      };
      var _this = this;
      layui.each(data, function (idx, item) {
        if (item.isLeaf) {
          $selectorDom.append(getParentNode(item));
          _this._getTreeDom(item.children || []);
        } else {
          $selectorDom.append(getChildNode(item));
        }
      });
    };

    /**
     * 初始化右侧页面
     */
    this._renderContent = async function (type) {
      var path = "";
      if (type === "I") {
        path = "page/IntellectSearch/index.html";
      }
      // 高级检索页面
      if (type === "A") {
        path = "page/AdvanceSearch/index.html";
      }
      var container = ".search-content";
      $(".search-content").empty();

      data = this._requirePreview(path);
      $(container).html(data);
    };

    this._requirePreview = function (path) {
      var v = new Date().getTime();
      var htmlData = "暂无数据";
      $.ajax({
        url: path.indexOf("?") > -1 ? path + "&v=" + v : path + "?v=" + v,
        type: "get",
        dataType: "html",
        async: false,
        success: function (data) {
          htmlData = data;
        },
        error: function (xhr, textstatus, thrown) {
          return layuimini.msg_error(
            "Status:" + xhr.status + "，" + xhr.statusText + "，请稍后再试！"
          );
        },
      });
      return htmlData;
    };

    /**
     * 自定义button dom
     * @param {*} id
     * @param {*} name
     * @param {*} value
     * @param {*} checked
     */
    this.getBtnSelf = function (id, name, value, checked) {
      var temp = "";
      temp += '<div class="squared-checkbox">';
      temp += '<input type="checkbox" id="' + id + '" value="' + value + '"';
      if (checked) {
        temp += "checked";
      }
      temp += "/>";
      temp += '<label for="' + id + '"></label></div>';
      return temp;
    };
  })();

  /**
   * 头部菜单点击事件
   */
  $("body").on("click", "[top-menu-item]", function () {
    //自定义loading样式
    var menuName = $(this).attr("top-menu-item");

    if (
      (menuName === "intellectSearch" && layuipotal.currentPage == "I") ||
      (menuName === "advanceSearch" && layuipotal.currentPage == "A")
    ) {
      return;
    }

    $(".search-left-menu-item").removeClass("active");
    $(".sch-icon").removeClass("active");

    if (menuName === "intellectSearch" && layuipotal.currentPage !== "I") {
      layuipotal.currentPage = "I";
      layuipotal._initPage("I");
    }
    if (menuName === "advanceSearch" && layuipotal.currentPage !== "A") {
      layuipotal.currentPage = "A";
      layuipotal._initPage("A");
    }
  });

  /**
   * 左侧菜单点击事件
   */
  $(".expand-search").on("click", ".search-left-menu-item", function (e) {
    // 选中样式
    // 重复选择自己
    if ($(e.currentTarget).hasClass("active")) {
      return;
    }
    $(".search-left-menu-item").removeClass("active");
    $(".sch-icon").removeClass("active");
    $(e.currentTarget).addClass("active");

    var value = e.currentTarget.dataset.value;
    if (
      value == null ||
      value == undefined ||
      (value !== "A" && value !== "I")
    ) {
      value == "A";
    }
    layuipotal.currentPage = value;
    if (value === "A") {
      $(".advance-sch").addClass("active");
      $('[top-menu-item = "advanceSearch"]').addClass("layui-this");
      $('[top-menu-item = "intellectSearch"]').removeClass("layui-this");
    } else {
      $(".intel-sch").addClass("active");
      $('[top-menu-item = "intellectSearch"]').addClass("layui-this");
      $('[top-menu-item = "advanceSearch"]').removeClass("layui-this");
    }
    layuipotal._initPage(value);
  });
  // 自测  ----------------------------------------------------------------------------------
  layuipotal._init("api/potal.json");
  // 自测  ----------------------------------------------------------------------------------
  exports("layuipotal", layuipotal);
});

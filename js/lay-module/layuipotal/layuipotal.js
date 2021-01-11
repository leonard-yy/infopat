/**
 * date:2019/06/10
 * author:Mr.Chung
 * description:layuipotal 框架扩展
 */

layui.define(["element", "jquery", "loader", "layuimini", "layer"], function (exports) {
  var element = layui.element,
    $ = layui.$,
    loader = layui.loader,
    layuimini = layui.layuimini,
    layer = layui.layer;
  layuipotal = new (function () {
    // 智能检索 I 高级检索 A
    this.currentPage = "I";

    this.init = function (url) {
      //自定义loading样式
      loader.show($("#loading"));
      $.getJSON(url, function (data, status) {
        if (data == null) {
          layuimini.msg_error("暂无菜单信息");
        } else {
          layuipotal.initPotalMenu(data.potal);
        }
      }).fail(function () {
        layuimini.msg_error("菜单接口有误");
      });
      //关闭loading层
      loader.hide($("#loading"));

      var currentMenu = layui.sessionData("session").currentMenu;
      if (currentMenu === "INDEX") {
        var currentPage = layui.sessionData("session").currentPage;
        if (currentPage && currentPage !== "") {
          this.currentPage = currentPage;
        }
        this.initSearchPage(this.currentPage);
      } else {
        this.initListPage();
      }
    };

    /**
     * 头部菜单
     */
    this.initPotalMenu = function (potalList) {
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
    this.initSearchPage = function (type) {
      // 显示+隐藏列表
      $(".search-container").show();
      $(".search-result-container").hide();

      this.renderLeftMenu(type);
      this.renderContent(type);
    };

    /**
     *  初始化列表页面
     */
    this.initListPage = function () {
      $(".search-result-container").show();
    };

    /**
     * 初始化左侧菜单
     */
    this.renderLeftMenu = function (type) {
      var $menuDom = $(".search-menu");
      $menuDom.empty();
      $menuDom.append('<div class="search-left-menu"></div>');

      var $menuContainerDom = $(".search-left-menu");
      $menuContainerDom.append('<div class="search-left-menu-title">检索功能列表</div>');
      $menuContainerDom.append('<div class="search-left-menu-item" data-value="I"><div class="intel-sch sch-icon"></div><span>智能检索</span></div>');
      $menuContainerDom.append('<div class="search-left-menu-item" data-value="A"><div class="advance-sch sch-icon"></div><span>高级检索</span></div>');
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
        $menuDom.append('<div class="search-country-selector" id="choose-country"></div>');
        var _this = this;
        $.getJSON("mock/tree.json", function (res, status) {
          _this.getTreeDom(res.data || []);
        });
      }
    };

    this.getTreeDom = function (data) {
      var $selectorDom = $(".search-country-selector");
      var getParentNode = function (item) {
        // 叶子节点  COUNTRY-PARENT-VALUE
        var tpl = '<div class="search-country-item with-parent">';
        tpl += '      <div class="squared-checkbox">';
        tpl += '          <input type="checkbox" class="tree-search-parent" ';
        tpl += '              id="COUNTRY-PARENT-' + item.value + '" />';
        tpl += '               <label class="country-checkbox-parent" for="COUNTRY-PARENT-';
        tpl += item.value + '" />';
        tpl += "      </div>";
        tpl += '      <span class="block-back ml10"/>';
        tpl += '      <span class="ml10 search-country-title with-parent" >' + item.title + "</span>";
        tpl += "   </div>";
        return tpl;
      };
      var getChildNode = function (item) {
        // 子节点  COUNTRY-PARENT-VALUE
        var tpl = '<div class="search-country-item">';
        tpl += '      <div class="squared-checkbox">';
        tpl += '          <input type="checkbox" class="tree-search-child" ';
        tpl += '              parent="' + item.parent + '" ';
        tpl += '              id="COUNTRY-CHILD-' + item.value + '" />';
        tpl += '          <label class="country-checkbox-child" ';
        tpl += '              for="COUNTRY-CHILD-' + item.value + '" />';
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
          _this.getTreeDom(item.children || []);
        } else {
          $selectorDom.append(getChildNode(item));
        }
      });
    };

    /**
     * 初始化右侧页面
     */
    this.renderContent = async function (type) {
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
      data = this.requirePreview(path, container);
    };

    this.requirePreview = function (path, selector) {
      var v = new Date().getTime();
      $.ajax({
        url: path.indexOf("?") > -1 ? path + "&v=" + v : path + "?v=" + v,
        type: "get",
        dataType: "html",
        async: false,
        success: function (data) {
          $(selector).html(data);
        },
        error: function (xhr, textstatus, thrown) {
          return layuimini.msg_error("Status:" + xhr.status + "，" + xhr.statusText + "，请稍后再试！");
        },
      });
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
      temp += '<input type="checkbox" id="' + id + '" data-value="' + value + '"';
      if (checked) {
        temp += 'value="checked"';
      }
      temp += "/>";
      temp += '<label for="' + id + '"></label></div>';
      return temp;
    };

    /**
     * 失败
     * @param title
     * @returns {*}
     */
    this.msg_error = function (title) {
      return layer.msg(title, {
        icon: 2,
        shade: this.shade,
        scrollbar: false,
        time: 3000,
        shadeClose: true,
      });
    };
  })();

  /**
   * 头部菜单点击事件
   */
  $("body").on("click", "[top-menu-item]", function () {
    //自定义loading样式
    var menuName = $(this).attr("top-menu-item");
    if (window.location.href.indexOf("list") !== -1) {
      layui.sessionData("session", {
        key: "currentPage",
        value: menuName === "intellectSearch" ? "I" : "A",
      });
      window.location.href = "/index.html";
      return;
    }
    if ((menuName === "intellectSearch" && layuipotal.currentPage == "I") || (menuName === "advanceSearch" && layuipotal.currentPage == "A")) {
      return;
    }

    $(".search-left-menu-item").removeClass("active");
    $(".sch-icon").removeClass("active");

    if (menuName === "intellectSearch" && layuipotal.currentPage !== "I") {
      layuipotal.currentPage = "I";
      layuipotal.initSearchPage("I");
    }
    if (menuName === "advanceSearch" && layuipotal.currentPage !== "A") {
      layuipotal.currentPage = "A";
      layuipotal.initSearchPage("A");
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
    if (value == null || value == undefined || (value !== "A" && value !== "I")) {
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
    layuipotal.initSearchPage(value);
  });

  /**
   * 左侧选择框父节点 点击事件
   */
  $("body").on("click", ".country-checkbox-parent", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    var id = $(e.currentTarget).parent().find("input").attr("id");
    var value = id.split("-").pop();
    if (input.length > 0) {
      // 取消
      $(e.currentTarget).prev().attr("value", "unchecked");
      $("#choose-country")
        .find("input[parent = " + value + "]")
        .attr("value", "unchecked");
    } else {
      // 选择
      $(e.currentTarget).prev().attr("value", "checked");
      $("#choose-country")
        .find("input[parent = " + value + "]")
        .attr("value", "checked");
    }
  });

  /**
   * 左侧选择框子节点 点击事件
   */
  $("body").on("click", ".country-checkbox-child", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    var id = $(e.currentTarget).parent().find("input").attr("parent");
    var value = id.split("-").pop();
    if (input.length > 0) {
      $(e.currentTarget).prev().attr("value", "unchecked");
      // 取消全选
      $("#choose-country")
        .find("#COUNTRY-PARENT-" + value)
        .attr("value", "unchecked");
    } else {
      // 检查满足是否全选
      var all = $("#choose-country").find("input[parent = " + value + "]");
      var checked = $("#choose-country").find("input[parent = " + value + "][value=checked]");
      $(e.currentTarget).prev().attr("value", "checked");
      if (all.length == checked.length + 1) {
        $("#choose-country")
          .find("#COUNTRY-PARENT-" + value)
          .attr("value", "checked");
      }
    }
  });

  exports("layuipotal", layuipotal);
});

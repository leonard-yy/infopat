layui.use(["element", "layuipotal", "laypage", "element", "loader"], function () {
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

  /**
   * 右侧列表
   * @param {*} res
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

  /**
   * 中间内容渲染
   * @param {*} value
   * @param {*} type
   * @param {*} showlist
   */
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

  // 其他页面信息 | 法律信息之下
  _this.getData = function (refresh = false, cb) {
    //将基本信息放在session里面
    var number = layui.sessionData("session").resultId || "CN101941693B";
    var url = `https://www.infopat.net/patent/v2/${number}`;
    if (refresh) {
      url += "?refresh=1";
    }
    $.ajax({
      type: "GET",
      url: url,
      success: function (result) {
        //返回成功进行响应操作
        if (result.data) {
          let AllInfo = result.data;
          // 放到session里，减少重复请求
          layui.sessionData("session", {
            key: "allInfo",
            value: AllInfo,
          });
          let basicInfo = AllInfo["申请信息"] || {};
          layui.sessionData("session", {
            key: "basicInfo",
            value: {
              updateDate: AllInfo["查询时间"] || "--",
              status: basicInfo["案件状态"] || "--",
              number: basicInfo["专利号码"] || "--",
              flNumber: basicInfo["主分类号"] || "--",
              name: basicInfo["专利名称"] || "--",
              applicationDate: basicInfo["申请日期"] || "",
              applicant: (basicInfo["申请人"] && basicInfo["申请人"].join("、")) || "--",
              inventor: (basicInfo["发明人"] && basicInfo["发明人"].join("、")) || "--",
              Agency: (basicInfo["代理情况"] && basicInfo["代理情况"]["代理机构名称"]) || "--",
              agent: (basicInfo["代理情况"] && basicInfo["代理情况"]["第一代理人"]) || "--",
            },
          });
          cb && cb();
        } else {
          layui.sessionData("session", {
            key: "allInfo",
            value: {},
          });
          layui.sessionData("session", {
            key: "basicInfo",
            value: {},
          });
          alert(result.message);
        }
      },
      error: function () {
        layui.sessionData("session", {
          key: "allInfo",
          value: {},
        });
        layui.sessionData("session", {
          key: "basicInfo",
          value: {},
        });
      },
      complete: function () {},
    });
  };

  _this.initCont = function () {
    // 查询右侧分页
    $.getJSON("mock/searchresult.json", function (res, status) {
      _this.renderList(res || {});
    });

    // 中间基础信息
    _this.renderCont("基础信息", "name", true);

    // 其他页面数据
    _this.getData();
  };

  /**
   * 左侧菜单
   */
  _this.initMenu = function (data) {
    // 菜单数据
    $.getJSON("mock/menu.json", function (data) {
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

        // 加载页面数据
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

    // 纪录当前专利编码
    var v = $(this).data().value;
    layui.sessionData("session", {
      key: "resultId",
      value: v,
    });
    // 联动左侧
    $(".layui-nav-item").removeClass("layui-this");
    $(".layui-left-menu").find('a[title = "基础信息"]').parent().addClass("layui-this");

    _this.renderCont("基础信息", "name", true);
    _this.getData();
  });
});

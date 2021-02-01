layui.use(["element", "layuipotal", "laypage", "element", "loader", "request"], function () {
  var $ = layui.jquery,
    layuipotal = layui.layuipotal,
    laypage = layui.laypage,
    element = layui.element,
    request = layui.request,
    element = layui.element;
  var _this = {
    page: 1,
    pageSize: 10,
    force: false,
  };
  //动态加载CSS
  layui.link("./page/PatentBaseInfo/index.css");

  /**
   * 右侧列表
   * @param {*} res
   */
  _this.renderList = function (res, id) {
    var idxSelected = 1;
    var hasIndex = 0;
    if (res.total > 0) {
      var patents = res.patents || [];
      var html = "";
      patents.map(function (item, index) {
        if (item.id == id) {
          hasIndex = index;
          idxSelected = index + 1;
        }
      });
      patents.map(function (item, index) {
        var title = item.title.replace(/<em>/g, "").replace(/<\/em>/g, "");
        if (index == hasIndex) {
          html += '<div class="result-list-item active" data-value="' + item.id + '" data-index=' + index + ">";
          html += '   <div class="flex">';
          html += "    <span>" + (index + 1) + ".</span>";
          html += '    <span class="ml10 title active" title="' + title + '">' + title + "</span>" + "</div>";
          html += '   <div class="subtitle active">' + item.id + "</div>";
          html += "</div>";
        } else {
          html += '<div class="result-list-item" data-value="' + item.id + '" data-index=' + index + ">";
          html += '   <div class="flex">';
          html += "    <span>" + (index + 1) + ".</span>";
          html += '    <span class="ml10 title" title="' + title + '">' + title + "</span>" + "</div>";
          html += '   <div class="subtitle">' + item.id + "</div>";
          html += "</div>";
        }
      });

      $(".result-list-content").html(html);

      $(".title-count").html((res.page - 1) * 10 + idxSelected + "/" + res.total);
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
        jump: function (obj, first) {
          //obj包含了当前分页的所有参数，比如：
          // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          // console.log(obj.limit); //得到每页显示的条数
          if (!first) {
            _this.page = obj.curr;
            _this.initCont();
          }
        },
      });

      _this.total = res.total || 0;
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
    if (showlist) {
      $(".layuimini-content-list").show();
    } else {
      $(".layuimini-content-list").hide();
    }
    if (type == "path") {
      layuipotal.requirePreview(value + "?id=" + _this.id, ".layuimini-content-page", { id: "resultContentPage", data: { id: _this.id } });
    } else {
      var ahref = $(".layui-left-menu").find('a[title = "' + value + '"]');
      if (ahref.length > 0) {
        var v = ahref.parent().data().value;
        layuipotal.requirePreview(v + "?id=" + _this.id, ".layuimini-content-page", { id: "resultContentPage", data: { id: _this.id } });
      }
    }
  };

  // 其他页面信息 | 法律信息之下
  _this.getData = function () {
    // 获取基本信息
    request.get(`adv/patent/base?id=${_this.id}`, function (res) {
      var patent = res.patent;
      var code = patent.applicationNumber.substring(2).replace(".", "");
      // debug_token 调试用，正式环境去除
      var url = `${code}?debug_token=c6d8a85f2d3e40a9a59f8f0c834caea5`;
      //将基本信息
      request.ajax(url, function (result) {
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
              patentInfo: patent,
            },
          });
        } else {
          layui.sessionData("session", {
            key: "allInfo",
            value: {},
          });
          layui.sessionData("session", {
            key: "basicInfo",
            value: {},
          });
        }
      });
    });
  };

  _this.initCont = function () {
    if (!_this.force) {
      // 其他页面数据
      _this.getData();

      // 查询右侧分页
      var url = request.getParamFromUri("url").replace(/TANDT/g, "&");
      request.get(url.replace(/p=\d/, "p=" + _this.page), function (res) {
        _this.renderList(res || {}, _this.id);
      });
      // 中间基本信息
      _this.renderCont("基本信息", "name", true);
    } else {
      // 其他页面数据
      // debug_token 调试用，正式环境去除
      var url = `${request.getParamFromUri("id")}?debug_token=c6d8a85f2d3e40a9a59f8f0c834caea5`;
      //将基本信息
      request.ajax(url, function (result) {
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
          _this.renderCont("费用信息", "name", true);
          $(".layuimini-content-list").hide();
        } else {
          layui.sessionData("session", {
            key: "allInfo",
            value: {},
          });
          layui.sessionData("session", {
            key: "basicInfo",
            value: {},
          });
        }
      });
    }
  };

  _this.getParamFromUri = function (name, url) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
    const r = url.substr(1).match(reg); // 匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; // 返回参数值
  };

  /**
   * 左侧菜单
   */
  _this.initMenu = function () {
    // 初始化参数
    var force = request.getParamFromUri("force");
    var cost = false;

    // 费用信息
    if (force) {
      _this.force = true;
      // 菜单数据
      $.getJSON("mock/menu.json", function (data) {
        if (data != null) {
          var menuList = data.menu || [];

          var html = '<ul class="layui-nav layui-nav-tree" >';

          menuList.map(function (item, index) {
            var child = item.child || [];
            var fisrt = true;
            child.map(function (c, idx) {
              if (c.href == "page/CostInfo/index.html") {
                if (fisrt) {
                  _this.firstMenu = c.title;
                }
                fisrt = false;
                html += '<li class="layui-nav-item layui-this" data-value="' + c.href + '">';
                html += '     <a href="javascript:;"  title=' + c.title + ">" + c.title + "</a>";
                html += "  </li>";
              }
            });
          });
          $(".layui-left-menu").html(html);
          // 加载页面数据
          _this.initCont();
        }
      });
    } else {
      _this.id = request.getParamFromUri("id");
      var url = request.getParamFromUri("url").replace(/TANDT/g, "&");
      _this.page = _this.getParamFromUri("p", url);
      // 菜单数据
      $.getJSON("mock/menu.json", function (data) {
        if (data != null) {
          var menuList = data.menu || [];

          var html = '<ul class="layui-nav layui-nav-tree" >';

          menuList.map(function (item, index) {
            var child = item.child || [];
            var needMargin = false;
            // 第二栏 间隔
            if (index > 0) needMargin = true;

            var fisrt = true;

            child.map(function (c, idx) {
              var showMenu = true;
              var show = c.show || "all";
              // 只展示费用信息
              if (cost) {
                showMenu = false;
                if (c.href == "page/CostInfo/index.html") {
                  showMenu = true;
                }
              } else {
                if (show !== "all") {
                  // 自定义菜单匹配规则  -CN- 匹配菜单json 里面的show
                  var filterCode = "-" + _this.id.substring(0, 2) + "-";
                  if (show.indexOf(filterCode) === -1) {
                    showMenu = false;
                  }
                }
              }

              if (showMenu) {
                if (index == 0 && fisrt) {
                  _this.firstMenu = c.title;
                }
                var clazz = needMargin && fisrt ? "mt10" : "";
                fisrt = false;
                if (c.active) {
                  html += '<li class="layui-nav-item layui-this ' + clazz + '" data-value="' + c.href + '">';
                } else {
                  html += '<li class="layui-nav-item ' + clazz + '"data-value="' + c.href + '" data-parent="' + item.name + '">';
                }
                html += '     <a href="javascript:;"  title=' + c.title + ">" + c.title + "</a>";
                html += "  </li>";
              }
            });
          });

          $(".layui-left-menu").html(html);

          // 加载页面数据
          _this.initCont();
        }
      });
    }
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
    var c = (_this.page - 1) * 10 + Number($(this).data().index + 1);
    $(".title-count").html(c.toString() + " / " + _this.total.toString());
    _this.id = $(this).data().value;
    // 联动左侧
    $(".layui-nav-item").removeClass("layui-this");
    $(".layui-left-menu").find('a[title = "基本信息"]').parent().addClass("layui-this");

    _this.renderCont("基本信息", "name", true);
    _this.getData();
  });
});

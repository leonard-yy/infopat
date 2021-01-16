layui.use(["laytpl", "request", "loader", "form", "laypage", "element", "layer", "resultlistpat"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    loader = layui.loader,
    form = layui.form,
    laypage = layui.laypage,
    element = layui.element,
    resultlistpat = layui.resultlistpat,
    request = layui.request,
    layer = layui.layer;
  var _this = {
    page: 1,
    pageSize: 10,
    searchText: "",
  };
  // 输入框自动调整
  // _this.resizeTextarea = function () {
  //   var textarea = document.getElementById("expandTextarea");
  //   var pre = document.getElementById("preTextarea");
  //   if (textarea !== null && pre !== null) {
  //     pre.innerHTML = textarea.value;
  //     var realHeight = pre.offsetHeight; //offsetHeight = height + padding + border
  //     if (realHeight > 82) textarea.style.height = realHeight + 24 - 22 + "px";
  //     //加24为一行的高度，减22为padding和border
  //     else textarea.style.height = realHeight - 22 + "px";
  //   }
  // };

  // 自定义输入框
  // document.onkeydown = _this.resizeTextarea;

  /**
   * 查询左侧选择框 lazy
   */
  _this.getSelectorContent = function (sel) {
    var searchText = _this.searchText;
    if (searchText !== null && searchText !== "") {
      request.get(`api/ration?q=${searchText}&c=${sel.value}`, "statistic", function (res) {
        var temp = "";
        var data = res.analysis_total || [];
        if (data.length > 0) {
          temp += '   <dl class="layui-nav-child">';
          layui.each(data, function (index, item) {
            if (item.children && item.children.length > 0) {
              temp += "    <dd>";
              temp += '      <div class="result-selector-item">';
              temp += '      <div class="squared-checkbox">';
              temp += '          <input type="checkbox" class="result-select-child" ';
              temp += '              id="RESULT-FILTER-PARENT-' + item.key + '"/>';
              temp += '          <label class="result-selector-parent"/>';
              temp += "      </div>";
              temp += '      <span class="block-back ml10"/>';
              temp += '      <span class="ml10 result-selector-title normal" >' + (item.name ? item.name : item.key) + "</span>";
              temp += '       <span class="filter-count">(' + (item.count || 0) + ")</span>";
              temp += "     </div>";
              temp += "   </dd>";
              layui.each(item.children, function (idx, child) {
                temp += '<dd class="fliter-child">';
                temp += '      <div class="result-selector-item child">';
                temp += '      <div class="squared-checkbox">';
                temp += '                <input type="checkbox" class="result-select-child" ';
                temp += '              id="RESULT-FILTER-CHILD-' + child.key + '" parent="' + item.key + '"/>';
                temp += '          <label class="result-selector-child" />';
                temp += "      </div>";
                temp += '      <span class="ml10 result-selector-title normal" >' + child.key + "</span>";
                temp += '       <span class="filter-count">(' + (child.count || 0) + ")</span>";
                temp += "   </div>";
                temp += "</dd>";
              });
            } else {
              temp += '    <dd class="fliter-child">';
              temp += '      <div class="result-selector-item">';
              temp += '      <div class="squared-checkbox">';
              temp += '          <input type="checkbox" class="result-select-child" ';
              temp += '              id="RESULT-FILTER-PARENT-' + item.key + '"/>';
              temp += '          <label class="result-selector-parent"/>';
              temp += "      </div>";
              temp += '      <span class="block-back ml10"/>';
              temp += '      <span class="ml10 result-selector-title normal" >' + (item.name ? item.name : item.key) + "</span>";
              temp += '       <span class="filter-count">(' + (item.count || 0) + ")</span>";
              temp += "     </div>";
              temp += "   </dd>";
            }
          });
          // 筛选
          var sxhtml = '<span class="slef-search-btn normal select-of-result" data-value="' + sel.value + '" data-name="' + sel.name + '"';
          sxhtml += 'style="width: 80px;height:24px;line-height:24px">筛选</span>';
          var glhtml = '<span class="slef-search-btn normal filter-of-result ml10" data-value="' + sel.value + '" data-name="' + sel.name + '"';
          glhtml += '" style="width: 80px;height:24px;line-height:24px">过滤</span>';
          temp += '       <dd class="result-selector-filter">' + sxhtml + glhtml + "</dd>";
          temp += "    </dl>";
          $("#T-" + sel.value + " dl").remove();
          $("#T-" + sel.value).append(temp);
          element.render("nav");
        }
      });
    }
  };

  /**
   * uri参数
   * @param {*} name
   */
  _this.getParamFromUri = function (name) {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`); // 构造一个含有目标参数的正则表达式对象
    const r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; // 返回参数值
  };

  /**
   * 渲染中间 列表
   * @param {*} res
   */
  _this.renderContent = function (res) {
    // 数据
    // var fieldview = document.getElementById("fieldsContent");
    laytpl(resultlistpat).render(res.patents || [], function (html) {
      $("#fieldsContent").html(html);
    });
    // 分页
    laypage.render({
      elem: "pageNavagete",
      count: res.total || 0,
      first: "首页",
      last: "尾页",
      curr: res.page || 1,
      prev: '<i class="layui-icon layui-icon-left" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i>',
      next: '<i class="layui-icon layui-icon-right" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i> ',
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        if (!first) {
          _this.page = obj.curr;
          _this.initContent();
        }
      },
    });

    // 统计
    $("#resultTime").html(res.responseTimes || 0 + "s");
    $("#resultCount").html(res.total || 0 + "条");
  };

  /**
   * 左侧选择
   */
  _this.initSelector = function () {
    $.getJSON("mock/fliterDimension.json", function (res, status) {
      // 记录本地值
      _this.selectorData = res.data || [];

      var temp = '<ul class="layui-nav layui-nav-tree layui-inline">';
      var data = res.data || [];

      layui.each(data, function (index, item) {
        temp += '<li class="layui-nav-item layui-nav-itemed" id="T-' + item.value + '">';
        temp += '  <a class="result-selector-title result-selector-item bb" >' + item.name + "</a>";
        temp += "</li>";
      });
      temp += "</ul>";
      $(".result-left-selector").html(temp);
      $(".result-left-selector").css("width", "200px");
      if (data.length > 0) {
        var firstItem = data[0];
        _this.getSelectorContent(firstItem);
        _this.selector = firstItem.value || "";
      }
      element.render("nav");
    });
  };

  /**
   * 列表内容
   */
  _this.initContent = function () {
    // 得到检索条件 查询
    var searchText = _this.searchText;

    if (searchText !== null && searchText !== "") {
      loader.show($("#loading"));
      var sendDate = new Date().getTime();
      request.get(`api/s?ds=cn&q=${searchText}&p=${_this.page}`, "search", function (res) {
        var receiveDate = new Date().getTime();
        var responseTimeMs = receiveDate - sendDate;
        res.responseTimes = responseTimeMs / 1000;
        _this.renderContent(res || {});
      });
      // 关闭loading层
      loader.hide($("#loading"));
    } else {
      _this.renderContent({});
    }
  };

  /**
   * 加载页面
   */
  _this.renderPage = function () {
    _this.initSelector();
    _this.initContent();
  };

  // 初始化页面
  _this.init = function () {
    var currentMenu = layui.sessionData("session").currentMenu;
    if (currentMenu !== "LIST") {
      return;
    }
    // 初始化输入框
    var value = _this.getParamFromUri("s");
    $("#expandTextarea").val(value);
    _this.searchText = value;

    _this.renderPage();
  };

  _this.init();

  /**
   * 去往详情页
   */
  function gotoResultPage(value) {
    window.open("/result.html?id=" + value + "&q=" + _this.searchText + "&p=" + _this.page, "_blank");
  }

  /**
   * 去往详情页
   */
  $("#searchResult").on("click", "img", function (e) {
    var value = $(e.currentTarget).data().value;
    gotoResultPage(value);
  });
  $("#searchResult").on("click", ".fileds-item-title", function (e) {
    var value = $(e.currentTarget).data().value;
    gotoResultPage(value);
  });

  /**
   * 异步加载纬度
   */
  $("#searchResult").on("click", ".layui-nav-item", function (e) {
    var id = $(e.currentTarget).attr("id");
    var value = id.split("-").pop();
    if (_this.selector == value) {
      return;
    }
    var s = _this.selectorData.find(function (d) {
      return d.value == value;
    });
    if (s !== undefined && s !== null) {
      _this.getSelectorContent(s);
      _this.selector = value;
    }
  });

  /**
   * 检索
   */
  $("#resultSearchBtn").on("click", function () {
    _this.searchText = $("#expandTextarea").val();
    _this.renderPage();
  });

  /**
   * 二次检索
   */
  $("#resultSecondSearchBtn").on("click", function (e) {
    var v = $("#expandTextarea").val();
    if (v == _this.searchText) {
      _this.renderPage();
    } else {
      _this.searchText = _this.searchText += " AND " + v;
      _this.renderPage();
    }
  });

  /**
   * 全选
   */
  $("#searchResult").on("click", "#selectAllResult", function (e) {
    if ($(e.currentTarget).hasClass("select-all")) {
      // 取消全选
      $(e.currentTarget).text("全选");
      $(e.currentTarget).removeClass("select-all");
      $(".result-checkbox-input").attr("value", "unchecked");
    } else {
      // 全选
      $(e.currentTarget).text("全不选");
      $(e.currentTarget).addClass("select-all");
      $(".result-checkbox-input").attr("value", "checked");
    }
  });

  /**
   * 收藏
   */
  $("#searchResult").on("click", "#collectSelectedResult", function (e) {
    var checkedInput = $("#searchResult").find('input[value = "checked"]');
    if (checkedInput.length == 0) {
      layer.msg("请选择一条记录进行收藏");
      return;
    }
    var checkValue = [];
    checkedInput.each(function () {
      var id = $(this).parent().find("input").attr("id");
      var v = id.split("-").pop();
      checkValue.push(v);

      $("#FORK-KEY-" + v).removeClass("layui-icon-star");
      $("#FORK-KEY-" + v).addClass("layui-icon-star-fill");
      $("#FORK-KEY-" + v)
        .next()
        .html("取消收藏");
    });
    layer.msg(checkValue.toString());
  });

  /**
   * 左侧选择框父节点 点击事件
   */
  $("#searchResult").on("click", ".result-selector-parent", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    var id = $(e.currentTarget).parent().find("input").attr("id");
    var value = id.split("-").pop();
    if (input.length > 0) {
      // 取消
      $(e.currentTarget).prev().attr("value", "unchecked");
      $("#searchResult")
        .find("input[parent = " + value + "]")
        .attr("value", "unchecked");
    } else {
      // 选择
      $(e.currentTarget).prev().attr("value", "checked");
      $("#searchResult")
        .find("input[parent = " + value + "]")
        .attr("value", "checked");
    }
  });

  /**
   * 左侧选择框子节点 点击事件
   */
  $("#searchResult").on("click", ".result-selector-child", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    var id = $(e.currentTarget).parent().find("input").attr("parent");
    var value = id.split("-").pop();
    if (input.length > 0) {
      $(e.currentTarget).prev().attr("value", "unchecked");
      // 取消全选
      $("#searchResult")
        .find("#RESULT-FILTER-PARENT-" + value)
        .attr("value", "unchecked");
    } else {
      // 检查满足是否全选
      var all = $("#searchResult").find("input[parent = " + value + "]");
      var checked = $("#searchResult").find("input[parent = " + value + "][value=checked]");
      $(e.currentTarget).prev().attr("value", "checked");
      if (all.length == checked.length + 1) {
        $("#searchResult")
          .find("#RESULT-FILTER-PARENT-" + value)
          .attr("value", "checked");
      }
    }
  });

  /**
   * 中间内容选择框
   */
  $("#searchResult").on("click", ".result-checkbox-label", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    if (input.length > 0) {
      // 取消
      $(e.currentTarget).parent().find("input").attr("value", "unchecked");
    } else {
      // 取消
      $(e.currentTarget).parent().find("input").attr("value", "checked");
    }
  });
  /**
   * 收藏 取消收藏
   */
  $("#searchResult").on("click", ".fork-star", function (e) {
    if ($(e.currentTarget).hasClass("layui-icon-star")) {
      // 收藏
      $(e.currentTarget).removeClass("layui-icon-star");
      $(e.currentTarget).addClass("layui-icon-star-fill");
      $(e.currentTarget).next().html("取消收藏");
    } else {
      $(e.currentTarget).removeClass("layui-icon-star-fill");
      $(e.currentTarget).addClass("layui-icon-star");
      $(e.currentTarget).next().html("收藏");
    }
  });

  /**
   * 筛选
   */
  $("#searchResult").on("click", ".select-of-result", function (e) {
    var checked = $(this).parent().parent().find('.fliter-child input[value = "checked"]');
    var name = $(this).data().name;
    var filterCode = $(this).data().value;
    // 清除已有的
    $('.filter-item.select-modal[name = "' + name + '"]').remove();
    // 生成新的
    if (checked.length > 0) {
      var content = '<div class="filter-item select-modal" name="' + name + '">';
      content += '<span class="close-icon-self">x</span>';
      content += '<span class="key-word">筛选 </span>';
      content += '<span class="key-type">' + name + " </span>";
      var filterText = "(";
      checked.each(function (i, e2) {
        var id = $(e2).attr("id");
        var parent = $(e2).attr("parent");
        var value = id.split("-").pop();
        if (!parent) {
          // 无父节点
          if (i == 0) {
            filterText += value;
          } else {
            filterText += " AND " + value;
          }
        } else {
          if (i == 0) {
            filterText += parent + " AND " + value;
          } else {
            filterText += " OR " + parent + " AND " + value;
          }
        }
      });
      filterText += ")";
      content += filterText;
      content += "</div>";
      $(".result-left-filter").append(content);
      // TODO 重新查询
    }
  });

  $("#searchResult").on("click", ".close-icon-self", function (e) {
    $(this).parent().remove();
    // TODO 重新查询
  });

  /**
   * 过滤
   */
  $("#searchResult").on("click", ".filter-of-result", function (e) {
    var checked = $(this).parent().parent().find('.fliter-child input[value = "checked"]');
    var name = $(this).data().name;
    var filterCode = $(this).data().value;
    // 清除已有的
    $('.filter-item.filter-modal[name = "' + name + '"]').remove();
    // 生成新的
    if (checked.length > 0) {
      var content = '<div class="filter-item filter-modal" name="' + name + '">';
      content += '<span class="close-icon-self">x</span>';
      content += '<span class="key-word">过滤 </span>';
      content += '<span class="key-type">' + name + " </span>";
      var filterText = "(";
      checked.each(function (i, e2) {
        var id = $(e2).attr("id");
        var parent = $(e2).attr("parent");
        var value = id.split("-").pop();
        if (!parent) {
          // 无父节点
          if (i == 0) {
            filterText += value;
          } else {
            filterText += " NOT " + value;
          }
        } else {
          if (i == 0) {
            filterText += parent + " NOT " + value;
          } else {
            filterText += " OR " + parent + " NOT " + value;
          }
        }
      });
      filterText += ")";
      content += filterText;
      content += "</div>";
      $(".result-left-filter").append(content);
      // TODO 重新查询
    }
  });

  /**
   * 全球按钮
   */
  $("#quanqiuSelector").on("click", function (e) {
    var getParentNode = function (item) {
      var parentChecked = _this.getParamFromUri("dp");
      // 叶子节点  COUNTRY-PARENT-VALUE
      var tpl = '<div class="search-country-layer">';
      tpl += '      <div class="squared-checkbox">';
      if (parentChecked && parentChecked.indexOf(item.value) !== -1) {
        tpl += '          <input type="checkbox" class="tree-search-parent" value="checked" ';
      } else {
        tpl += '          <input type="checkbox" class="tree-search-parent" ';
      }
      tpl += '              id="COUNTRY-PARENT-' + item.value + '" />';
      tpl += '               <label class="country-layer-parent" for="COUNTRY-PARENT-';
      tpl += item.value + '" />';
      tpl += "      </div>";
      tpl += '      <span class="ml10 search-country-title with-parent ellipsis-text" style="flex:1" title="' + item.title + '">' + item.title + "</span>";
      tpl += "   </div>";
      return tpl;
    };

    var getChildNode = function (item) {
      var childChecked = _this.getParamFromUri("ds");
      // 子节点  COUNTRY-PARENT-VALUE
      var tpl = '<div class="search-country-layer">';
      tpl += '      <div class="squared-checkbox">';
      if (childChecked && childChecked.indexOf(item.value) !== -1) {
        tpl += '          <input type="checkbox" class="tree-search-child" value="checked" ';
      } else {
        tpl += '          <input type="checkbox" class="tree-search-child" ';
      }
      tpl += '              parent="' + item.parent + '" ';
      tpl += '              id="COUNTRY-CHILD-' + item.value + '" />';
      tpl += '          <label class="country-layer-child" ';
      tpl += '              for="COUNTRY-CHILD-' + item.value + '" />';
      tpl += "      </div>";
      tpl += '      <span class="block-back ml10"/>';
      tpl += '      <span class="ml10 ellipsis-text" style="flex:1" title="' + item.title + '">' + item.title + "</span>";
      tpl += "   </div>";
      return tpl;
    };

    var content = '<div style="padding:20px;" class="layer-country-checkbox">';
    $.getJSON("mock/country.json", function (res, status) {
      var data = res.data;

      data.map(function (item, index) {
        var temp = "";
        if (item.value !== "NORMAL") {
          if (item.title == "中国" || item.title == "全球") {
            temp = '<div class="layer-line-parent inlineBlock">';
          } else {
            temp = '<div class="layer-line-parent">';
          }
          temp += getParentNode(item);
          temp += "</div>";
        }

        if (item.children && item.children.length > 0) {
          temp += '<div class="layer-line-child">';
          item.children.map(function (child, idx) {
            temp += getChildNode(child);
          });
          temp += "</div>";
        }

        content += temp;
      });

      content += "</div>";

      var index = layer.open({
        type: 1,
        offset: "auto",
        id: "layerSelector",
        content: content,
        btn: ["确认", "取消"],
        btnAlign: "c", //按钮居中
        shade: 0.5,
        area: ["800px", "500px"],
        yes: function () {
          var c = $("#layerSelector").find(".layer-line-child").find('input[value = "checked"]');
          var checked = "";
          c.each(function () {
            var id = $(this).attr("id");
            var value = id.split("-").pop();
            checked += value;
          });
          layer.msg(checked);
          layer.close(index);
        },
        btn2: function () {
          layer.close(index);
        },
      });

      /**
       * 弹出选择框父节点 点击事件
       */
      $("#layerSelector").on("click", ".country-layer-parent", function (e) {
        var input = $(e.currentTarget).parent().find('input[value="checked"]');
        var id = $(e.currentTarget).parent().find("input").attr("id");
        var value = id.split("-").pop();
        if (input.length > 0) {
          // 取消
          $(e.currentTarget).prev().attr("value", "unchecked");
          $("#layerSelector")
            .find("input[parent = " + value + "]")
            .attr("value", "unchecked");
        } else {
          // 选择
          $(e.currentTarget).prev().attr("value", "checked");
          $("#layerSelector")
            .find("input[parent = " + value + "]")
            .attr("value", "checked");
        }
      });

      /**
       * 弹出选择框子节点 点击事件
       */
      $("#layerSelector").on("click", ".country-layer-child", function (e) {
        var input = $(e.currentTarget).parent().find('input[value="checked"]');
        var id = $(e.currentTarget).parent().find("input").attr("parent");
        var value = id.split("-").pop();
        if (input.length > 0) {
          $(e.currentTarget).prev().attr("value", "unchecked");
          // 取消全选
          $("#layerSelector")
            .find("#COUNTRY-PARENT-" + value)
            .attr("value", "unchecked");
        } else {
          // 检查满足是否全选
          var all = $("#layerSelector").find("input[parent = " + value + "]");
          var checked = $("#layerSelector").find("input[parent = " + value + "][value=checked]");
          $(e.currentTarget).prev().attr("value", "checked");
          if (all.length == checked.length + 1) {
            $("#layerSelector")
              .find("#COUNTRY-PARENT-" + value)
              .attr("value", "checked");
          }
        }
      });
    });
  });
});

(function () {})();

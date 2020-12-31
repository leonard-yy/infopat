layui.use(["laytpl", "layuipotal", "loader", "form", "laypage", "element", "layer", "resultlistpat"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    loader = layui.loader,
    form = layui.form,
    laypage = layui.laypage,
    element = layui.element,
    resultlistpat = layui.resultlistpat,
    layuipotal = layui.layuipotal,
    layer = layui.layer;
  var _this = {
    page: 1,
    pageSize: 10,
  };
  form.render();
  // 输入框自动调整
  _this.resizeTextarea = function () {
    var textarea = document.getElementById("expandTextarea");
    var pre = document.getElementById("preTextarea");
    pre.innerHTML = textarea.value;
    var realHeight = pre.offsetHeight; //offsetHeight = height + padding + border
    if (realHeight > 82) textarea.style.height = realHeight + 24 - 22 + "px";
    //加24为一行的高度，减22为padding和border
    else textarea.style.height = realHeight - 22 + "px";
    console.log(textarea.style.height);
  };

  // 自定义输入框
  document.onkeydown = _this.resizeTextarea;

  var listValue = layui.sessionData("session").listValue;
  var value = "";
  if (listValue === "A") {
    value = layui.sessionData("session").advanceSearchValue;
  } else {
    value = layui.sessionData("session").intellectSearchValue;
  }
  $("#expandTextarea").val(value);
  _this.resizeTextarea();

  /**
   * 查询左侧选择框 lazy
   */
  _this._getSelectorContent = function (sel) {
    $.getJSON("api/resultselect.json", function (res, status) {
      var temp = "";
      var data = res.analysis_total || [];

      if (data.length > 0) {
        temp += '   <dl class="layui-nav-child">';
        layui.each(data, function (index, item) {
          temp += "    <dd>";
          temp += '      <div class="result-selector-item">';
          temp += '      <div class="squared-checkbox">';
          temp += '          <input type="checkbox" class="result-select-child" ';
          temp += '              id="RESULT-SELECTOR-PARENT-' + item.key + '"/>';
          temp += '          <label class="result-selector-parent" for="RESULT-SELECTOR-PARENT-' + item.key + '" />';
          temp += "      </div>";
          temp += '      <span class="block-back ml10"/>';
          temp += '      <span class="ml10 result-selector-title normal" >' + item.name + "</span>";
          temp += "   </div>";
          temp += "</dd>";
          if (item.children && item.children.length > 0) {
            layui.each(item.children, function (idx, child) {
              temp += "    <dd>";
              temp += '      <div class="result-selector-item child">';
              temp += '      <div class="squared-checkbox">';
              temp += '                <input type="checkbox" class="result-select-child" ';
              temp += '              id="RESULT-SELECTOR-CHILD-' + item.key + idx + '" parent="' + item.key + '"/>';
              temp += '          <label class="result-selector-child" for="CHILD-KEY-' + item.key + idx + '" />';
              temp += "      </div>";
              temp += '      <span class="ml10 result-selector-title normal" >' + child.key + "</span>";
              temp += "   </div>";
              temp += "</dd>";
            });
          }
        });
        // 筛选
        var sxhtml = '<span class="slef-search-btn normal select-of-result" id="' + sel.value + '" style="width: 80px">筛选</span>';
        var glhtml = '<span class="slef-search-btn normal filter-of-result ml10" id="' + sel.value + '" style="width: 80px">过滤</span>';
        temp += '       <dd class="result-selector-filter">' + sxhtml + glhtml + "</dd>";
        temp += "    </dl>";
        $("#T-" + sel.value + " dl").remove();
        $("#T-" + sel.value).append(temp);

        element.render("nav");
      }
    });
  };

  /**
   * 加载大类 并默认加载第一列
   * @param {*} res
   */
  _this._renderSelector = function (res) {
    // 记录本地值
    _this.selectorData = res.data || [];

    var temp = '<ul class="layui-nav layui-nav-tree layui-inline">';
    var data = res.data || [];

    layui.each(data, function (index, item) {
      temp += '<li class="layui-nav-item layui-nav-itemed" id="T-' + item.value + '">';
      // 自定义叶子节点
      // temp += '<div class="result-selector-item bb">';
      temp += '  <a class="result-selector-title result-selector-item bb" >' + item.name + "</a>";
      // temp += "</div>";
      temp += "</li>";
    });
    temp += "</ul>";
    $(".result-left-selector").html(temp);

    if (data.length > 0) {
      var firstItem = data[0];
      _this._getSelectorContent(firstItem);
      _this.selector = firstItem.value || "";
    }
    element.render("nav");
  };

  /**
   * 渲染中间 列表
   * @param {*} res
   */
  _this._renderContent = function (res) {
    // 数据
    var fieldview = document.getElementById("fieldsContent");
    laytpl(resultlistpat).render(res.patents || [], function (html) {
      fieldview.innerHTML = html;
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
    });
  };

  _this._initSelector = function () {
    $.getJSON("api/selectorlist.json", function (res, status) {
      _this._renderSelector(res || {});
    });
  };

  _this._initContent = function () {
    $.getJSON("api/searchresult.json", function (res, status) {
      _this._renderContent(res || {});
    });
  };
  // 得到检索条件 查询
  // loader.show($("#loading"));
  // $.ajax({
  //   url: '',
  //   type: "get",
  //   success: function (data) {
  //   },
  //   error: function (xhr, textstatus, thrown) {
  //   },
  // });
  //   $.getJSON("api/searchresult.json", function (res, status) {
  //     _this._renderSelectOption(res);
  //   });
  // 关闭loading层
  // loader.hide($("#loading"));
  _this._init = function () {
    _this._initSelector();
    _this._initContent();
  };

  _this._init();

  function gotoResultPage(value) {
    layui.sessionData("session", { key: "resultId", value: value });
    window.open("/result.html?id=" + value, "_blank");
  }

  /**
   * 去往详情页
   */
  $("#searchResult").on("click", "img", function (e) {
    var value = $(e.currentTarget).data().value;
    gotoResultPage(value);
  });
  /**
   * 去往详情页
   */
  $("#searchResult").on("click", ".fileds-item-title", function (e) {
    var value = $(e.currentTarget).data().value;
    gotoResultPage(value);
  });

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
      _this._getSelectorContent(s);
      _this.selector = value;
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
      checkValue.push(id.split("-").pop());
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
        .find("#RESULT-SELECTOR-PARENT-" + value)
        .attr("value", "unchecked");
    } else {
      // 检查满足是否全选
      var all = $("#searchResult").find("input[parent = " + value + "]");
      var checked = $("#searchResult").find("input[parent = " + value + "][value=checked]");
      $(e.currentTarget).prev().attr("value", "checked");
      if (all.length == checked.length + 1) {
        $("#searchResult")
          .find("#RESULT-SELECTOR-PARENT-" + value)
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
});

(function () {})();

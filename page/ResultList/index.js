layui.use(
  [
    "laytpl",
    "layuipotal",
    "loader",
    "form",
    "laypage",
    "element",
    "resultlistpat",
  ],
  function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      loader = layui.loader,
      form = layui.form,
      laypage = layui.laypage,
      element = layui.element,
      resultlistpat = layui.resultlistpat,
      layuipotal = layui.layuipotal;
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
            temp +=
              '                <input type="checkbox" class="result-select-child" ';
            temp += '              id="SELECTOR-KEY-' + item.key + '" />';
            temp += '          <label for="SELECTOR-KEY-' + item.key + '" />';
            temp += "      </div>";
            temp += '      <span class="block-back ml10"/>';
            temp +=
              '      <span class="ml10 result-selector-title normal" >' +
              item.name +
              "</span>";
            temp += "   </div>";
            temp += "</dd>";
            if (item.children && item.children.length > 0) {
              layui.each(item.children, function (idx, child) {
                temp += "    <dd>";
                temp += '      <div class="result-selector-item child">';
                temp += '      <div class="squared-checkbox">';
                temp +=
                  '                <input type="checkbox" class="result-select-child" ';
                temp +=
                  '              id="CHILD-KEY-' + item.key + idx + '" />';
                temp +=
                  '          <label for="CHILD-KEY-' + item.key + idx + '" />';
                temp += "      </div>";
                temp +=
                  '      <span class="ml10 result-selector-title normal" >' +
                  child.key +
                  "</span>";
                temp += "   </div>";
                temp += "</dd>";
              });
            }
          });
          temp += "    </dl>";
          $("#T-" + sel.value + " dl").remove();
          $("#T-" + sel.value).append(temp);
        }
      });
    };

    /**
     * 加载大类 并默认加载第一列
     * @param {*} res
     */
    _this._renderSelector = function (res) {
      var temp = '<ul class="layui-nav layui-nav-tree layui-inline">';
      var data = res.data || [];

      if (data.length > 0) {
        var firstItem = data[0];
        _this._getSelectorContent(firstItem);
      }
      layui.each(data, function (index, item) {
        temp +=
          '<li class="layui-nav-item layui-nav-itemed" id="T-' +
          item.value +
          '">';
        // 自定义叶子节点
        temp += '<div class="result-selector-item bb">';
        temp +=
          '  <span class="result-selector-title" >' + item.name + "</span>";
        temp += "</div>";
        temp += "</li>";
      });
      temp += "</ul>";
      $(".result-left-selector").html(temp);
      element.render();
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
        prev:
          '<i class="layui-icon layui-icon-left" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i>',
        next:
          '<i class="layui-icon layui-icon-right" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i> ',
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
  }
);

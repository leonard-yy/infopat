function initPage() {
  layui.use(["laytpl", "form", "advancepat", "fieldspat"], function () {
    var $ = layui.jquery,
      laytpl = layui.laytpl,
      advancepat = layui.advancepat;
    fieldspat = layui.fieldspat;
    form = layui.form;
    //动态加载CSS
    layui.link("./page/AdvanceSearch/index.css");
    var _this = {};
    _this.pageData = [];

    function addItem(name) {
      var itemArr = _this.pageData.filter(function (d, i) {
        return name == d.name;
      });
      if (itemArr && itemArr.length > 0) {
        var item = itemArr[0];
        var itemHtml = '<div class="layui-form-item flex search-index-item" style="align-items:center" name="' + name + '">';
        itemHtml += '<div class="layui-input-inline" style="flex:2;">';
        itemHtml += '<select name="' + name + '" class="layui-form-select">';
        itemHtml += '<option value="AND" selected>AND</option>';
        itemHtml += '<option value="OR">OR</option>';
        itemHtml += '<option value="NOT">NOT</option>';
        itemHtml += " </select> ";
        itemHtml += "</div>";

        itemHtml += '<div style="flex:1;text-align:right;padding-right:10px;">' + name + "</div>";

        itemHtml += '<div class="layui-input-inline" style="flex:4">';
        itemHtml += '<select name="' + name + '" class="layui-form-select" style="flex:1">';
        itemHtml += '<option value="">请选择' + name + "</option>";
        if (item.selector && item.selector.length > 0) {
          layui.each(item.selector, function (idx, s) {
            itemHtml += '<option value="' + s.value + '">' + s.name + "</option>";
          });
        }

        itemHtml += "</select> ";
        itemHtml += " </div>";
        itemHtml += '<div class="layui-input-inline" style="flex:4;"> ';
        itemHtml += '<input type="text" name="' + name + '" placeholder="请输入' + name + '" autocomplete="off" class="layui-input">';
        itemHtml += "</div>";
        itemHtml += '<div class="layui-input-inline flex" style="flex:1; align-items: center; cursor:pointer;">';
        itemHtml += '<i class="layui-icon layui-icon-subtraction" id="delSearchItem" name="' + name + '"></i> ';
        itemHtml += "</div>";
        itemHtml += "</div>";
      }
      var last = $(".search-index-item[name=" + name + "]");
      if (last.length > 0) {
        var lastItem = $(".search-index-item[name=" + name + "]")[last.length - 1];
        $(lastItem).after(itemHtml);
        form.render();
      }
    }

    // 渲染模板以及数据到dom元素里去
    function renderContent() {
      if (_this.pageData.length > 0) {
        var advview = document.getElementById("adv-body-advance");
        var fieldview = document.getElementById("adv-body-fields");
        // 上面检索项
        laytpl(advancepat).render(_this.pageData, function (html) {
          // 高级检索
          advview.innerHTML = html;
          form.render();
        });

        // 下面指令
        laytpl(fieldspat).render(_this.pageData, function (html) {
          fieldview.innerHTML = html;
        });
      }
    }

    $.getJSON("api/advance.json", function (res, status) {
      _this.pageData = res.data;
      renderContent();
    });

    /**
     * 去列表页面
     */
    function gotoListPage() {
      layui.sessionData("session", { key: "listValue", value: "A" });
      window.open("/list.html", "_blank");
    }

    /**
     * 检索
     */
    $("#instruceSearch").on("click", function () {
      // 纪录本页查询值
      var value = $("#instruceTexteat").val();
      var cValue = [];
      $("#")
        .find('input[value="checked"]')
        .each(function () {
          cValue.push($(this).data().value);
        });
      if (value && value !== "") {
        layui.sessionData("session", {
          key: "advanceSearchValue",
          value: value,
        });
        layui.sessionData("session", {
          key: "intellectCountryValue",
          value: cValue,
        });
        gotoListPage();
      }
    });

    /**
     * 清空
     */
    $("#instruce-clear").on("click", function () {
      $("#instruceTexteat").val("");
    });
    $("#advance-clear").on("click", function () {
      //
    });
    /**
     * 添加检索项
     */
    $("#advanceSearch").on("click", "#addSearchItem", function (e) {
      var name = $(e.currentTarget).attr("name");
      addItem(name);
    });
    /**
     * 删除检索项
     */
    $("#advanceSearch").on("click", "#delSearchItem", function (e) {
      $(e.currentTarget).parent().parent().remove();
    });

    /**
     * 指令点击
     */
    $("#advanceSearch").on("click", ".fields-item", function (e) {
      var value = $("#instruceTexteat").val();
      var text = $(e.currentTarget).text();
      value += text.split(":")[0] + ":";
      $("#instruceTexteat").val(value.trim());
    });

    $("#advanceSearch").on("click", ".add-to-ss", function (e) {
      var value = $("#instruceTexteat").val();
      var text = $(e.currentTarget).text();
      value += " " + text + " ";
      $("#instruceTexteat").val(value.trim());
    });
  });
}

initPage();

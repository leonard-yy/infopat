function initPage() {
  layui.use(["patNodataPage", "element", "layer"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      element = layui.element,
      layer = layui.layer;
    var _this = {
      favoriteData: [],
      chooseDate: null,
      checked: [],
      pageData: [],
    };

    function renderTable() {
      var date = _this.chooseDate || null;
      var noData = true;
      if (date) {
        var year = date.substring(0, 4);
        var yearData = _this.favoriteData.find(function (item) {
          return item.name == year;
        });
        if (yearData) {
          var value = yearData.value || [];
          var dateData = value.find(function (item) {
            return item.key == date;
          });
          if (dateData) {
            $("#chooseDate").html(dateData.key);
            var data = dateData.data;
            _this.pageData = data;
            if (data && data.length > 0) {
              noData = false;
              var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
              html += "     <colgroup>";
              html += "        <col><col><col><col><col><col><col>";
              html += "     </colgroup>";
              html += '     <thead><tr style="height:50px;">';
              html += "        <th></th><th>公开(公告)号</th><th>标题</th><th>公开(公告)日</th><th>申请日</th><th>申请人</th><th>发明人</th>";
              html += "     </tr></thead>";
              html += "     <tbody>";
              data.map(function (item) {
                html += '<tr style="height:50px;">';
                html += "<td>";
                html += '   <div class="squared-checkbox mt5">';
                html += '      <input type="checkbox" id="FAVORITE-' + item.id + '"/>';
                html += '      <label class="favorite-selector"/>';
                html += "   </div>";
                html += "</td>";
                html += "<td>" + item.documentNumber + "</td>";
                html += '<td style="max-width:400px" title="' + item.title + '">' + item.title + "</td>";
                html += "<td>" + item.documentDate + "</td>";
                html += "<td>" + item.applicationDate + "</td>";
                html += '<td style="max-width:350px" title="' + item.applicant + '">' + item.applicant + "</td>";
                html += '<td style="max-width:350px" title="' + item.inventor + '">' + item.inventor + "</td>";
                html += "</tr>";
              });
              html += "     </tbody>";
              html += "   </table>";
              $("#favoriteTable").html(html);
            }
          }
        }
      }
      if (noData) {
        renderNoData("#favoriteTable", "暂无数据");
      }
    }

    function renderYearSelect(data) {
      var html = '<ul class="layui-nav layui-nav-tree" >';

      data.map(function (item, index) {
        var child = item.value || [];
        html += '  <li class="layui-nav-item" data-value=' + item.name + ">";
        html += '     <a href="javascript:;" class="blod" title=' + item.name + ">" + item.name + "</a>";
        if (child.length > 0) {
          html += '<dl class="layui-nav-child">';
          child.map(function (c, idx) {
            if (idx == 0 && index == 0) {
              _this.chooseDate = c.key;
            }
            html += '     <dd><a href="javascript:;" class="date-choose-ex">' + c.key + "</a></dd>";
          });
        }
        html += "</dl>";
        html += "  </li>";
      });

      $(".time-range-content").html(html);
      element.render("nav");
      renderTable();
    }

    /**
     * 无数据渲染
     * @param {*} selector
     * @param {*} tips
     */
    function renderNoData(selector, tips) {
      $(selector).html(patNodataPage.getNoDataTips(tips));
    }

    /**
     * 初始化数据
     */
    $.getJSON("mock/favoriteData.json", function (res, status) {
      _this.favoriteData = res.data || [];
      renderYearSelect(res.data || []);
    });

    // 全选
    $("#selectAllFavorite").on("click", function (e) {
      if (_this.pageData.length == 0) {
        layer.msg("暂无数据");
        return;
      }
      if ($(e.currentTarget).hasClass("select-all")) {
        // 取消全选
        $(e.currentTarget).text("全选");
        $(e.currentTarget).removeClass("select-all");
        $(".favorite-selector").prev().attr("value", "unchecked");
        _this.checked = [];
      } else {
        // 全选
        $(e.currentTarget).text("全不选");
        $(e.currentTarget).addClass("select-all");
        $(".favorite-selector").prev().attr("value", "checked");
        _this.checked = [];
        _this.pageData.map(function (item) {
          _this.checked.push(item.id);
        });
      }
    });

    // 取消收藏
    $("#cancleFavorite").on("click", function (e) {
      if (_this.checked.length == 0) {
        layer.msg("请选择一条数据取消收藏");
        return;
      }
      layer.msg(_this.checked.toString());
    });

    /**
     * 自定义单选框
     */
    $("#favoriteTable").on("click", ".favorite-selector", function (e) {
      var input = $(e.currentTarget).parent().find('input[value="checked"]');
      var id = $(e.currentTarget).parent().find("input").attr("id");
      var value = id.split("-").pop();
      if (input.length > 0) {
        $(e.currentTarget).prev().attr("value", "unchecked");
      } else {
        _this.checked.push(value);
        $(e.currentTarget).prev().attr("value", "checked");
      }
    });

    $(".time-range-container").on("click", ".date-choose-ex", function (e) {
      _this.chooseDate = $(this).text();
      renderTable();
    });
  });
}

initPage();

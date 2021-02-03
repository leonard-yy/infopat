function initPage() {
  layui.use(["patNodataPage", "element", "layer", "request", "laypage"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      element = layui.element,
      layer = layui.layer,
      laypage = layui.laypage,
      request = layui.request;
    var _this = {
      favoriteData: [],
      chooseDate: null,
      checked: [],
      pageData: [],
      details: null,
      page: 1,
    };

    function renderTable() {
      var date = _this.chooseDate || null;
      var details = _this.details || null;
      var noData = true;
      if (date && details) {
        $("#favoriteTable").loding("start");
        $("#chooseDate").html(date);
        request.get(`${details}`, function (res) {
          $("#favoriteTable").loding("stop");
          if (res && res.data) {
            var data = res.data || [];
            _this.pageData = data;
            if (data && data.length > 0) {
              noData = false;
              var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
              html += "     <colgroup>";
              html += "        <col><col><col><col><col><col><col>";
              html += "     </colgroup>";
              html += '     <thead><tr style="height:50px;">';
              html += "        <th></th><th>公布（公告）日</th><th>标题</th><th>公开(公告)日</th><th>申请日</th><th>申请人</th><th>发明人</th>";
              html += "     </tr></thead>";
              html += "     <tbody>";
              data.map(function (item) {
                html += '<tr style="height:50px;">';
                html += "<td>";
                html += '   <div class="squared-checkbox mt5">';
                html += '      <input type="checkbox" id="FAVORITE-' + item.document_number + '"/>';
                html += '      <label class="favorite-selector"/>';
                html += "   </div>";
                html += "</td>";
                html += '<td><a href="/result.html?id=' + item.document_number + '">' + item.document_number + "</a></td>";
                html += '<td style="max-width:400px" title="' + item.title + '">' + item.title + "</td>";
                html += "<td>" + item.document_date + "</td>";
                html += "<td>" + item.application_date + "</td>";
                html += '<td style="max-width:350px" title="' + item.applicant + '">' + item.applicant + "</td>";
                html += '<td style="max-width:350px" title="' + item.inventor + '">' + item.inventor + "</td>";
                html += "</tr>";
              });
              html += "     </tbody>";
              html += "   </table>";
              $("#favoriteTable").html(html);
            }
            laypage.render({
              elem: "pageNavagete",
              count: res.total || 0,
              first: "首页",
              last: "尾页",
              curr: res.page || 1,
              prev: '<i class="layui-icon layui-icon-left" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i>',
              next: '<i class="layui-icon layui-icon-right" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i> ',
              jump: function (obj, first) {
                if (!first) {
                  _this.page = obj.curr;
                  renderTable();
                }
              },
            });
          }
        });
      }
      if (noData) {
        renderNoData("#favoriteTable", "暂无数据");
      }
    }

    function renderYearSelect(data) {
      var html = '<ul class="layui-nav layui-nav-tree" >';
      var first = true;
      var firstParent = true;
      layui.each(data, function (k, v) {
        var child = v || [];
        if (firstParent) {
          firstParent = false;
          html += '  <li class="layui-nav-item layui-nav-itemed" data-value=' + k + ">";
        } else {
          html += '  <li class="layui-nav-item" data-value=' + k + ">";
        }

        html += '     <a href="javascript:;" class="blod" title=' + k + ">" + k + "</a>";
        if (child.length > 0) {
          html += '<dl class="layui-nav-child">';
          layui.each(child, function (index, c) {
            var details = c.details.replace("api/", "");
            if (first) {
              first = false;
              _this.chooseDate = c.date;
              _this.details = details;
              html += '     <dd class="layui-this"><a href="javascript:;" class="date-choose-ex" data-value=' + details + ">" + c.date + "</a></dd>";
            } else {
              html += '     <dd><a href="javascript:;" class="date-choose-ex" data-value=' + details + ">" + c.date + "</a></dd>";
            }
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
     * 取消收藏
     */
    function removeFork() {
      request.deleteAsync(`user/favorites?id=${_this.checked.toString()}`);
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
    request.get(`user/favorites`, function (res) {
      if (res && res.data) {
        renderYearSelect(res.data || {});
      }
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
          _this.checked.push(item.document_number);
        });
      }
    });

    // 取消收藏
    $("#cancleFavorite").on("click", function (e) {
      if (_this.checked.length == 0) {
        layer.msg("请选择一条数据取消收藏");
        return;
      }

      removeFork();
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
      _this.details = $(this).data().value;
      renderTable();
    });
  });
}

initPage();

function initPage() {
  layui.use(["patNodataPage", "element"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      element = layui.element;
    var _this = {
      favoriteData: [],
      chooseDate: null,
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
            if (data && data.length > 0) {
              noData = false;
              var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
              html += "     <colgroup>";
              html += "        <col><col><col><col><col><col><col>";
              html += "     </colgroup>";
              html += "     <thead><tr>";
              html += "        <th></th><th>公开(公告)号</th><th>标题</th><th>公开(公告)日</th><th>申请日</th><th>申请人</th><th>发明人</th>";
              html += "     </tr></thead>";
              html += "     <tbody>";
              data.map(function (item, index) {
                html += "<tr>";
                html += '<td style="min-width:60px">';
                html += '      <div class="squared-checkbox">';
                html += '          <input type="checkbox" id="FAVORITE-' + item.id + '"/>';
                html += '          <label class="result-selector-parent"/>';
                html += "      </div>";
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
        html += '     <a href="javascript:;"  title=' + item.name + ">" + item.name + "</a>";
        if (child.length > 0) {
          html += '<dl class="layui-nav-child">';
          child.map(function (c, idx) {
            if (idx == 0 && index == 0) {
              _this.chooseDate = c.key;
            }
            html += '     <dd><a href="javascript:;">' + c.key + "</a></dd>";
          });
        }
        html += "</dl>";
        html += "  </li>";
      });

      $(".time-range-container").html(html);
      element.render("nav");
      renderTable();
    }

    function renderNoData(selector, tips) {
      $(selector).html(patNodataPage.getNoDataTips(tips));
    }

    $.getJSON("mock/favoriteData.json", function (res, status) {
      _this.favoriteData = res.data || [];
      renderYearSelect(res.data || []);
    });
  });
}

initPage();

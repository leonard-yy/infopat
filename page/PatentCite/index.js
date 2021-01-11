function initPage() {
  layui.use(["patNodataPage"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage;

    function renderTableTop(data) {
      if (data && data.length > 0) {
        var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
        html += "     <colgroup>";
        html += '        <col width="80"><col width="150"><col width="150"><col width="150"><col width="150"><col><col width="150"><col>';
        html += "     </colgroup>";
        html += "     <thead><tr>";
        html += "        <th>序号</th><th>公开(公告)号</th><th>公开(公告)日</th><th>申请日</th><th>专利类型</th><th>标题</th><th>法律状态</th><th>申请人</th>";
        html += "     </tr></thead>";
        html += "     <tbody>";
        data.map(function (item, index) {
          var color = item.legalStatus == "有效专利" ? "#719D22" : "#E02020";

          html += "<tr>";
          html += '<td style="min-width:60px">' + (index + 1) + "</td>";
          html += "<td>" + item.documentNumber + "</td>";
          html += '<td style="min-width:110px">' + item.documentDate + "</td>";
          html += "<td>" + item.applicationDate + "</td>";
          html += "<td>" + item.type + "</td>";
          html += '<td style="max-width:400px" title="' + item.title + '">' + item.title + "</td>";
          html += '<td style="color:' + color + '">' + item.legalStatus + "</td>";
          html += '<td style="max-width:350px" title="' + item.applicant + '">' + item.applicant + "</td>";
          html += "</tr>";
        });
        html += "     </tbody>";
        html += "   </table>";
        $("#citedContent").html(html);
      } else {
        renderNoData("#citedContent", "该专利没有被任何外部专利所引用");
      }
    }

    function renderTableBottom(data) {
      if (data && data.length > 0) {
        var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
        html += "     <colgroup>";
        html += '        <col width="80"><col width="150"><col width="150"><col width="150"><col width="150"><col><col width="150"><col>';
        html += "     </colgroup>";
        html += "     <thead><tr>";
        html += "        <th>序号</th><th>公开(公告)号</th><th>公开(公告)日</th><th>申请日</th><th>专利类型</th><th>标题</th><th>法律状态</th><th>申请人</th>";
        html += "     </tr></thead>";
        html += "     <tbody>";
        data.map(function (item, index) {
          var color = item.legalStatus == "有效专利" ? "#719D22" : "#E02020";

          html += "<tr>";
          html += '<td style="min-width:60px">' + (index + 1) + "</td>";
          html += "<td>" + item.documentNumber + "</td>";
          html += '<td style="min-width:110px">' + item.documentDate + "</td>";
          html += "<td>" + item.applicationDate + "</td>";
          html += "<td>" + item.type + "</td>";
          html += '<td style="max-width:400px" title="' + item.title + '">' + item.title + "</td>";
          html += '<td style="color:' + color + '">' + item.legalStatus + "</td>";
          html += '<td style="max-width:350px" title="' + item.applicant + '">' + item.applicant + "</td>";
          html += "</tr>";
        });
        html += "     </tbody>";
        html += "   </table>";
        $("#citeContent").html(html);
      } else {
        renderNoData("#citeContent", "该专利没有引用任何外部专利数据");
      }
    }

    function renderNoData(selector, tips) {
      $(selector).html(patNodataPage.getNoDataTips(tips));
    }

    $.getJSON("mock/resultInfo.json", function (res, status) {
      var citeData = res.citeData;
      var citeData2 = res.citeData2;
      renderTableTop(citeData);
      renderTableBottom(citeData2);
    });
  });
}

initPage();

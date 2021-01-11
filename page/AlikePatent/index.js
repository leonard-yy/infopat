function initPage() {
  layui.use(["table", "patNodataPage"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage;

    function renderTable(data) {
      if (data && data.length > 0) {
        var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
        html += "     <colgroup>";
        html += '        <col width="150"><col><col width="150"><col><col>';
        html += "     </colgroup>";
        html += "     <thead><tr>";
        html += "        <th>公开(公告)号</th><th>标题</th><th>公开(公告)日</th><th>申请人</th><th>发明（设计）人</th>";
        html += "     </tr></thead>";
        html += "     <tbody>";
        data.map(function (item, index) {
          html += "<tr>";
          html += "<td>" + item.documentNumber + "</td>";
          html += '<td style="max-width:400px" title="' + item.title + '">' + item.title + "</td>";
          html += "<td>" + item.documentDate + "</td>";
          html += '<td style="max-width:350px" title="' + item.applicant + '">' + item.applicant + "</td>";
          html += '<td style="max-width:350px" title="' + item.assignee + '">' + item.assignee + "</td>";
          html += "</tr>";
        });
        html += "     </tbody>";
        html += "   </table>";
        $("#AlikePatentContent").html(html);
      } else {
        $("#AlikePatentContent").html(patNodataPage.html);
      }
    }

    $.getJSON("mock/resultInfo.json", function (res, status) {
      var alikeData = res.alikeData;
      renderTable(alikeData);
    });
  });
}

initPage();

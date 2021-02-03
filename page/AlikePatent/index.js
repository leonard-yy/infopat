function initPage() {
  layui.use(["table", "patNodataPage", "request", "loader"], function () {
    var $ = layui.jquery,
      patNodataPage = layui.patNodataPage,
      loader = layui.loader,
      request = layui.request;

    function renderTable(data) {
      if (data && data.length > 0) {
        var html = '<table class="layui-table" lay-even="" lay-skin="nob">';
        html += "     <colgroup>";
        html += '        <col width="150"><col><col width="150"><col><col>';
        html += "     </colgroup>";
        html += "     <thead><tr>";
        html += "        <th>公布（公告）日</th><th>标题</th><th>公开(公告)日</th><th>申请人</th><th>发明（设计）人</th>";
        html += "     </tr></thead>";
        html += "     <tbody>";
        data.map(function (item, index) {
          html += "<tr>";
          html += "<td>" + item.documentNumber + "</td>";
          html += '<td style="max-width:400px" title="' + item.title + '">' + item.title + "</td>";
          html += "<td>" + item.documentDate + "</td>";
          html += '<td style="max-width:350px" title="' + item.applicant + '">' + item.applicant + "</td>";
          html += '<td style="max-width:350px" title="' + item.inventor + '">' + item.inventor + "</td>";
          html += "</tr>";
        });
        html += "     </tbody>";
        html += "   </table>";
        $("#AlikePatentContent").html(html);
      } else {
        $("#AlikePatentContent").html(patNodataPage.html);
      }
    }

    function init() {
      var p = request.getParamFromUri("p");
      var q = request.getParamFromUri("q");
      var id = option.id;
      $("#AlikePatentContent").loding("start");
      request.get(`adv/s?ds=cn&q=${q}&p=${p}`, function (res) {
        if (res) {
          request.get(`adv/patent/like?id=${id}`, function (res2) {
            if (res2) {
              renderTable(res2.patentLikeList);
              $("#AlikePatentContent").loding("stop");
              loader.hide($("#loading"));
            } else {
              $("#AlikePatentContent").loding("stop");
              loader.hide($("#loading"));
            }
          });
        } else {
          $("#AlikePatentContent").loding("stop");
        }
      });
    }

    // $.getJSON("mock/resultInfo.json", function (res, status) {
    //   var alikeData = res.alikeData;
    //   renderTable(alikeData);
    // });
    init();
  });
}

initPage();

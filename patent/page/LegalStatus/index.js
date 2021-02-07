layui.use(["laytpl", "patBasicInfo", "lsTable", "request"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    patBasicInfo = layui.patBasicInfo,
    Table = layui.lsTable,
    request = layui.request;
  //动态加载CSS
  layui.link("./page/LegalStatus/index.css");
  //从session里面获取模拟数据
  // var data = layui.sessionData("session").basicInfo;
  //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
  // var tpl = patBasicInfo.getTpl(data);
  //渲染模板以及数据到dom元素里去
  // var view = document.getElementById("basicInfoView");

  // laytpl(tpl).render(data, function (html) {
  //   view.innerHTML = html;
  // });

  var qwflUrl = "/api/adv/patent/tx?id=" + option.id;
  function getDataList(url, cb) {
    request.get(
      url,
      function (res) {
        if (res.transactions) {
          cb && cb(res.transactions);
        } else {
          renderNoData();
        }
      },
      function () {
        renderNoData();
      }
    );
  }

  function renderNoData() {
    // 清除loding
    $(".detailInfo").loding("stop");
    // 提示无数据
    $(".detailInfo").html(`<div class="table-container-common table-item"  id='zl-flzt-table'>
    <div class="table-title-common table-title">法律状态信息</div>
      <div class="no-data-onepage">
        <img src="./images/nodata.png" alt="_" />
      <div>暂无数据</div>
      </div>
    </div>`);
  }

  if (qwflUrl) {
    //根据链接查询法律全文状态信息
    $(".detailInfo").loding("start");
    getDataList(qwflUrl, function (flztData) {
      let flztTpl = Table.getTpl("flztTpl");
      var flztTable = document.getElementById("zl-flzt-table");
      laytpl(flztTpl).render(flztData, function (html) {
        flztTable.innerHTML = html;
      });
      $(".detailInfo").loding("stop");
    });
  } else {
    let flztTpl = Table.getTpl("flztTpl");
    var flztTable = document.getElementById("zl-flzt-table");
    laytpl(flztTpl).render([], function (html) {
      flztTable.innerHTML = html;
    });
  }
});

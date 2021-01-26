layui.use(["laytpl", "patBasicInfo", "lsTable"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    patBasicInfo = layui.patBasicInfo,
    Table = layui.lsTable;
  //动态加载CSS
  layui.link("./page/LegalStatus/index.css");
  //从session里面获取模拟数据
  var data = layui.sessionData("session").basicInfo;
  var allInfo = layui.sessionData("session").allInfo;
  var qwflUrl = allInfo["全文与法律信息"];
  function getDataList(url, cb) {
    $.ajax({
      type: "GET",
      url: url,
      success: function (result) {
        //返回成功进行响应操作
        if (result.data) {
          cb && cb(result.data);
        }
      },
      error: function () {
        $(".detailInfo").html(`<div class="table-container-common table-item"  id='zl-flzt-table'>
        <div class="table-title-common table-title">法律状态信息</div>
      <div class="no-data-onepage">
        <img src="./images/nodata.png" alt="_" />
        <div>暂无数据</div>
      </div>
    </div>`);
      },
      complete: function () {},
    });
  }

  //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
  let tpl = patBasicInfo.getTpl(data);

  //渲染模板以及数据到dom元素里去
  var view = document.getElementById("basicInfoView");

  laytpl(tpl).render(data, function (html) {
    view.innerHTML = html;
  });

  if (qwflUrl) {
    //根据链接查询法律全文状态信息
    $(".detailInfo").loding("start");
    getDataList(qwflUrl, function (data) {
      var flUrl = data["法律状态信息"] && data["法律状态信息"]["事务数据"] ? data["法律状态信息"]["事务数据"] : null;
      //根据链接查询法律状态信息
      if (!flUrl) {
        return;
      }
      getDataList(flUrl, function (flztData) {
        let flztTpl = Table.getTpl("flztTpl");
        var flztTable = document.getElementById("zl-flzt-table");
        laytpl(flztTpl).render(flztData, function (html) {
          flztTable.innerHTML = html;
        });
        $(".detailInfo").loding("stop");
      });
    });
  } else {
    let flztTpl = Table.getTpl("flztTpl");
    var flztTable = document.getElementById("zl-flzt-table");
    laytpl(flztTpl).render([], function (html) {
      flztTable.innerHTML = html;
    });
  }

  //loading框
  // $(".detailInfo").loding("start");
  // setTimeout(() => {
  //   $(".detailInfo").loding("stop");
  // }, 1000);
});

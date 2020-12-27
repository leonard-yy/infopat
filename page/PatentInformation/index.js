layui.use(["laytpl", "patBasicInfo", "picture", "piTable"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    patBasicInfo = layui.patBasicInfo,
    picture = layui.picture,
    Table = layui.piTable;
  //动态加载CSS
  layui.link("./page/PatentInformation/index.css");
  //从session里面获取模拟数据
  var data = layui.sessionData("session").basicInfo;
  var allInfo = layui.sessionData("session").allInfo;
  var qwflUrl = allInfo["全文与法律信息"];
  function getDataList(url, resolve, reject) {
    $.ajax({
      type: "GET",
      url: url,
      success: function (result) {
        //返回成功进行响应操作
        if (result.data) {
          resolve && resolve(result.data);
        }
      },
      error: function () {
        if (reject) {
          reject();
        }
      },
      complete: function () {
        $(".detailInfo").loding("stop");
      },
    });
  }

  //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
  let tpl = patBasicInfo.getTpl(data);

  //渲染模板以及数据到dom元素里去
  var view = document.getElementById("basicInfoView");

  laytpl(tpl).render(data, function (html) {
    view.innerHTML = html;
  });

  //构造专利全文信息list
  var qwDataList = [];
  if (qwflUrl) {
    //根据链接查询法律全文状态信息
    $(".detailInfo").loding("start");
    getDataList(
      qwflUrl,
      function (data) {
        var qwData = data["专利全文信息"];

        if (!qwData) {
          return;
        }

        Object.keys(qwData).map(function (name) {
          const urlData = qwData[name];
          qwDataList.push({
            name: name,
            imgUrl: (urlData && urlData["img"]) || "",
            pdfUrl: (urlData && urlData["pdf"]) || "",
          });
        });

        let qwTpl = Table.getTpl("qwTpl");
        var qwTable = document.getElementById("zl-qw-table");
        laytpl(qwTpl).render(qwDataList, function (html) {
          qwTable.innerHTML = html;
        });

        // 查看图片
        $(".action-show").off("click");
        $(".action-show").on("click", function (e) {
          $(".table-item .no-data-onepage").hide();
          let $element = $(e.currentTarget);
          let isActive = $element.hasClass("active");
          //去除原有节点 打开样式
          $(".action-show.active img").attr("src", "./images/dakai.png");
          $(".action-show.active span").text("打开");
          $(".action-show.active").removeClass("active");
          //如果当前节点已经是打开状态 那么再次点击收起
          if (isActive) {
            $("#common-container-picture").hide();
            return;
          }
          //给当前节点 添加打开样式
          $element.addClass("active");
          $(".action-show.active img").attr("src", "./images/shouqi.png");
          $(".action-show.active span").text("收起");
          //显示图片
          $("#common-container-picture").show();
          var imgUrl = $element.data("url");
          if (imgUrl && imgUrl != "") {
            getDataList(
              imgUrl,
              function (imgs) {
                picture.init("#common-container-picture", imgs);
              },
              function () {
                $(".table-item .no-data-onepage").show();
              }
            );
          }
        });
        //下载
        $(".action-download").off("click");
        $(".action-download").on("click", function (e) {
          let $element = $(e.currentTarget);
          var pdfUrl = $element.data("url");
          if (pdfUrl && pdfUrl != "") {
            getDataList(
              pdfUrl,
              function (pdfDownloadUrl) {
                window.open(pdfDownloadUrl);
              },
              function (params) {
                $(".table-item .no-data-onepage").show();
              }
            );
          }
        });
      },
      function () {
        $(".detailInfo").html(`<div class="table-container-common table-item">
      <div class="table-title-common table-title">专利全文</div>
    <div class="no-data-onepage">
      <img src="./images/nodata.png" alt="_" />
      <div>暂无数据</div>
    </div>
  </div>`);
      }
    );
  } else {
    let qwTpl = Table.getTpl("qwTpl");
    var qwTable = document.getElementById("zl-qw-table");
    laytpl(qwTpl).render([], function (html) {
      qwTable.innerHTML = html;
    });
  }

  //loading框
  // $(".detailInfo").loding("start");
  // setTimeout(() => {
  //   $(".detailInfo").loding("stop");
  // }, 1000);
});

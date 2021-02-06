layui.use(["laytpl", "patBasicInfo", "picture", "piTable", "request"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    patBasicInfo = layui.patBasicInfo,
    picture = layui.picture,
    Table = layui.piTable,
    request = layui.request;
  //动态加载CSS
  layui.link("./page/PatentInformation/index.css");
  //从session里面获取模拟数据
  // var data = layui.sessionData("session").basicInfo;
  //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
  // let tpl = patBasicInfo.getTpl(data);

  //渲染模板以及数据到dom元素里去
  // var view = document.getElementById("basicInfoView");

  // laytpl(tpl).render(data, function (html) {
  //   view.innerHTML = html;
  // });

  function renderNoData() {
    var qwTpl = Table.getTpl("qwTpl");
    var qwTable = document.getElementById("zl-qw-table");
    laytpl(qwTpl).render([], function (html) {
      qwTable.innerHTML = html;
    });
  }

  function getDataList(url, resolve, reject) {
    $(".detailInfo").loding("start");
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

  function renderTable(pdfList) {
    layui.each(pdfList, function (index, item) {
      var imgUrl = "/api/adv/pdf2img?v=1&key=" + item;
      var downloadUrl = "/api/adv/pdf?v=1&key=" + item;
      qwDataList.push({
        name: option.id,
        imgUrl: imgUrl || "",
        pdfUrl: downloadUrl || "",
      });
    });
    let qwTpl = Table.getTpl("qwTpl");
    var qwTable = document.getElementById("zl-qw-table");
    laytpl(qwTpl).render(qwDataList, function (html) {
      qwTable.innerHTML = html;

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
        window.open(pdfUrl);
      });
    });
  }

  // 请求数据
  // http://www.infodossier.test:2080/api/adv/pdf?key=/CN/api/2016/05/25/2/CN205263153U.pdf&v=1
  // http://www.infodossier.test:2080/api/adv/pdf2img?key=/CN/api/2016/05/25/2/CN205263153U.pdf&v=1
  var qwDataList = [];
  $(".detailInfo").loding("start");
  request.get(
    `/api/adv/patent/base?id=${option.id}`,
    function (res) {
      $(".detailInfo").loding("stop");
      var hasData = false;
      if (res && res.patent) {
        var pdfList = res.patent.pdfList || [];
        if (pdfList.length > 0) {
          hasData = true;
          renderTable(pdfList);
        }
      }
      if (!hasData) {
        renderNoData();
      }
    },
    function () {
      $(".detailInfo").loding("stop");
      $(".detailInfo").html(`<div class="table-container-common table-item">
      <div class="table-title-common table-title">专利全文</div>
        <div class="no-data-onepage">
        <img src="./images/nodata.png" alt="_" />
        <div>暂无数据</div>
      </div>
    </div>`);
    }
  );
});

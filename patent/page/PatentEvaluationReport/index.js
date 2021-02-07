layui.use(["laytpl", "patBasicInfo", "picture"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    picture = layui.picture,
    patBasicInfo = layui.patBasicInfo;
  //动态加载CSS
  layui.link("./page/PatentEvaluationReport/index.css");
  //从session里面获取模拟数据
  var data = null;
  var allInfo = null;
  var scxxData = null;

  function getImgUrl(url, cb) {
    $(".detailInfo").loding("start");
    $.ajax({
      type: "GET",
      url: url,
      success: function (result) {
        //返回成功进行响应操作
        if (result.data) {
          cb && cb(result.data);
        }
      },

      complete: function () {
        $(".detailInfo").loding("stop");
      },
    });
  }

  //获取模板 入参为false 返回暂无数据，如果有数据的话则正常返回模板
  var tpl = patBasicInfo.getTpl(true);
  //渲染模板以及数据到dom元素里去
  var view = document.getElementById("basicInfoView");
  laytpl(tpl).render({}, function (html) {
    view.innerHTML = html;
  });

  $(".mypage-container").loding("start");
  function render() {
    $(".mypage-container").loding("stop");
    // 基础信息
    laytpl(tpl).render(data, function (html) {
      view.innerHTML = html;
    });

    //如果沒有數據直接顯示暫無數據
    if (!scxxData) {
      renderNoData();
      return;
    }
    //渲染专利评价报告
    let pjbgData = scxxData["评价报告"];
    if (pjbgData) {
      const pjbgValue = Object.values(pjbgData);
      //请求查询
      if (pjbgValue && pjbgValue[0] && pjbgValue[0] != "") {
        getImgUrl(pjbgValue[0], function (imgs) {
          console.log(imgs);
          if (imgs && imgs.length > 0) {
            $("#common-container-picture").show();
            $(".nodataInfo").hide();
            picture.init("#common-container-picture", imgs, { mask: false });
          } else {
            $("#common-container-picture").hide();
            $(".nodataInfo").show();
          }
        });
        return;
      }
    } else {
      renderNoData();
    }
  }

  function renderNoData() {
    $(".detailInfo").html(`<div class="table-container-common table-item" >
      <div class="table-title-common table-title">专利权评价报告</div>
      <div class="no-data-onepage">
        <img src="./images/nodata.png" alt="_" />
        <div>暂无数据</div>
      </div>
    </div>`);
  }

  var check = 0;
  function init() {
    check++;
    data = layui.sessionData("session").basicInfo || {};
    allInfo = layui.sessionData("session").allInfo || {};
    scxxData = allInfo["审查信息"] || null;
    if (scxxData || check > 15) {
      scxxData = allInfo["审查信息"] || {};
      render();
    } else {
      setTimeout(init, 1000);
    }
  }
  init();
});

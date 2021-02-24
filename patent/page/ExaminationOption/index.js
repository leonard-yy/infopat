layui.use(["laytpl", "patBasicInfo", "picture", "eoTable"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    picture = layui.picture,
    patBasicInfo = layui.patBasicInfo,
    Table = layui.eoTable;
  //动态加载CSS
  layui.link("./page/ExaminationOption/index.css");
  //从session里面获取模拟数据
  var data = null;
  var allInfo = null;
  var scxxData = null;

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
    //渲染专利审查意见通知书
    let tzsData = scxxData["通知书"];
    let scyjData = [];
    if (tzsData) {
      Object.keys(tzsData).map(function (name) {
        const value = tzsData[name];
        let res = [];
        let matchs = name.match(/^(\d{4}-\d{2}-\d{2})\s(.+)$/);
        if (matchs) {
          res.push(matchs[1] || "--");
          res.push(matchs[2] || "--");
          res.push(value);
        }
        scyjData.push(res);
      });
    }

    let scyjTpl = Table.getTpl("scyjTpl");
    var scyjTable = document.getElementById("zl-scyj-table");
    laytpl(scyjTpl).render(scyjData, function (html) {
      scyjTable.innerHTML = html;
    });

    // 查看图片
    $(".action-show").on("click", function (e) {
      const item = e.currentTarget;
      const url = $(item).data("url");

      getImgUrl(url, function (imgs) {
        console.log(imgs);
        showPitcure(imgs);
      });
    });
  }

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

  function showPitcure(imgs) {
    $("#optionCommonPicture").show();

    picture.init("#optionCommonPicture", imgs, {
      closeIcon: true,
      full: true,
    });
  }

  var check = 0;
  function init() {
    check++;
    data = layui.sessionData("session").basicInfo || {};
    allInfo = layui.sessionData("session").allInfo || {};
    scxxData = allInfo["审查信息"] || null;
    if (data.number || scxxData || check > 15) {
      scxxData = allInfo["审查信息"] || {};
      render();
    } else {
      setTimeout(init, 1000);
    }
  }
  init();
});

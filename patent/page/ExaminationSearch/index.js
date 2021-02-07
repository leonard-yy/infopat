layui.use(["laytpl", "patBasicInfo", "esTable"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    patBasicInfo = layui.patBasicInfo,
    Table = layui.esTable;
  //动态加载CSS
  layui.link("./page/ExaminationSearch/index.css");
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
    let jsData = scxxData["检索信息"];
    //如果沒有數據直接顯示暫無數據
    if (!scxxData || !jsData) {
      $(".detailInfo").html(`<div class="table-container-common table-item" id="zl-scjs-table">
        <div class="table-title-common table-title">审查检索信息</div>
          <div class="no-data-onepage">
          <img src="./images/nodata.png" alt="_" />
          <div>暂无数据</div>
        </div>
      </div>`);
      return;
    }
    //渲染检索信息
    // let jsData = scxxData["检索信息"];
    let dycUrl = "";
    let dercUrl = "";
    if (jsData) {
      Object.keys(jsData).map(function (name) {
        if (name && name.includes("首次")) {
          dycUrl = jsData[name];
        }
        if (name && name.includes("补充")) {
          dercUrl = jsData[name];
        }
      });
    }
    //根据链接查询第一次检索信息
    if (dycUrl && dycUrl != "") {
      getJsDataList(dycUrl, function (data) {
        console.log(data);
        const dycData = resetData(data);
        if (dycData && dycData != {}) {
          $("#zl-scjs-table").hide();
        }
        let dycTpl = Table.getTpl("dycTpl");
        var dycTable = document.getElementById("zl-dyc-table");
        laytpl(dycTpl).render(dycData, function (html) {
          dycTable.innerHTML = html;
        });
      });
    }

    //根据链接查询第二次检索信息
    if (dercUrl && dercUrl != "") {
      getJsDataList(dercUrl, function (data) {
        console.log(data);
        const dercData = resetData(data);
        if (dercData && dercData != {}) {
          $("#zl-scjs-table").hide();
        }
        let dercTpl = Table.getTpl("dercTpl");
        var dercTable = document.getElementById("zl-derc-table");
        laytpl(dercTpl).render(dercData, function (html) {
          dercTable.innerHTML = html;
        });
      });
    }
  }

  function getJsDataList(url, cb) {
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
  function resetData(data) {
    let res = {};
    if (!data && data.length == 0) {
      return {};
    }
    if (data[0]) {
      const info = data[0];
      res = {
        jslx: info[0] || "--",
        flh: info[7] || "--",
        jsjl: info[7] || "--",
        sqri: info[2] || "--",
        sqhao: info[1] || "--",
        sqren: info[3] || "--",
        yxr: info[4] || "--",
        yqs: info[5] || "--",
        smsds: info[6] || "--",
      };
    }
    res = {
      ...res,
      zldbList: data[1] || [],
      qkdbList: data[2] || [],
      sjdbList: data[3] || [],
    };

    return res;
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

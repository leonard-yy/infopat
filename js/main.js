layui.use(
  ["element", "layer", "layuimini", "layuipotal", "form", "loader"],
  function () {
    var $ = layui.jquery,
      element = layui.element,
      layuimini = layui.layuimini,
      form = layui.form;
    form.render();
    // layuipotal._init("api/potal.json");
    layuimini.init("api/init.json");
    layuimini.listen();
    //--以上是项目初始化结构 ------
    //初始化提示框
    ToolTip.init({
      delay: 400,
      fadeDuration: 250,
      fontSize: "1.0em",
      theme: "dark",
      textColor: "#333333",
      shadowColor: "#F9EDCD",
      fontFamily:
        "century gothic, texgyreadventor, stheiti, sans-serif,'Roboto-Medium', 'Roboto-Regular', Arial",
    });

    // 登陆
    // login();
    //全屏
    $("#btnFullscreen").on("click", function (e) {
      const isfull = isFullscreen();
      if (!isfull) {
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen();
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen();
        } else if (document.body.webkitRequestFullscreen) {
          document.body.webkitRequestFullscreen();
        } else if (document.body.msRequestFullscreen) {
          document.body.msRequestFullscreen();
        }
        $("#btnFullscreen").text("退出全屏");
      } else {
        if (document.exitFullScreen) {
          document.exitFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (element.msExitFullscreen) {
          element.msExitFullscreen();
        }
        $("#btnFullscreen").text("全屏");
      }
    });

    //初次进入页面 loading框 此处是模拟的 请适当结合ajax请求使用
    // $("body").addClass("nopointer");
    // $("#loading").addClass("wrapperAll").show();
    // // Splitting();
    // setTimeout(() => {
    //   $("body").removeClass("nopointer");
    //   $("#loading").hide().removeClass("wrapperAll");
    // }, 300);
    // const search = window.location.search;
    // var PAT_CODE = search.replace("?", "");
    // $("#input-search").val(PAT_CODE);

    // try {
    //   if (PAT_CODE) {
    //     getData(false, () => {
    //       var inter = setInterval(() => {
    //         if (initData) {
    //           window.clearInterval(inter);
    //           initData();
    //         }
    //       }, 100);
    //     });
    //   }
    // } catch (error) {}
    // initBtnSearch();
    // initBtnRefresh();
  }
);

function login() {
  $.ajax({
    type: "GET",
    url: `https://www.infopat.net/patent/v2/session?t=${new Date().getTime()}`,
    success: function (result) {
      if (result && result.code == 1) {
        $(".username").html(result.data.username);
      } else {
        // 尚未登陆
        $(".username").html("尚未登陆");
      }
    },
    error: function () {},
    complete: function (result) {},
  });
}

function initBtnSearch() {
  //搜索 打印 全屏按钮事件
  $("#btn-search").click(function () {
    let search = $("#input-search").val();
    search = search.replace(/\.|ZL|zl|CN|cn| /g, "");
    $("#input-search").val(search);
    console.log("查询专利编号为：", search);
    if (search) {
      // var href =
      //   window.location.origin + window.location.pathname + "?" + search;
      // window.location.href = href;
      // window.location.search = "?" + search;
      // window.location.hash = "#page/CostInfo/index.html";
      sessionStorage.clear();
      layuimini.hash("page/CostInfo/index.html");
      getData(false, () => {
        var inter = setInterval(() => {
          if (initData) {
            window.clearInterval(inter);
            initData();
          }
        }, 100);
      });
    } else {
      alert("请输入专利号");
    }
  });
}
function initBtnRefresh() {
  // 更新
  $(".layuimini-content-page").delegate("#btn-refresh", "click", function () {
    let search = $("#input-search").val();
    console.log("查询专利编号为：", search);
    if (search) {
      sessionStorage.clear();
      layuimini.hash("page/CostInfo/index.html");
      getData(true, () => {
        var inter = setInterval(() => {
          if (initData) {
            window.clearInterval(inter);
            initData();
          }
        }, 100);
      });
    } else {
      alert("请输入专利号");
    }
  });
}

function getData(refresh = false, cb) {
  //将基本信息放在session里面
  layui.loader.show($("#loading"));

  var number = $("#input-search").val();
  if (!number || number == "") {
    // FIXME:没有输入专利号 添加自定义的错误提示
    alert("请输入查询专利号");
  }
  var url = `https://www.infopat.net/patent/v2/${number}`;
  if (refresh) {
    url += "?refresh=1";
  }
  $.ajax({
    type: "GET",
    url: url,
    success: function (result) {
      //返回成功进行响应操作
      if (result.data) {
        let AllInfo = result.data;
        // 放到session里，减少重复请求
        layui.sessionData("session", {
          key: "allInfo",
          value: AllInfo,
        });
        let basicInfo = AllInfo["申请信息"] || {};
        layui.sessionData("session", {
          key: "basicInfo",
          value: {
            updateDate: AllInfo["查询时间"] || "--",
            status: basicInfo["案件状态"] || "--",
            number: basicInfo["专利号码"] || "--",
            flNumber: basicInfo["主分类号"] || "--",
            name: basicInfo["专利名称"] || "--",
            applicationDate: basicInfo["申请日期"] || "",
            applicant:
              (basicInfo["申请人"] && basicInfo["申请人"].join("、")) || "--",
            inventor:
              (basicInfo["发明人"] && basicInfo["发明人"].join("、")) || "--",
            Agency:
              (basicInfo["代理情况"] &&
                basicInfo["代理情况"]["代理机构名称"]) ||
              "--",
            agent:
              (basicInfo["代理情况"] && basicInfo["代理情况"]["第一代理人"]) ||
              "--",
          },
        });
        cb && cb();
      } else {
        layui.sessionData("session", {
          key: "allInfo",
          value: {},
        });
        layui.sessionData("session", {
          key: "basicInfo",
          value: {},
        });
        alert(result.message);
      }
    },
    error: function () {
      layui.sessionData("session", {
        key: "allInfo",
        value: {},
      });
      layui.sessionData("session", {
        key: "basicInfo",
        value: {},
      });
    },
    complete: function () {
      // $(".detailInfo").loding("stop");

      //关闭loading层
      layui.loader.hide($("#loading"));
    },
  });
}

function isFullscreen() {
  var text = btnFullscreen.textContent;
  if (text === "全屏") {
    return false;
  } else {
    return true;
  }
}

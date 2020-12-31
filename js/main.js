layui.use(["element", "layer", "layuimini", "layuipotal", "form", "loader"], function () {
  layuipotal.init("api/potal.json");
  //--以上是项目初始化结构 ------
  //初始化提示框
  ToolTip.init({
    delay: 400,
    fadeDuration: 250,
    fontSize: "1.0em",
    theme: "dark",
    textColor: "#333333",
    shadowColor: "#F9EDCD",
    fontFamily: "century gothic, texgyreadventor, stheiti, sans-serif,'Roboto-Medium', 'Roboto-Regular', Arial",
  });

  // 登陆
  // login();
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
});

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

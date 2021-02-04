// 屏幕可视高度
var clientHight = document.documentElement.clientHeight;
var userLogin = false;
$(function () {
  islogin();
  adaptPhone();
  // 初始化锚点 以及锚点跟随事件
  initSearch();
  // 初始化锚点 以及锚点跟随事件
  initAnchor();
  //使用声明提示框 关闭事件
  initpPolicyClick();
  //初始化下拉框
  initSelectCountry();
  //了解更多
  $(".more").click(function () {
    $("html,body").animate({ scrollTop: clientHight });
  });
  //点击登录
  $(".login").click(function () {
    // window.open("/login.html", "_self");
    // $("#loginForm").show();
  });
  //点击退出登录
  $(".logout").click(function () {
    $.ajax({
      type: "DELETE",
      url: ` https://www.infodossier.comlogout?t=${new Date().getTime()}`,
      complete: function (result) {
        window.location.reload();
      },
    });
  });
  //搜索标签切换
  $(".div-types .type").click(function (e) {
    var $ele = $(e.currentTarget);
    $ele.addClass("active").siblings().removeClass("active");
  });
  // 清除通告
  setTimeout(function () {
    $(".fixed-public").remove();
  }, 60 * 1000);
});
function adaptPhone() {
  var ua = navigator.userAgent;

  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
  if (isMobile) {
    var fileref = document.createElement("link");
    fileref.setAttribute("rel", "stylesheet");
    fileref.setAttribute("type", "text/css");
    fileref.setAttribute("href", "./css/phone.css");
  }
  if (typeof fileref != "undefined") {
    document.getElementsByTagName("head")[0].appendChild(fileref);
    $(".img-content2-phone").show();
    $(".img-content2").hide();
  }
}
function islogin(cb) {
  $.ajax({
    type: "GET",
    url: `/api/user/session?t=${new Date().getTime()}`,
    success: function (result) {
      if (result && result.code == 1) {
        $(".username").html(result.data.username);
        $(".logined,.logout").show();
        $(".login,.try").hide();
        userLogin = true;
        cb && cb(true);
      } else {
        // 尚未登陆
        $(".logout,.logined").hide();
        $(".login,.try").show();
        userLogin = false;
        cb && cb(false);
      }
    },
    error: function () {},
    complete: function (result) {},
  });
}

function initSearch() {
  $("#btn-search").off("click");
  $("#btn-search").on("click", function (e) {
    let value = $("#input-search").val();
    value = value.replace(/\.|ZL|zl|CN|cn| /g, "");
    if (userLogin) {
      //登录验证通过
      // window.open(`http://127.0.0.1:5500/index.html?${value}`, "_self");
      window.open(`https://www.infodossier.compatent/index.html?${value}`, "_self");
    } else {
      alert("您未登录");
    }
  });
}
function initAnchor(params) {
  var b = window.opera ? (document.compatMode === "CSS1Compat" ? $("html") : $("body")) : $("html,body");
  // 頂部菜單按鈕事件
  $(".right li").off("click");
  $(".right li").on("click", function (e) {
    $(this).addClass("checked").siblings().removeClass("checked");
    var $element = $(e.currentTarget).find(".Aanchor");
    var target = $element.attr("target");
    b.animate({ scrollTop: $(target).offset().top - 70 }, 1000);
  });
  // 了解更多 试用
  $(".anchor").off("click");
  $(".anchor").on("click", function (e) {
    var $element = $(e.currentTarget);
    var target = $element.attr("target");
    b.animate({ scrollTop: $(target).offset().top - 70 }, 1000);
  });

  //页面滚动事件
  $(window).scroll(function () {
    // clearTimeout(timer);
    // var timer = setTimeout(() => {

    // }, 1000);
    const headScroll = $(".container-head").offset().top;
    if (headScroll) {
      $(".container-head").addClass("white");
    } else {
      $(".container-head").removeClass("white");
    }

    if (isVisible("#homepage")) {
      $("li.homepage").addClass("checked").siblings().removeClass("checked");
    }
    if (isVisible("#product")) {
      $("li.product").addClass("checked").siblings().removeClass("checked");
    }
    if (isVisible("#contactus")) {
      $("li.contactus").addClass("checked").siblings().removeClass("checked");
    }
  });
}

//使用声明提示框 关闭事件
function initpPolicyClick() {
  $(".fixed-policy .closeIcon").click(function () {
    $(".fixed-policy").remove();
    $(".wrapper-footer").css("padding-bottom", "0");
  });
  $(".fixed-public .closeIcon").click(function () {
    $(".fixed-public").remove();
  });
}

function isVisible(element) {
  //元素相对于文档顶部的偏移距离
  var elementOffsetTop = $(`${element}`).offset().top;
  //该元素的高度
  var elementOuterHeight = $(`${element}`).outerHeight();
  //页面滚动的距离
  var winScrollHeight = $(window).scrollTop();
  // 浏览器可见区域的高度:
  var winHeight = $(window).height();
  // if (element === "#contactus") {
  //   console.log(
  //     `elementOffsetTop:${elementOffsetTop} elementOuterHeight:${elementOuterHeight} winScrollHeight:${winScrollHeight} winHeight:${winHeight}`
  //   );
  // }

  return winScrollHeight + winHeight > elementOffsetTop && elementOffsetTop + elementOuterHeight + 70 > winScrollHeight;
  // return winScrollHeight + 70 >= elementOffsetTop;
}

/**
 * 初始化国家选择
 */
function initSelectCountry() {
  $(".search-box-1").on("click", function (event) {
    var $ele = $(event.currentTarget).find(".country");
    if ($ele.hasClass("off")) {
      openSelect();
    } else {
      hideSelect();
    }
  });
  $(".search-box-1").on("mouseenter", function (event) {
    var $ele = $(event.currentTarget).find(".country");
    if ($ele.hasClass("off")) {
      openSelect();
    } else {
      hideSelect();
    }
  });

  $(".search-select-options, .search-box-1").on("mouseenter mouseleave", function (event) {
    if (event.type == "mouseenter") {
      //鼠标悬浮
      console.log("----鼠标悬浮");
      // openSelect();
    } else if (event.type == "mouseleave") {
      //鼠标离开
      console.log("----鼠标离开");
      hideSelect();
    }
  });

  $(".select-item").on("click", function (e) {
    e.stopPropagation();
    var _this = $(e.currentTarget);
    var imgSrc = $(_this).data("img");
    var country = $(_this).data("country");
    $(".search-box-1 >img").attr("src", imgSrc);
    $(".search-box-1 .country").html(country);
    hideSelect();
  });
}

function openSelect() {
  console.log("----openSelect");

  $(".search-box-1 .country").removeClass("off");
  $(".search-box-1 .country").addClass("on");
  $(".search-select-options").css("max-height", "350px");
  $(".search-box-1 .country:after").css("content", "image/xiala-on.png");
}
function hideSelect() {
  console.log("----hideSelect");
  $(".search-box-1 .country").removeClass("on");
  $(".search-box-1 .country").addClass("off");
  $(".search-select-options").css("max-height", 0);
  $(".search-box-1 .country:after").css("content", "image/xiala-off.png");
}

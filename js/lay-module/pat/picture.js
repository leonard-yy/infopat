layui.define("jquery", function (exports) {
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  var $ = layui.$;
  var currentPage = 0;
  var obj = {
    imgs: [],
    //是否全屏状态 默认false
    full: false,
    /**
     * 获取首页
     */
    getHomePage: function () {
      currentPage = 0;
      let imgs = this.imgs;
      $("#container-img").attr("src", imgs[currentPage]);
      if (currentPage + 1 < imgs.length) {
        $("#container-img2").attr("src", imgs[currentPage + 1]);
      }
    },

    /**
     * 获取尾页
     */
    getLastPage: function () {
      let imgs = this.imgs;
      currentPage = imgs.length - 1;
      if (currentPage % 2) {
        currentPage = currentPage - 1;
        $("#container-img").attr("src", imgs[currentPage]);
        $("#container-img2").attr("src", imgs[currentPage + 1]);
      } else {
        $("#container-img").attr("src", imgs[currentPage]);
        $("#container-img2").attr("src", "_");
      }
    },

    /**
     * 上一页
     */
    getBeforePage: function () {
      let imgs = this.imgs;
      if (currentPage > 0) {
        currentPage = currentPage - 2;
      }
      $("#container-img").attr("src", imgs[currentPage]);
      $("#container-img2").attr("src", imgs[currentPage + 1]);
    },

    /**
     * 下一页
     */
    getNextPage: function () {
      let imgs = this.imgs;
      if (currentPage < imgs.length - 1) {
        currentPage = currentPage + 2;
      }
      $("#container-img").attr("src", imgs[currentPage]);
      if (currentPage + 1 < imgs.length) {
        $("#container-img2").attr("src", imgs[currentPage + 1]);
      } else {
        $("#container-img2").attr("src", "_");
      }
    },
    doFull: function (selector, datas, options) {
      this.full = true;

      $(selector).addClass("full");
      this.reload(selector, datas, options);
    },
    /**
     * 关闭页面
     */
    doClose: function (selector, datas, options) {
      if ($(selector).hasClass("inpage")) {
        this.full = false;
        $(selector).removeClass("full");
        this.reload(selector, datas, options);
      } else {
        $(selector).hide();
      }
    },
    reload: function (selector, datas, options) {
      let me = this;
      options = options && options.constructor === Object ? options : {};
      let imgs = this.imgs;
      // 判断是否需要遮挡
      if (options && options.mask == false) {
        $(selector).css("background-color", "unset");
      } else {
        $(selector).css("background-color", "rgba(0, 0, 0, 0.4)");
      }
      // 是否显示关闭按钮
      let closeIconHtml =
        options.closeIcon || this.full
          ? '<div class="close-icon"><i class="fa fa-close" aria-hidden="true"></i></div>'
          : "";
      // 是否全屏状态 默认false
      let fullIconHtml = this.full
        ? " "
        : '<div class="picture-btn btn-full" title="全屏"> <img src="./images/page-btns/page-full.png" alt="_"/></div>';
      let nextPage = "_";
      if (currentPage + 1 < imgs.length) {
        nextPage = imgs[currentPage + 1];
      }
      $(selector).html(
        `<div class="container-picture">
          <div class="container-picture-scroll">
            <img id="container-img" src="${imgs[currentPage]}"/>
            <img id="container-img2" src="${nextPage}"/>
          </div>
          <div class="picture-btns">
            <div class="picture-btn btn-home" title='首页'> <img src="./images/page-btns/first-page.png" alt="_"/> </div>
            <div class="picture-btn btn-before" title='上一页'> <img src="./images/page-btns/pre-page.png" alt="_"/></div>
            <div class="picture-btn btn-next" title='下一页'> <img src="./images/page-btns/next-page.png" alt="_"/></div>
            <div class="picture-btn btn-last" title='末页'> <img src="./images/page-btns/last-page.png" alt="_"/></div>
           ${fullIconHtml}
          </div>
          "${closeIconHtml}"
        </div>`
      );
      if (this.full) {
        $(selector).addClass("full");
      }
      $(".picture-btn").hover(
        function (e) {
          $element = $(e.currentTarget);
          $element.append(
            `<div class="page-tooltip">${$element.attr("title")}</div>`
          );
        },
        function () {
          $element.find(".page-tooltip").remove();
        }
      );
      $(".btn-home").on("click", function () {
        me.getHomePage();
      });
      $(".btn-before").on("click", function () {
        me.getBeforePage();
      });
      $(".btn-next").on("click", function () {
        me.getNextPage();
      });
      $(".btn-last").on("click", function () {
        me.getLastPage();
      });
      $(".close-icon").on("click", function () {
        me.doClose(selector, datas, options);
      });
      $(".btn-print").on("click", function () {
        window.print();
      });
      $(".btn-full").on("click", function () {
        me.doFull(selector, datas, options);
      });
    },

    /**
     * 获取模板内容
     * @param {图片信息}} imgs
     */
    init: function (selector, datas, options) {
      var me = this;
      this.imgs = datas;
      if (options) {
        this.full = options.full;
      }
      this.reload(selector, options);
    },
  };
  exports("picture", obj);
});

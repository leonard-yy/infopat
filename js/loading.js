(function ($) {
  var methods = {
    start: function (options) {
      let _this = this;
      return this.each(function () {
        // 页面加载时禁止其他点击事件
        // $('body').addClass('nopointer')
        var $this = $(this);
        var className = this.className;
        var loading = document.getElementById("loading").cloneNode(true);
        loading.id = loading.id + "-" + this.className;
        this.appendChild(loading);
        $this.css("position", "relative");
        $(loading).show();
        Splitting();
      });
    },
    stop: function (options) {
      return $(this).each(function () {
        // $('body').removeClass('nopointer')
        var $this = $(this);
        var loading = document.getElementById("loading").cloneNode(true);
        var loadingId = loading.id + "-" + this.className;
        $this.find("#" + loadingId).remove();
        $this.css("position", "");
      });
    },
  };
  $.fn.loding = function () {
    var method = arguments[0];
    if (methods[method]) {
      method = methods[method];
      arguments = Array.prototype.slice.call(arguments, 1);
    } else if (typeof method == "object" || !method) {
      method = methods.init;
    } else {
      $.error("Method " + method + " does not exist on jQuery.pluginName");
      return this;
    }

    return method.apply(this, arguments);
  };
})(jQuery);

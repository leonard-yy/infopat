(function initPage() {
  layui.use(["request", "patNodataPage", "loader"], function () {
    var $ = layui.jquery,
      request = layui.request;

    request.get(
      `/api/user/session?t=${new Date().getTime()}`,
      function (result) {
        if (result && result.error == 0) {
          $(".username").html(result.data.username);
          if (result.data.is_trial_period) {
            $(".period-tips").html(window.userInfo.trial_period_tips);
          }
        } else {
          $(".period-tips").hide();
        }
      },
      function (err) {
        $(".period-tips").hide();
      }
    );
  });
})();

function initPage() {
  layui.use(
    ["laytpl", "form", "advancepat", "fieldspat", "commonmap"],
    function () {
      var $ = layui.jquery,
        laytpl = layui.laytpl,
        advancepat = layui.advancepat;
      fieldspat = layui.fieldspat;
      form = layui.form;
      commonmap = layui.commonmap;
      //动态加载CSS
      layui.link("./page/AdvanceSearch/index.css");

      // 渲染模板以及数据到dom元素里去
      var advview = document.getElementById("adv-body-advance");
      var fieldview = document.getElementById("adv-body-fields");
      $.getJSON("api/advance.json", function (res, status) {
        laytpl(advancepat).render(res.data, function (html) {
          // 高级检索
          advview.innerHTML = html;
          form.render();
        });
        laytpl(fieldspat).render(res.data, function (html) {
          fieldview.innerHTML = html;
        });
      });

      // 去列表页面
      function gotoListPage() {
        window.open("/list.html", "_self");
      }

      $("#instruceSearch").on("click", function () {
        var value = $("#instruceTexteat").val();
        if (value && value !== "") {
          commonmap.set("INSTRUCE_TXETAREA_VALUE", value);
          gotoListPage();
        }
      });
    }
  );
}

initPage();

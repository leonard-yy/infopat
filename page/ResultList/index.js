layui.use(["layuipotal", "loader"], function () {
  var $ = layui.jquery,
    loader = layui.loader,
    layuipotal = layui.layuipotal;
  var _this = {};

  // 输入框自动调整
  _this.resizeTextarea = function () {
    var textarea = document.getElementById("expandTextarea");
    var pre = document.getElementById("preTextarea");
    pre.innerHTML = textarea.value;
    var realHeight = pre.offsetHeight; //offsetHeight = height + padding + border
    if (realHeight > 82) textarea.style.height = realHeight + 24 - 22 + "px";
    //加24为一行的高度，减22为padding和border
    else textarea.style.height = realHeight - 22 + "px";
    console.log(textarea.style.height);
  };

  // 自定义输入框
  document.onkeydown = _this.resizeTextarea;

  var listValue = layui.sessionData("session").listValue;
  var value = "";
  if (listValue === "A") {
    value = layui.sessionData("session").advanceSearchValue;
  } else {
    value = layui.sessionData("session").intellectSearchValue;
  }
  $("#expandTextarea").val(value);
  _this.resizeTextarea();

  // 得到检索条件 查询
  // loader.show($("#loading"));
  // $.ajax({
  //   url: '',
  //   type: "get",
  //   success: function (data) {
  //   },
  //   error: function (xhr, textstatus, thrown) {
  //   },
  // });
  //   $.getJSON("api/searchresult.json", function (res, status) {
  //     _this._renderSelectOption(res);
  //   });
  // 关闭loading层
  // loader.hide($("#loading"));
});

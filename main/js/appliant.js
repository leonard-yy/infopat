$(function () {
  //搜索标签切换
  $("#submit").click(function (e) {
    $.ajax({
      type: "POST",
      url: "/api/contact",
      data: {
        captcha: "",
        name: $("#name").val(),
        mobile: $("#mobile").val(),
        company: $("#company").val(),
        department: $("#department").val(),
        remark: $("#remark").val(),
      },
      success: function (result) {},
      error: function () {},
      complete: function (result) {},
    });
  });
});

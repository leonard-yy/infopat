$(function () {
  //搜索标签切换
  $("#submit").click(function (e) {
    var captcha = $("#captcha").val();
    var name = $("#name").val();
    var mobile = $("#mobile").val();
    var company = $("#company").val();
    var department = $("#department").val();
    var remark = $("#remark").val();

    if (!captcha || captcha === undefined || captcha === "") {
      alert("请输入验证码");
      return;
    }
    if (!name || name === undefined || name === "") {
      alert("请输入姓名");
      return;
    }
    if (!mobile || mobile === undefined || mobile === "") {
      alert("请输入手机号");
      return;
    }
    if (!company || company === undefined || company === "") {
      alert("请输入公司名称");
      return;
    }
    if (!department || department === undefined || department === "") {
      alert("请输入职务");
      return;
    }

    $.ajax({
      type: "POST",
      url: "/api/contact",
      data: {
        captcha: captcha,
        name: name,
        mobile: mobile,
        company: company,
        department: department,
        remark: remark,
      },
      success: function (result) {},
      error: function () {},
      complete: function (result) {},
    });
  });

  $("#sendCaptcha").click(function (e) {
    $("#validateImg").attr("src", "/captcha/contact?t=" + new Date().getTime());
  });

  $("#validateImg").click(function (e) {
    $("#validateImg").attr("src", "/captcha/contact?t=" + new Date().getTime());
  });
});

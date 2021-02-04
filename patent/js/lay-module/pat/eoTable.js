/*
 * @Author: PengCheng
 * @Date: 2020-06-03 19:43:19
 * @Description:
 */

layui.define("patNodataPage", function (exports) {
  let patNodata = layui.patNodataPage;
  let noDataTpl = patNodata.html;
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

  let scyjTpl = `
  <div class="table-title-common table-title">专利审查意见通知书</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
    <td>日期</td>
    <td>名称</td>
    <td>操作</td>
  </tr>
  {{#  layui.each(d, function(index, item){ }}
    <tr>
      <td>{{ item[0] || '--'}}</td>
      <td>{{ item[1] || '--'}}</td>
      <td data-url={{item[2]}} class="td-action action-show"><img src="../../../images/chakan.png">查看</td>
    </tr>
    {{#  }); }}
    {{# }}}
    </table>
  `;

  exports("eoTable", {
    getTpl: function (type) {
      switch (type) {
        case "scyjTpl":
          return scyjTpl;
        default:
          return "";
      }
    },
  });
});

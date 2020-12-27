/*
 * @Author: PengCheng
 * @Date: 2020-06-03 19:43:19
 * @Description:
 */

layui.define("patNodataPage", function (exports) {
  let patNodata = layui.patNodataPage;
  let noDataTpl = patNodata.html;
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

  let flztTpl = `
  <div class="table-title-common table-title">法律状态信息</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
    <td width="10%">专利信息</td>
    <td width="10%">法律状态公告日</td>
    <td width="10%">法律状态</td>
    <td width="40%">详细信息</td>
  </tr>
  {{#  layui.each(d, function(index, item){ }}
    <tr>
      <td>{{ item['申请（专利）号']  || '--' }} <br/> {{ item['授权公告号']  || '--' }}</td>
      <td>{{ item['事务数据公告日']  || '--' }}</td>
      <td>{{ item['事务数据类型']  || '--' }}</td>
      <td>{{ item['事务数据信息']  || '--' }}</td>
    </tr>
    {{#  }); }}
    {{# }}}
    </table>
  `;

  exports("lsTable", {
    getTpl: function (type) {
      switch (type) {
        case "flztTpl":
          return flztTpl;
        default:
          return "";
      }
    },
  });
});

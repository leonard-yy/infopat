/*
 * @Author: PengCheng
 * @Date: 2020-06-03 19:43:19
 * @Description:
 */

layui.define("patNodataPage", function (exports) {
  let patNodata = layui.patNodataPage;
  let noDataTpl = patNodata.html;
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

  let qwTpl = `
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
  <!-- <tr>
    <td>专利信息</td>
    <td>操作</td>
  </tr> -->
  {{#  layui.each(d, function(index, item){ }}
    <tr style="background: #FFFFFF;border-bottom: 1px solid #999999;">
      <td style="color:#000;">{{ item['name']  || '--' }}</td>
      <td class="td-action">
        <span class="action action-show" data-url='{{item['imgUrl'] || '--' }}'> <img src="./images/dakai.png"><span>打开</span></span>
        <span class="action action-download"  data-url='{{item['pdfUrl'] || '--' }}'><img src="./images/xiazai.png"><span>下载</span></span>
      </td>
    </tr>
    {{#  }); }}
    {{# }}}
  `;

  exports("piTable", {
    getTpl: function (type) {
      switch (type) {
        case "qwTpl":
          return qwTpl;

        default:
          return "";
      }
    },
  });
});

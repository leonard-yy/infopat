layui.define("patNodata", function(exports) {
  let patNodata = layui.patNodata;
  let noDataTpl = patNodata.html;
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

  let tzsfwTpl = `
  <div class="table-title-common table-title">专利通知书发文信息</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
      <tr>
      <td width="20%">通知书名称</td>
      <td width="10%">发文日</td>
      <td width="10%">收件人姓名</td>
      <td width="10%">收件人邮编</td>
      <td width="10%">下载时间</td>
      <td width="10%">下载IP地址</td>
      <td width="10%">发文方式</td>
    </tr>
  {{#  layui.each(d, function(index, item){ }}
    <tr>
      <td>{{ item[0]  || '--' }}</td>
      <td>{{ item[1]  || '--' }}</td>
      <td>{{ item[2]  || '--' }}</td>
      <td>{{ item[3]  || '--' }}</td>
      <td>{{ item[4]  || '--' }}</td>
      <td>{{ item[5]  || '--' }}</td>
      <td>{{ item[6]  || '--' }}</td>
    </tr>
    {{#  }); }}
    {{# }}}
    </table>
  `;

  let zsTpl = `
  <div class="table-title-common table-title">专利证书发文信息</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
    <td>发文日</td>
    <td>收件人姓名</td>
    <td>收件人邮箱</td>
  </tr>
    {{#  layui.each(d, function(index, item){ }}
        <tr>
          <td>{{ item[0]  || '--' }}</td>
          <td>{{ item[1]  || '--' }}</td>
          <td>{{ item[2]  || '--' }}</td>
        </tr>
    {{#  }); }}
   {{# }}}
 </table> 
  `;
  let txTpl = `
  <div class="table-title-common table-title">专利退信信息</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
    <td>退信种类名称</td>
    <td>原收件人姓名</td>
    <td>原通知书发文日</td>
    <td>退信原因</td>
    <td>重发收件人姓名</td>
    <td>重发通知书发文日</td>
    <td>公示送达卷期号</td>
    <td>公示送达日期</td>
  </tr>
    {{#  layui.each(d, function(index, item){ }}
        <tr>
          <td>{{ item[0]  || '--' }}</td>
          <td>{{ item[1]  || '--' }}</td>
          <td>{{ item[2]  || '--' }}</td>
          <td>{{ item[3]  || '--' }}</td>
          <td>{{ item[4]  || '--' }}</td>
          <td>{{ item[5]  || '--' }}</td>
          <td>{{ item[6]  || '--' }}</td>
          <td>{{ item[7]  || '--' }}</td>
        </tr>
    {{#  }); }}
   {{# }}}
 </table> 
  `;
  exports("nfctTable", {
    getTpl: function(type) {
      switch (type) {
        case "tzsfwTpl":
          return tzsfwTpl;
        case "zsTpl":
          return zsTpl;
        case "txTpl":
          return txTpl;
        default:
          return "";
      }
    }
  });
});

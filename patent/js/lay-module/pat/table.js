layui.define("patNodata", function (exports) {
  let patNodata = layui.patNodata;
  let noDataTpl = patNodata.html;
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

  let yjTpl = `
  <div class="table-title-common table-title">专利应缴费信息</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
    <td>费用种类</td>
    <td>应缴金额</td>
    <td>缴费截止日</td>
    <td>费用状态</td>
    <td>操作</td>
  </tr>
  {{#  layui.each(d, function(index, item){ }}
    <tr>
      <td>{{ item[0]  || '--' }}</td>
      <td>{{ item[1]  || '--' }}</td>
      <td>{{ item[2]  || '--' }}</td>
      <td>{{ item[3]  || '--' }}</td>
      {{#  if(item[3]==='未缴费'){ }}
      <td class="td-action"><img src="../../../images/jiaofei.png">去缴费</td>
    {{#  }else{ }} 
    <td></td>
    {{# }}}
    </tr>
    {{#  }); }}
    {{# }}}
    </table>
  `;

  let znTpl = `
 
  {{#  if(d.length >= 0){ }}

  {{#   }else{ }} 
    <div class="table-title-common table-title">专利滞纳金信息</div>
    <table class="table-common">
      <tr>
      <td>缴费时间</td>
      <td>当前年费金额</td>
      <td>应缴滞纳金额</td>
      <td>总计</td>
    </tr>
    {{#  layui.each(d, function(index, item){ }}
      <tr>
        <td>{{ item[0]  || '--' }}</td>
        <td>{{ item[1]  || '--' }}</td>
        <td>{{ item[2]  || '--' }}</td>
        <td>{{ item[3]  || '--' }}</td>
      </tr>
      {{#  }); }}
    </table>
  {{# }}}`;

  let yjfTpl = `
  <div class="table-title-common table-title">专利已缴费信息</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
    <td>缴费种类</td>
    <td>缴费金额</td>
    <td>缴费日期</td>
    <td>缴费人姓名</td>
    <td>票据代码</td>
    <td>票据号码</td>
  </tr>
    {{#  layui.each(d, function(index, item){ }}
        <tr>
          <td>{{ item[0]  || '--' }}</td>
          <td>{{ item[1]  || '--' }}</td>
          <td>{{ item[2]  || '--' }}</td>
          <td>{{ item[3]  || '--' }}</td>
          <td>{{ item[4]  || '--' }}</td>
          <td>{{ item[5]  || '--' }}</td>
        </tr>
    {{#  }); }}
   {{# }}}
 </table> 
  `;

  let tfTpl = `
 
  {{#  if(d.length >= 0){ }}

  {{#   }else{ }} 
    <div class="table-title-common table-title">专利退费信息</div>
    <table class="table-common">
      <tr>
      <td>退费种类</td>
      <td>退费金额</td>
      <td>退费日期</td>
      <td>收款人姓名</td>
      <td>票据代码</td>
      <td>票据号码</td>
    </tr>
    {{#  layui.each(d, function(index, item){ }}
      <tr>
        <td>{{ item[0]  || '--' }}</td>
        <td>{{ item[1]  || '--' }}</td>
        <td>{{ item[2]  || '--' }}</td>
        <td>{{ item[3]  || '--' }}</td>
        <td>{{ item[4]  || '--' }}</td>
        <td>{{ item[5]  || '--' }}</td>
      </tr>
      {{#  }); }}
    </table>
  {{# }}}`;

  exports("commonTable", {
    getTpl: function (type) {
      switch (type) {
        case "yjTpl":
          return yjTpl;
        case "znTpl":
          return znTpl;
        case "yjfTpl":
          return yjfTpl;
        case "tfTpl":
          return tfTpl;
        default:
          return "";
      }
    },
  });
});

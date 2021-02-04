layui.define("patNodata", function(exports) {
  let patNodata = layui.patNodata;
  let noDataTpl = patNodata.html;
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);

  let dycTpl = `
  <div class="table-title-common table-title">第一次检索</div>
  <table class="examiation-search-table">
        <tr>
        <td>检索类型：</td>
        <td>{{d.jslx || '--'}}</td>
        <td>检索审查员确定的IPC分类号：</td>
        <td class="tip-hotspot" data-tip='{{d.flh|| '--'}}'>{{d.flh || '--' }}
        </td>
        <td>检索记录信息：</td>
        <td>{{d.jsjl || '--' }}</td>
      </tr>
      <tr>
        <td>申请日：</td>
        <td>{{d.sqri || '--' }}</td>
        <td>申请号：</td>
        <td>{{d.sqhao || '--' }}</td>
        <td>申请人：</td>
        <td class="tip-hotspot" data-tip='{{d.sqren || '--' }}'>{{d.sqren || '--' }}</td>
      </tr>
      <tr>
        <td>最早优先权日：</td>
        <td>{{d.yxr || '--' }}</td>
        <td>权利要求项数：</td>
        <td>{{d.yqs || '--' }}</td>
        <td>说明书段数：</td>
        <td>{{d.smsds || '--' }}</td>
      </tr>
    </table>
  `;
  let dercTpl = `
  <div class="table-title-common table-title">第二次检索</div>
  <table class="examiation-search-table">
        <tr>
        <td>检索类型：</td>
        <td>{{d.jslx || '--' }}</td>
        <td>检索审查员确定的IPC分类号：</td>
        <td class="tip-hotspot" data-tip='{{d.flh || '--' }}'>{{d.flh || '--' }}
        </td>
        <td>检索记录信息：</td>
        <td>{{d.jsjl || '--' }}</td>
      </tr>
      <tr>
        <td>申请日：</td>
        <td>{{d.sqri || '--' }}</td>
        <td>申请号：</td>
        <td>{{d.sqhao || '--' }}</td>
        <td>申请人：</td>
        <td class="tip-hotspot" data-tip='{{d.sqren || '--' }}'>{{d.sqren || '--' }}</td>
      </tr>
      <tr>
        <td>最早优先权日：</td>
        <td>{{d.yxr || '--' }}</td>
        <td>权利要求项数：</td>
        <td>{{d.yqs || '--' }}</td>
        <td>说明书段数：</td>
        <td>{{d.smsds || '--' }}</td>
      </tr>
    </table>
  `;

  let zldbTpl = `
  <div class="table-title-common table-subtitle">专利对比文献</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
      <td>类型</td>
      <td>国别</td>
      <td>文献号</td>
      <td>文献类别</td>
      <td>公开日期</td>
      <td>IPC分类号</td>
      <td>涉及权利要求项</td>
      <td>相关页数</td>
   </tr>
  {{#  layui.each(d.zldbList, function(index, item){ }}
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
  let qkdbTpl = `
  <div class="table-title-common table-subtitle">期刊对比文献</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
      <td>类型</td>
      <td>期刊文摘名称</td>
      <td>卷号</td>
      <td>期号</td>
      <td>发行日期</td>
      <td>作者</td>
      <td>标题</td>
      <td>涉及权利要求项</td>
      <td>相关页数</td>
   </tr>
  {{#  layui.each(d.qkdbList, function(index, item){ }}
    <tr>
      <td>{{ item[0]  || '--' }}</td>
      <td class="tip-hotspot" data-tip='{{item[1] || '--' }}'>{{item[1] || '--' }}</td>
      <td>{{ item[2]  || '--' }}</td>
      <td>{{ item[3]  || '--' }}</td>
      <td>{{ item[4]  || '--' }}</td>
      <td>{{ item[5]  || '--' }}</td>
      <td class="tip-hotspot" data-tip='{{item[6] || '--' }}'>{{item[6] || '--' }}</td>
      <td>{{ item[7]  || '--' }}</td>  
      <td>{{ item[8]  || '--' }}</td>
      </tr>
    {{#  }); }}
    {{# }}}
    </table>
  `;
  let sjdbTpl = `
  <div class="table-title-common table-subtitle">书籍对比文献</div>
  <table class="table-common">
  
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#   }else{ }} 
    <tr>
      <td>类型</td>
      <td>书名</td>
      <td>卷号</td>
      <td>版本号</td>
      <td>出版日期</td>
      <td>作者</td>
      <td>标题</td>
      <td>涉及权利要求项</td>
      <td>参考页数</td>
   </tr>
  {{#  layui.each(d.sjdbList, function(index, item){ }}
    <tr>
      <td>{{ item[0]  || '--' }}</td>
      <td class="tip-hotspot" data-tip='{{item[1] || '--' }}'>{{item[1] || '--' }}</td>
      <td>{{ item[2]  || '--' }}</td>
      <td>{{ item[3]  || '--' }}</td>
      <td>{{ item[4]  || '--' }}</td>
      <td>{{ item[5]  || '--' }}</td>
      <td class="tip-hotspot" data-tip='{{item[6] || '--' }}'>{{item[6] || '--' }}</td>
      <td class="tip-hotspot" data-tip='{{item[7] || '--' }}'>{{item[7] || '--' }}</td>
      <td class="tip-hotspot" data-tip='{{item[8] || '--' }}'>{{item[8] || '--' }}</td>
      </tr>
    {{#  }); }}
    {{# }}}
    </table>
  `;

  exports("esTable", {
    getTpl: function(type) {
      switch (type) {
        case "dycTpl":
          return dycTpl + zldbTpl + qkdbTpl + sjdbTpl;
        case "dercTpl":
          return dercTpl + zldbTpl + qkdbTpl + sjdbTpl;
        default:
          return "";
      }
    }
  });
});

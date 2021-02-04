/*
 * @Description:
 */

layui.define("patNodataPage", function (exports) {
  var patNodata = layui.patNodataPage;
  var noDataTpl = patNodata.html;

  var temp = `
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#  }else{ }} 
    <form class="layui-form" id="searchForm">
    {{#  layui.each(d, function(index, item){ }}
      <div class="layui-form-item flex search-index-item" style="align-items:center" name={{item.name}}>

        {{#  if(index > 0) { }}
          <div class="layui-input-inline" style="flex:2;">
        {{#   } else { }}
          <div class="layui-input-inline" style="flex:2;visibility:hidden">
        {{#   } }}
          <select name={{item.name}} class="layui-form-select" stype="selectRelation">
            <option value="AND" selected>AND</option>
            <option value="OR">OR</option>
            <option value="NOT">NOT</option>
          </select> 
        </div>
       
        <div style="flex:1;text-align:right;padding-right:10px;">{{ item.name ||""}}</div>

        <div class="layui-input-inline" style="flex:6">
          <select name={{item.name}} class="layui-form-select" stype="selectType" style="flex:1">
            <option value="">请选择{{ item.name ||""}}</option>
            {{#  if(item.selector && item.selector.length > 0){ }}
              {{#  layui.each(item.selector, function(idx, s){ }}
                <option value={{s.value}}>{{s.name}}</option>
              {{#  }); }}
            {{# }}}
          </select> 
        </div>

        {{#  if(item.isDate) { }}
          <div class="layui-inline flex" style="flex:6;">
            <div class="layui-input-inline" style="flex:6;width:auto;">
              <input type="text" id="dateStart" name={{item.name}} placeholder="请选择日期" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
            </div>
            <div class="layui-form-mid" style="flex:2;text-align: center;">-</div>

            <div class="layui-input-inline" style="flex:6;width:auto;">
              <input type="text" id="dateEnd" sdate="true" placeholder="请选择日期" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
            </div>
          </div>
        {{#   } else { }}
          <div class="layui-input-inline" style="flex:6;">  
            <input type="text" name={{item.name}} placeholder={{"请输入" + item.name || ""}} autocomplete="off" class="layui-input">
          </div>
        {{#   } }}

        <div class="layui-input-inline flex" style="flex:1; align-items: center; cursor:pointer;">
            <i class="layui-icon layui-icon-addition" id="addSearchItem" name={{item.name}}></i> 
        </div>
      </div>
    {{#  }); }}
    </form>
  {{# }}}
  `;

  exports("advancepat", temp);
});

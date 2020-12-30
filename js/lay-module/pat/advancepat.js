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
    <form class="layui-form">
    {{#  layui.each(d, function(index, item){ }}
      <div class="layui-form-item flex search-index-item" style="align-items:center" name={{item.name}}>
        <div class="layui-input-inline" style="flex:2;">
          <select name={{item.name}} class="layui-form-select">
            <option value="AND" selected>AND</option>
            <option value="OR">OR</option>
            <option value="NOT">NOT</option>
          </select> 
        </div>

        <div style="flex:1;text-align:right;padding-right:10px;">{{ item.name ||""}}</div>

        <div class="layui-input-inline" style="flex:4">
          <select name={{item.name}} class="layui-form-select" style="flex:1">
            <option value="">请选择{{ item.name ||""}}</option>
            {{#  if(item.selector && item.selector.length > 0){ }}
              {{#  layui.each(item.selector, function(idx, s){ }}
                <option value={{s.value}}>{{s.name}}</option>
              {{#  }); }}
            {{# }}}
          </select> 
        </div>

        <div class="layui-input-inline" style="flex:4;">  
          <input type="text" name={{item.name}} placeholder={{"请输入" + item.name || ""}} autocomplete="off" class="layui-input">
        </div>
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

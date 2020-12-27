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
      <div class="layui-form-item flex">
        <div class="layui-input-inline" style="flex:1;">
          <select name="relation" lay-verify="" class="layui-form-select">
            <option value="AND" selected>AND</option>
            <option value="OR">OR</option>
            <option value="NOT">NOT</option>
          </select> 
        </div>

        <div class="layui-input-inline" style="flex:5;">
          <select name="city" lay-verify="" class="layui-form-select">
            <option value="">请选择{{ item.name ||""}}</option>
            {{#  if(item.selector && item.selector.length > 0){ }}
              {{#  layui.each(item.selector, function(idx, s){ }}
                <option value={{s.value}}>{{s.name}}</option>
              {{#  }); }}
            {{# }}}
          </select> 
        </div>

        <div class="layui-input-inline" style="flex:5;">  
          <input type="text" name="title" required lay-verify="required" placeholder={{"请输入" + item.name || ""}} autocomplete="off" class="layui-input">
        </div>
        <div class="layui-input-inline flex" style="flex:1; align-items: center; cursor:pointer;"><i class="layui-icon layui-icon-addition"></i> </div>
      </div>
    {{#  }); }}
    </form>
  {{# }}}
  `;

  exports("advancepat", temp);
});

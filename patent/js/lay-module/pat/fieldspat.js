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
      <form class="layui-form fields-container">
      {{#  layui.each(d, function(index, item){ }}
        <div class="layui-form-item layui-form-text fields-content">
            <label class="layui-form-label fields-label">{{item.name}}：</label>
            {{#  if(index % 2 == 0){ }}
                <div class="layui-input-block fields-box">
                  {{#  if(item.selector && item.selector.length > 0){ }}
                      {{#  layui.each(item.selector, function(idx, s){ }}
                          <div class="fields-item" data-value={{s.value}}>{{s.value}}:{{s.name}}</div>
                      {{#  }); }}
                  {{# }}}
                </div>
            {{#  } else { }}
                <div class="layui-input-block fields-box bwhite">
                  {{#  if(item.selector && item.selector.length > 0){ }}
                      {{#  layui.each(item.selector, function(idx, s){ }}
                          <div class="fields-item" data-value={{s.value}}>{{s.value}}:{{s.name}}</div>
                      {{#  }); }}
                  {{# }}}
                </div>
            {{#  } }}
        </div>
      {{#  }); }}
      </form>
    {{# }}}
    `;

  exports("fieldspat", temp);
});

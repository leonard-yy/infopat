/*
 * @Description:
 */

layui.define("treeselectpat", function (exports) {
  var patNodata = layui.patNodataPage;
  var noDataTpl = patNodata.html;

  var temp = `
  {{#  if(d.length === 0){ }}
    ${noDataTpl}
  {{#  }else{ }} 
    {{#  layui.each(d, function(index, item){ }}
      <div class="squared-checkbox">
        {{#  if(item.isLeaf){ }}
          <input type="checkbox" class="tree-search-parent" id={{"COUNTRY-PARENT-" + item.value}}/>
          <label for={{"COUNTRY-PARENT-" + item.value}}/>
        {{#  }else{ }} 
          <input type="checkbox" class={{ "tree-child-" + item.value}} id={{"COUNTRY-CHILD-" + item.value}}/>
          <label for={{"COUNTRY-PARENT-" + item.value}}/>
        {{# }}}
      </div>
    {{#  }); }}
  {{# }}}
  `;

  exports("treeselectpat", temp);
});

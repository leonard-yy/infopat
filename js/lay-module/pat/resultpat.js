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
        {{#  layui.each(d, function(index, item){ }}
          <div class="result-content-item">

            <div class="result-content-fileds">
                <div class="content-fileds-item sp-bt">
                    <div>
                        <span class="title fileds-item-title" data-value={{item.id}}>{{item.title}}</span>
                        {{#  if(item.type === "发明授权"){ }}
                        <div class="fmsq-img ml20 inline"></div>
                        {{#  } }} 
                        {{#  if(item.type === "有权"){ }}
                        <div class="yq-img ml20"></div>
                        {{#  } }} 
                        {{#  if(item.type === "发明公开"){ }}
                            <div class="fmsq-img ml20 inline"></div>
                        {{#  } }} 
                        {{#  if(item.type === "外观设计"){ }}
                            <div class="wgsj-img ml20 inline"></div>
                        {{#  } }} 
                        {{#  if(item.type === "实用新型"){ }}
                            <div class="syxx-img ml20 inlineBlock"></div>
                        {{#  } }} 
                    </div>
                    <div style="flex; width: 100px;">
                        <i class="layui-icon layui-icon-star fork-star" style="color:#F7B500;cursor:pointer"></i>
                        <span>收藏</span>
                    </div>
                   
                </div>
                <div class="content-fileds-item">
                    <div style="width:400px">
                        <span class="tips-title">公开日：</span>
                        <span class="tips-value ml10">{{item.documentDate}}</span>
                    </div>
                    <div style="width:400px">
                        <span class="tips-title ">申请日：</span>
                        <span class="tips-value ml10">{{item.applicationDate}}</span>
                    </div>
                </div>
                <div class="content-fileds-item">
                    <div style="width:400px">
                        <span class="tips-title">公开（公告）号：</span>
                        <span class="tips-value ml10">{{item.documentNumber}}</span>
                    </div>
                    <div style="width:400px">
                        <span class="tips-title">申请号：</span>
                        <span class="tips-value ml10">{{item.applicationNumber}}</span>
                    </div>
                </div>

                <div class="content-fileds-item">
                    <span class="tips-title">申请人：</span>
                    <span class="tips-value ml10">{{item.applicant}}</span>
                </div>

                <div class="content-fileds-item">
                    <span class="tips-title">发明人：</span>
                    <span class="tips-value ml10">{{item.inventor}}</span>
                </div>

                <div class="content-fileds-item">
                    <span class="tips-title">IPC分类号：</span>
                    <span class="tips-value ml10">{{item.mainIpc}}</span>
                </div>

                <div class="content-fileds-item">
                    <span class="tips-title">CPC分类号：</span>
                    <span class="tips-value ml10">{{item.ipc}}</span>
                </div>

                <div class="content-fileds-item">
                    <div class="tips-title">摘要：</div>
                    <div class="tips-value ml10">{{item.summary}}</div>
                </div>

            </div>
          </div>
        {{#  }); }}
      {{# }}}
      `;

  exports("resultpat", temp);
});

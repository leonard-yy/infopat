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

            <div class="result-content-filed">
                <div class="content-filed-item">
                    <span class="title-block"></span>
                    <span class="title filed-item-title" data-value={{item.id}}>{{item.id + " " + item.title}}</span>
                    {{#  if(item.type === "发明授权"){ }}
                    <div class="fmsq-img ml20"></div>
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
                <div class="content-filed-item">
                    <span class="tips-title">专利名称：</span>
                    <span class="tips-value ml10">{{item.title}}</span>
                </div>
                <div class="content-filed-item">
                    <span class="tips-title">申请号：</span>
                    <span class="tips-value ml10">{{item.applicationNumber}}</span>
                </div>
                <div class="content-filed-item">
                    <span class="tips-title ">申请日：</span>
                    <span class="tips-value ml10">{{item.applicationDate}}</span>
                </div>
                <div class="content-filed-item">
                    <span class="tips-title">公开（公告）号：</span>
                    <span class="tips-value ml10">{{item.documentNumber}}</span>
                </div>
                <div class="content-filed-item">
                    <span class="tips-title">公开日：</span>
                    <span class="tips-value ml10">{{item.documentDate}}</span>
                </div>
               
                <div class="content-filed-item">
                    <span class="tips-title">发明人：</span>
                    <span class="tips-value ml10">{{item.inventor}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">申请人：</span>
                    <span class="tips-value ml10">{{item.applicant}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">申请人地址：</span>
                    <span class="tips-value ml10">{{item.applicantAddress}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">专利权人：</span>
                    <span class="tips-value ml10">{{item.assignee}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">当前专利权人：</span>
                    <span class="tips-value ml10">{{item.currentAssignee}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">代理机构：</span>
                    <span class="tips-value ml10">{{item.agency}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">代理人：</span>
                    <span class="tips-value ml10">{{item.agent}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">主分类号：</span>
                    <span class="tips-value ml10">{{item.mainIpc}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">IPC分类号：</span>
                    <span class="tips-value ml10">{{item.ipc}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">IPC结构图谱：</span>
                    <span class="tips-value ml10">{{item.ipc}}</span>
                </div>

                <div class="content-filed-item">
                    <div class="tips-title">首项权利要求：</div>
                    <div class="tips-value ml10">{{item.summary}}</div>
                </div>

            </div>
          </div>
        {{#  }); }}
      {{# }}}
      `;

  exports("resultpat", temp);
});

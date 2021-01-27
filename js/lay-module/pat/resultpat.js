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
                    <span class="tips-value-fix ml10">{{item.inventor}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">申请人：</span>
                    <span class="tips-value-fix ml10">{{item.applicant}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">申请人地址：</span>
                    <span class="tips-value-fix ml10">{{item.applicantAddress}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">专利权人：</span>
                    <span class="tips-value-fix ml10">{{item.assignee}}</span>
                </div>

                <div class="content-filed-item">
                    <span class="tips-title">当前专利权人：</span>
                    <span class="tips-value-fix ml10">{{item.currentAssignee}}</span>
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
        <div class="result-img-content">
          <img id="resultImgContent" onerror="errorLoadImg();"/>
        </div>
        <div class="result-sumary-content">
          <span style="display: block; font-size: 14px; color: #999999; line-height: 30px; height: 30px">摘要</span>
          <span id="resultSumaryContent"></span>
        </div>
      `;

  exports("resultpat", temp);
});

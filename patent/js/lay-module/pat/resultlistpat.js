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
            <div class="squared-checkbox" style="margin-top: 8px;">
                <input type="checkbox" class="result-checkbox-input" id={{"RESULT-KEY-"+ item.id}} />
                <label class="result-checkbox-label" for={{"RESULT-KEY-"+ item.id}}/>
            </div>

            <div class="result-content-img" data-value={{item.id}}>
                <img src={{"/api/adv/img?v=1&key=" + item.imagePath }} data-value={{item.id}} onerror=src="/patent/images/default-image.png" />
            </div>

            <div class="result-content-fileds">
                <div class="content-fileds-item sp-bt">
                    <div class="content-fileds-item">
                        <span class="title fileds-item-title" data-value={{item.id}}>{{item.title}}</span>
                        {{#  if(item.type === "发明申请" || item.type === "发明公开"){ }}
                            <div class="orange-back ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 
                        {{#  if(item.type === "发明授权"){ }}
                            <div class="red-back ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 
                        {{#  if(item.type === "实用新型"){ }}
                            <div class="green-back ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 
                        {{#  if(item.type === "外观设计"){ }}
                            <div class="blue-back ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 
                        {{#  if(item.type === "再颁专利" || item.type === "植物专利"){ }}
                            <div class="brown-back ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 
                        {{#  if(item.type === "依法登记的发明"){ }}
                            <div class="brown-back2 ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 
                        
                        {{#  if(item.type !== "发明申请" && item.type !== "发明公开" && item.type !== "发明授权" && item.type !== "实用新型" && item.type !== "外观设计" && item.type !== "依法登记的发明") { }}
                            <div class="brown-back ml20 inlineBlock">{{item.type}}</div>
                        {{#  } }} 

                        {{#  if(item.legalStatus && item.legalStatus !== ''){ }}
                            <div class="common-img ml20 inlineBlock">{{item.legalStatus}}</div>
                        {{#  } }} 
                    </div>
                    <div style="flex; width: 100px;">
                        <i class="layui-icon layui-icon-star fork-star" id={{"FORK-KEY-"+ item.id}} style="color:#F7B500;cursor:pointer"></i>
                        <span>收藏</span>
                    </div>
                   
                </div>
                <div class="content-fileds-item">
                    <div class="content-fileds-item" style="width:400px">
                        <span class="tips-title">公开日：</span>
                        <span class="tips-value ml10">{{item.documentDate ||"--"}}</span>
                    </div>
                    <div class="content-fileds-item" style="width:400px">
                        <span class="tips-title ">申请日：</span>
                        <span class="tips-value ml10">{{item.applicationDate ||"--"}}</span>
                    </div>
                </div>
                <div class="content-fileds-item">
                    <div class="content-fileds-item" style="width:400px">
                        <span class="tips-title">公开（公告）号：</span>
                        <span class="tips-value ml10">{{item.documentNumber ||"--"}}</span>
                    </div>
                    <div class="content-fileds-item" style="width:400px">
                        <span class="tips-title">申请号：</span>
                        <span class="tips-value ml10">{{item.applicationNumber ||"--"}}</span>
                    </div>
                </div>
                <div class="content-fileds-item">
                    <div class="content-fileds-item" style="width:400px">
                        <span class="tips-title">申请人：</span>
                        <span class="tips-value ml10" title={{item.applicant.replace("<em>","").replace("</em>","")}} >{{item.applicant ||"--"}}</span>
                    </div>
                    <div class="content-fileds-item" style="width:400px">
                        <span class="tips-title">发明人：</span>
                        <span class="tips-value ml10" title={{item.inventor.replace("<em>","").replace("</em>","")}} >{{item.inventor ||"--"}}</span>
                    </div>
                </div>

                <div class="content-fileds-item" style="padding-left:10px;">
                    <span class="tips-title">IPC分类号：</span>
                    <span class="tips-value ml10">{{item.mainIpc ||"--"}}</span>
                </div>

                <div class="content-fileds-item" style="padding-left:10px;">
                    <span class="tips-title">CPC分类号：</span>
                    <span class="tips-value ml10">{{item.ipc ||"--"}}</span>
                </div>

                <div class="content-fileds-item" style="padding-left:10px;">
                    <div class="tips-title">摘要：</div>
                    <div class="tips-value ml10">{{item.summary || ""}}</div>
                </div>

            </div>
          </div>
        {{#  }); }}
      {{# }}}
      `;

  exports("resultlistpat", temp);
});

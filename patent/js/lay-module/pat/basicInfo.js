/*
 * @Author: PengCheng
 * @Date: 2020-06-03 19:43:19
 * @Description:
 */

layui.define("patNodata", function (exports) {
  //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
  let patNodata = layui.patNodata;
  let noDataTpl = patNodata.html;
  let head = ` <div class="info-head">基本信息</div>`;
  let body = ` <div class="info-line" >
                        <span class="line-label">最近更新时间：</span>
                        <span class="line-value">{{ d.updateDate||"--" }}
                        </span>
                </div >
                <div class="info-line">
                    <span class="line-label">案件状态：</span>
                    <span class="line-value">{{ d.status ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">申请号/专利号：</span>
                    <span class="line-value">{{ d.number ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">主分类号：</span>
                    <span class="line-value">{{ d.flNumber ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">专利名称：</span>
                    <span class="line-value">{{ d.name ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">专利申请日：</span>
                    <span class="line-value">{{ d.applicationDate ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">申请（专利权）人：</span>
                    <span class="line-value">{{ d.applicant ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">发明人：</span>
                    <span class="line-value">{{ d.inventor ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">代理机构：</span>
                    <span class="line-value">{{ d.Agency ||"--"}}</span>
                </div>
                <div class="info-line">
                    <span class="line-label">代理人：</span>
                    <span class="line-value">{{ d.agent ||"--"}}</span>
                </div>`;
  var obj = {
    getTpl: function (hasData) {
      let tpl = head;
      if (!hasData) {
        tpl += noDataTpl;
      } else {
        tpl += body;
      }
      return tpl;
    },
  };

  exports("patBasicInfo", obj);
});

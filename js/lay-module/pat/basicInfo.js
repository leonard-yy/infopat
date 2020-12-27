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
                        <span class="btn btn-refresh" id="btn-refresh"><svg t="1591707388262" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1133" width="14" height="14"><path d="M420.126349 727.268495l34.022009-81.691264s27.246439-74.867641-74.867641-61.268449l-299.518619 74.867642s-68.092072 20.422816-34.022009 74.867641l170.350313 272.320233s54.444825 47.669255 81.691265-13.599193l34.022009-81.691265s558.191605 197.404538 673.904878-360.787066c0 6.823623-136.13609 333.540627-585.438044 176.981721z m183.805345-422.055515l-40.845632 74.867641s-34.022009 74.867641 74.867641 61.268449l299.518618-68.092072s68.092072-20.422816 40.845633-74.867641l-163.382529-279.095802s-47.669255-47.669255-81.691265 6.823623l-34.022009 81.691264S147.85417-103.195288 18.49365 448.172693c-6.77557 6.77557 136.13609-313.117811 585.438044-142.959713z" p-id="1134" fill="#5268d3"></path></svg>
                        更新</span>
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

layui.use(["laytpl", "request", "loader", "form", "laypage", "element", "layer", "resultlistpat"], function () {
  var $ = layui.jquery,
    laytpl = layui.laytpl,
    loader = layui.loader,
    form = layui.form,
    laypage = layui.laypage,
    element = layui.element,
    resultlistpat = layui.resultlistpat,
    request = layui.request,
    layer = layui.layer;
  var random = 0;
  var _this = {
    page: 1,
    pageSize: 10,
    searchText: "",
    orignData: {},
    secondText: null,
    extraFilter: null,
    selectQuery: {},
    filterQuery: {},
    selectData: [],
    selector: new Set(),
    // 区域选项
    selectedCountry: null,
    selectedCountryDp: null,
    selectedCountryDd: null,
    sort: null,
    resultUrl: "",
    // 额外检索初始化
    firinit: true,
    firinitRation: true,
  };
  // 输入框自动调整
  _this.resizeTextarea = function () {
    var textarea = document.getElementById("expandTextarea");
    var pre = document.getElementById("preTextarea");
    if (textarea !== null && pre !== null) {
      pre.innerHTML = textarea.value;
      var realHeight = pre.offsetHeight; //offsetHeight = height + padding + border
      if (realHeight > 60) textarea.style.height = realHeight + 24 - 12 + "px";
      //加24为一行的高度，减22为padding和border
      else textarea.style.height = realHeight - 12 + "px";
    }
  };

  // 自定义输入框
  document.onkeydown = _this.resizeTextarea;

  _this.selectedCountry = request.getParamFromUri("ds");
  _this.selectedCountryDp = request.getParamFromUri("dp");
  _this.selectedCountryDd = request.getParamFromUri("dd");
  _this.extraFilter = request.getParamFromUri("f");

  form.render();

  /**
   * 左侧选择框渲染
   * @param {*} ds
   * @param {*} searchText
   * @param {*} key
   */
  _this.renderFilterContent = function (ds, searchText, selector) {
    selector.forEach(function (key) {
      var name = "";
      var s = _this.selectorData.find(function (d) {
        return d.value == key;
      });
      if (s !== undefined && s !== null) {
        name = s.name;
      }

      request.get(`/api/adv/ration?ds=${ds}&q=${searchText}&c=${key}`, function (res) {
        var data = res.analysis_total || [];
        _this.orignData[key] = data;
        var temp = "";
        if (data.length > 0) {
          temp += '   <dl class="layui-nav-child">';
          layui.each(data, function (index, item) {
            if (item.children && item.children.length > 0) {
              temp += "    <dd>";
              temp += '      <div class="result-selector-item">';
              temp += '      <div class="squared-checkbox">';
              temp += '          <input type="checkbox" class="result-select-child" ';
              temp += '              id="RESULT-FILTER-PARENT-' + item.key + '"/>';
              temp += '          <label class="result-selector-parent"/>';
              temp += "      </div>";
              if (key === "countryCode") {
                temp += '      <span class="ml10 flag flag-' + item.key.toLowerCase() + '"/>';
              }
              temp += '      <span class="ml10 result-selector-title normal" title="' + (item.name ? item.name : item.key) + '">' + (item.name ? item.name : item.key) + "</span>";
              temp += '       <span class="filter-count">(' + (item.count || 0) + ")</span>";
              temp += "     </div>";
              temp += "   </dd>";
              layui.each(item.children, function (idx, child) {
                temp += '<dd class="fliter-child">';
                temp += '      <div class="result-selector-item child">';
                temp += '      <div class="squared-checkbox">';
                temp += '                <input type="checkbox" class="result-select-child" ';
                temp += '              id="RESULT-FILTER-CHILD-' + child.key + '" parent="' + item.key + '"/>';
                temp += '          <label class="result-selector-child" />';
                temp += "      </div>";
                temp += '      <span class="ml10 result-selector-title normal" title="' + (item.name ? item.name : item.key) + '">' + child.key + "</span>";
                temp += '       <span class="filter-count">(' + (child.count || 0) + ")</span>";
                temp += "   </div>";
                temp += "</dd>";
              });
            } else {
              temp += '    <dd class="fliter-child">';
              temp += '      <div class="result-selector-item">';
              temp += '      <div class="squared-checkbox">';
              temp += '          <input type="checkbox" class="result-select-child" ';
              temp += '              id="RESULT-FILTER-PARENT-' + item.key + '"/>';
              temp += '          <label class="result-selector-parent"/>';
              temp += "      </div>";
              // temp += '      <span class="block-back ml10"/>';
              temp += '      <span class="ml10 result-selector-title normal" title="' + (item.name ? item.name : item.key) + '">' + (item.name ? item.name : item.key) + "</span>";
              temp += '       <span class="filter-count">(' + (item.count || 0) + ")</span>";
              temp += "     </div>";
              temp += "   </dd>";
            }
          });
          // 筛选
          var sxhtml = '<span class="slef-search-btn normal select-of-result" data-value="' + key + '" data-name="' + name + '"';
          sxhtml += 'style="width: 80px;height:24px;line-height:24px">筛选</span>';
          var glhtml = '<span class="slef-search-btn normal filter-of-result ml10" data-value="' + key + '" data-name="' + name + '"';
          glhtml += '" style="width: 80px;height:24px;line-height:24px">过滤</span>';
          temp += '       <dd class="result-selector-filter">' + sxhtml + glhtml + "</dd>";
          temp += "    </dl>";
          $("#T-" + key + " dl").remove();
          $("#T-" + key).append(temp);
          element.render("nav");
        }
      });
    });
  };

  /**
   * 渲染中间 列表
   * @param {*} res
   */
  _this.renderContent = function (res) {
    // 数据
    // var fieldview = document.getElementById("fieldsContent");
    if (res.patents && res.patents.length > 0) {
      laytpl(resultlistpat).render(res.patents || [], function (html) {
        $("#fieldsContent").html(html);
      });
      // 分页
      // 最多99 * 10 条
      // 统计
      $("#resultTime").html((res.responseTimes || 0) + "s");
      $("#resultCount").html((res.total || 0) + "条");
      res.total = res.total ? (res.total > 1000 ? 999 : res.total) : 0;
      laypage.render({
        elem: "pageNavagete",
        count: res.total || 0,
        first: "首页",
        last: "尾页",
        curr: res.page || 1,
        prev: '<i class="layui-icon layui-icon-left" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i>',
        next: '<i class="layui-icon layui-icon-right" style="font-size: 14px; color: rgba(0,0,0,0.65);"></i> ',
        jump: function (obj, first) {
          //obj包含了当前分页的所有参数，比如：
          // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          // console.log(obj.limit); //得到每页显示的条数
          if (!first) {
            _this.page = obj.curr;
            _this.search();
            $(".result-body").animate({ scrollTop: 0 }, 600);
          }
        },
      });

      // 检查收藏
      let ids = [];
      layui.each(res.patents, function (index, item) {
        ids.push(item.id);
      });

      request.get(`/api/user/favorites/exists?id=${ids.toString()}`, function (res) {
        if (res && res.data) {
          var favoriteData = res.data || {};
          layui.each(favoriteData, function (k, v) {
            if (v) {
              $("#FORK-KEY-" + k)
                .addClass("layui-icon-star-fill")
                .removeClass("layui-icon-star")
                .next()
                .html("取消收藏");
            }
          });
        }
      });
    } else {
      _this.renderNoData();
    }
  };

  _this.renderNoData = function () {
    // 默认无数据
    var txt = $("#expandTextarea").val();
    var extra = "";
    var id = "";
    var reg = new RegExp(/\S*\d{12}\.?((\d?|X)|\d?|X?)/);
    if (reg.test(txt)) {
      var at = txt.match(/\d{12}\.?\S{1}/);
      if (at && at[0]) {
        id = at[0].replace(".", "");
      }
      extra = '或者查看下该专利的<a target="_blank" href="/patent/result.html?force=cost&id=' + id + '" class="hl">费用信息</a>。';
    }
    var html = `
    <div class="tips"> 
      <div style="width:600px;text-align: center;">
        <img src="./images/nodata-big.png" style="margin-top:50px"/>
      </div>
      <div class="tip-container">
        <div class="tips-line blod" style="font-size: 16px; color: #333333;">没有找到符合搜索条件的专利，请输入有效的搜索条件进行查询！</div>
        <div class="tips-line">没有搜索到相关或相似专利，原因可能是：</div>
        <div class="tips-line"><span class="point">•</span> 此专利不存在。</div>
        <div class="tips-line"><span class="point">•</span> 该发明创造目前未公开／未公告，处于保密专利申请的状态。这段时间一般是自申请日起几个月到十几个月，</div>
        <div class="tips-line pd-br"> 过段时间再来查吧。${extra}</div>
        <div class="tips-line"><span class="point">•</span> 检索条件不正确。请您核对是否对搜索条件进行了不正确的字段限定。<a target="_blank" href="/help.html" class="hl">查看帮助文档</a></div>
        <div class="tips-line"><span class="point">•</span> 检索的号码格式不正确。请核对是否输入了符合infoDossier要求的号码格式。<a target="_blank" href="/help.html" class="hl">查看帮助文档</a></div>
        <div class="tips-line"><span class="point">•</span> 搜索关键词范围太窄。请尝试使用其他关键词或近义词、使用含义更为宽泛的关键词。</div>
        <div class="tips-line"><span class="point">•</span> 也许是非正常的搜索请求。</div>
        <br/>
        <br/>
        <div class="tips-line">请特别注意：</div>
        <div class="tips-line"><span class="point">•</span>系统默认会对关键词进行拆分，若不希望分词，请使用""对词语进行限制，以获得更精确的结果。</div>
        <div class="tips-line pd-br"> 如：关键词使用"柴油汽车发动机" 则只查找包含柴油汽车发动机这几个字紧邻的专利文献</div>
        <div class="tips-line"><span class="point">•</span>通过申请(专利)号时，可以任意输入，可以选择是否带国家代码或者校验位。</div>
        <div class="tips-line pd-br"> 如:200480028847、CN200480028847、CN200610063434.1</div>
        <div class="tips-line"><span class="point">•</span>通过分类号搜索，可以输入不完整的分类号。如：A61B、 G06F17</div>
        <div class="tips-line"><span class="point">•</span>查日期，可按年、年月、年月日查。如:applicationYear:2007、applicationMonth:2007-08、applicationDate:2007-08-08。</div>
        <div class="tips-line"><span class="point">•</span>更复杂的逻辑查询请参考右上角的<a target="_blank" href="/help.html" class="hl">《帮助文档》</a></div>
      </div>
    </div>
    `;
    $("#fieldsContent").html(html);
  };
  /**
   * 列表内容
   */
  _this.search = function (ration) {
    // 清除页面收藏状态
    $("#selectAllResult").text("全选");
    $("#selectAllResult").removeClass("select-all");

    // 得到检索条件 查询
    var q = _this.searchText;
    // 排序
    var s = _this.sort;
    var p = _this.page;
    // 国家 all cn
    var ds = _this.selectedCountry;

    if (q !== null && q !== "") {
      var sendDate = new Date().getTime();

      // 二次检索
      if (_this.secondText && _this.secondText != "") {
        q += _this.secondText;
      }

      var selectedCountry = _this.selectedCountry;

      var defaulCc = true;
      if (_this.selectQuery["countryCode"]) {
        defaulCc = false;
        ds = "all";

        q = "(" + q + ")" + " AND " + _this.selectQuery["countryCode"];
      }

      if (defaulCc && selectedCountry !== "CN" && selectedCountry != "all") {
        ds = "all";
        var countryArr = selectedCountry.split(",");
        if (countryArr.length > 0) {
          var dsStr = " AND countryCode:(";
          countryArr.map(function (item, i) {
            if (i == 0) {
              dsStr += item;
            } else {
              dsStr += " OR " + item;
            }
          });
          dsStr += ")";
          q = "(" + q + ")" + dsStr;
        }
      }

      if (_this.filterQuery["countryCode"]) {
        ds = "all";
        var filterArr = _this.filterQuery["countryCode"];
        layui.each(filterArr, function (index, item) {
          q = "(" + q + ")" + " AND NOT " + item.value;
        });
      }

      // 筛选过滤时其他条件不变
      for (let key in _this.selectQuery) {
        if (_this.selectQuery[key] != null && key !== "countryCode") {
          q = "(" + q + ")" + " AND " + key + ":" + _this.selectQuery[key];
        }
      }
      // 过滤筛选
      for (let key in _this.filterQuery) {
        if (_this.filterQuery[key] != null && key !== "countryCode") {
          var filterArr = _this.filterQuery[key];
          layui.each(filterArr, function (index, item) {
            q = "(" + q + ")" + " AND NOT " + key + ":" + item.value;
          });
        }
      }

      if (_this.extraFilter && _this.firinit) {
        // 覆盖条件
        q = _this.extraFilter;
        _this.firinit = null;
      }

      var url = `/api/adv/s?ds=${ds}&q=${q}&p=${p}&hl=1`;
      if (s != null) {
        url += "&sort=" + s;
        _this.sort = null; // 重置
      }
      _this.resultUrl = url.replace(/\&/g, "TANDT");

      if (ration) {
        _this.renderFilterContent(ds, q, _this.selector);
        return;
      }
      $("#lodingContent").loding("start");
      request.get(
        url,
        function (res) {
          $("#lodingContent").loding("stop");
          var receiveDate = new Date().getTime();
          var responseTimeMs = receiveDate - sendDate;
          res.responseTimes = responseTimeMs / 1000;
          _this.renderContent(res || {});
        },
        function (err) {
          $("#lodingContent").loding("stop");
          _this.renderNoData();
        }
      );
      // 加载过滤筛选条件
      _this.renderFilterContent(ds, q, _this.selector);
    } else {
      _this.renderContent({});
    }
  };

  /**
   * 左侧大项初始化
   */
  _this.initSelector = function () {
    $.getJSON("mock/fliterDimension.json", function (res, status) {
      // 记录本地值
      _this.selectorData = res.data || [];

      var temp = '<ul class="layui-nav layui-nav-tree layui-inline">';
      var data = res.data || [];

      layui.each(data, function (index, item) {
        temp += '<li class="layui-nav-item layui-nav-itemed" id="T-' + item.value + '">';
        temp += '  <a class="result-selector-title result-selector-item bb" >' + item.name + "</a>";
        temp += "</li>";
      });
      temp += "</ul>";
      $(".result-left-selector").html(temp);
      $(".result-left-selector").css("width", "200px");
      if (data.length > 0) {
        var firstItem = data[0];
        _this.selector.add(firstItem.value || "");
      }
      element.render("nav");

      // 加载数据
      _this.search();
    });
  };

  /**
   * 初始化页面
   */
  _this.renderPage = function () {
    _this.initSelector();
    // 初始化条件
    _this.filterQuery = {};
    _this.selectQuery = {};
  };

  // 初始化页面
  _this.init = function () {
    var currentMenu = layui.sessionData("session").currentMenu;
    if (currentMenu !== "LIST") {
      return;
    }
    // 初始化输入框
    var value = request.getParamFromUri("s");
    $("#expandTextarea").val(value);

    _this.searchText = value;
    _this.renderPage();
  };

  _this.init();

  /**
   * 去往详情页
   */
  function gotoResultPage(value) {
    window.open(`/patent/result.html?id=${value}&url=${_this.resultUrl}`, "_blank");
  }

  /**
   * 去往详情页
   */
  $("#searchResult").on("click", "img", function (e) {
    var value = $(e.currentTarget).data().value;
    gotoResultPage(value);
  });
  $("#searchResult").on("click", ".fileds-item-title", function (e) {
    var value = $(e.currentTarget).data().value;
    gotoResultPage(value);
  });

  /**
   * 异步加载纬度
   */
  $("#searchResult").on("click", "li.layui-nav-item", function (e) {
    var id = $(e.currentTarget).attr("id");
    var value = id.split("-").pop();
    if (_this.selector.has(value)) {
      return;
    }
    if (_this.orignData[value]) {
      // 防止子节点点击加载
      return;
    }
    var s = _this.selectorData.find(function (d) {
      return d.value == value;
    });
    if (s !== undefined && s !== null) {
      _this.selector.add(value);
      _this.search(true);
    }
  });

  /**
   * 检索
   */
  $("#resultSearchBtn").on("click", function () {
    // 清除左侧筛选框
    $(".result-left-filter").html("");
    $(".result-left-second").html("");
    _this.searchText = $("#expandTextarea").val();
    _this.renderPage();
  });

  /**
   * 二次检索
   */
  $("#resultSecondSearchBtn").on("click", function (e) {
    // 清除左侧筛选框
    $(".result-left-filter").html("");
    var v = $("#expandTextarea").val();
    if (v == _this.searchText) {
      _this.renderPage();
    } else {
      _this.secondText = " AND " + v;
      _this.renderPage();
    }
    // 生成筛选提示框
    var content = '<div class="filter-item select-modal">';
    content += '<span class="close-icon-self" data-type="second">x</span>';
    content += '<span class="key-word">二次检索 </span>';
    content += '<span class="key-type">' + _this.searchText + " AND " + v + " </span>";
    content += "</div>";
    $(".result-left-second").html(content);
  });

  /**
   * 全选
   */
  $("#searchResult").on("click", "#selectAllResult", function (e) {
    if ($(e.currentTarget).hasClass("select-all")) {
      // 取消全选
      $(e.currentTarget).text("全选");
      $(e.currentTarget).removeClass("select-all");
      $(".result-checkbox-input").attr("value", "unchecked");
    } else {
      // 全选
      $(e.currentTarget).text("全不选");
      $(e.currentTarget).addClass("select-all");
      $(".result-checkbox-input").attr("value", "checked");
    }
  });

  /**
   * 收藏
   */
  $("#searchResult").on("click", "#collectSelectedResult", function (e) {
    var checkedInput = $("#searchResult").find('input[value = "checked"]');
    if (checkedInput.length == 0) {
      layer.msg("请选择一条记录进行收藏");
      return;
    }
    var checkValue = [];
    checkedInput.each(function () {
      var id = $(this).parent().find("input").attr("id");
      var v = id.split("-").pop();
      checkValue.push(v);
      $("#FORK-KEY-" + v).removeClass("layui-icon-star");
      $("#FORK-KEY-" + v).addClass("layui-icon-star-fill");
      $("#FORK-KEY-" + v)
        .next()
        .html("取消收藏");
    });
    // 收藏接口
    request.post(`/api/user/favorites?id=${checkValue.toString()}`, function (res) {
      if (res && res.error == 0) {
        layer.msg("收藏成功");
      }
    });
  });

  /**
   * 排序
   */
  $("#searchResult").on("click", ".sort-option", function (e) {
    $(this).addClass("checked").siblings().removeClass("checked");
    _this.sort = $(this).attr("value");
    _this.page = 1;
    _this.search();
  });

  /**
   * 左侧选择框父节点 点击事件
   */
  $("#searchResult").on("click", ".result-selector-parent", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    var id = $(e.currentTarget).parent().find("input").attr("id");
    var value = id.split("-").pop();
    if (input.length > 0) {
      // 取消
      $(e.currentTarget).prev().attr("value", "unchecked");
      $("#searchResult")
        .find("input[parent = " + value + "]")
        .attr("value", "unchecked");
    } else {
      // 选择
      $(e.currentTarget).prev().attr("value", "checked");
      $("#searchResult")
        .find("input[parent = " + value + "]")
        .attr("value", "checked");
    }
  });

  /**
   * 左侧选择框子节点 点击事件
   */
  $("#searchResult").on("click", ".result-selector-child", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    var id = $(e.currentTarget).parent().find("input").attr("parent");
    var value = id.split("-").pop();
    if (input.length > 0) {
      $(e.currentTarget).prev().attr("value", "unchecked");
      // 取消全选
      $("#searchResult")
        .find("#RESULT-FILTER-PARENT-" + value)
        .attr("value", "unchecked");
    } else {
      // 检查满足是否全选
      var all = $("#searchResult").find("input[parent = " + value + "]");
      var checked = $("#searchResult").find("input[parent = " + value + "][value=checked]");
      $(e.currentTarget).prev().attr("value", "checked");
      if (all.length == checked.length + 1) {
        $("#searchResult")
          .find("#RESULT-FILTER-PARENT-" + value)
          .attr("value", "checked");
      }
    }
  });

  /**
   * 中间内容选择框
   */
  $("#searchResult").on("click", ".result-checkbox-label", function (e) {
    var input = $(e.currentTarget).parent().find('input[value="checked"]');
    if (input.length > 0) {
      // 取消
      $(e.currentTarget).parent().find("input").attr("value", "unchecked");
    } else {
      // 选择
      $(e.currentTarget).parent().find("input").attr("value", "checked");
      // if ($(e.currentTarget).parent().find(".fork-star").hasClass("layui-icon-star-fill")) {
      //   layer.msg("此纪录已经被收藏！");
      // } else {
      //   $(e.currentTarget).parent().find("input").attr("value", "checked");
      // }
    }
  });
  /**
   * 收藏 取消收藏
   */
  $("#searchResult").on("click", ".fork-star", function (e) {
    var id = e.currentTarget.id.split("-").pop();
    if ($(e.currentTarget).hasClass("layui-icon-star")) {
      // 收藏
      $(e.currentTarget).removeClass("layui-icon-star");
      $(e.currentTarget).addClass("layui-icon-star-fill");
      $(e.currentTarget).next().html("取消收藏");
      request.post(`/api/user/favorites?id=${id}`, function (res) {
        if (res && res.error == 0) {
          layer.msg("收藏成功");
        }
      });
    } else {
      $(e.currentTarget).removeClass("layui-icon-star-fill");
      $(e.currentTarget).addClass("layui-icon-star");
      $(e.currentTarget).next().html("收藏");
      request.delete(`/api/user/favorites?id=${id}`, function (res) {
        if (res && res.error == 0) {
          layer.msg("取消收藏成功");
        }
      });
    }
  });

  /**
   * 筛选
   */
  $("#searchResult").on("click", ".select-of-result", function (e) {
    var checked = $(this).parent().parent().find('.fliter-child input[value = "checked"]');
    var name = $(this).data().name;
    var filterCode = $(this).data().value;
    // 清除已有的
    $('.filter-item.select-modal[name = "' + name + '"]').remove();

    // 生成新的
    if (checked.length > 0) {
      var content = '<div class="filter-item select-modal" name="' + name + '">';
      content += '<span class="close-icon-self" data-value="' + filterCode + '" data-name="' + name + '" data-type="select">x</span>';
      content += '<span class="key-word">筛选 </span>';
      content += '<span class="key-type">' + name + " </span>";
      var filterText = "(";
      var parentKey = new Set();
      var parentSelect = {};
      checked.each(function (i, e2) {
        var id = $(e2).attr("id");
        var parent = $(e2).attr("parent");
        var value = id.split("-").pop();
        if (!parent) {
          // 无父节点
          if (i == 0) {
            filterText += value;
          } else {
            filterText += " OR " + value;
          }
        } else {
          //  国家匹配规则不一致 单独编写
          if (filterCode == "countryCode") {
            if (!parentKey.has(parent)) {
              parentKey.add(parent);
              parentSelect[parent] = value;
            } else {
              parentSelect[parent] += "," + value;
            }
          }
        }
      });
      filterText += ")";
      if (parentKey.size > 0) {
        var first = true;
        parentKey.forEach(function (element) {
          // 遍历Set
          var sel = parentSelect[element];
          var typeStr = sel.match(/\,/);
          typeStr = " AND type:(" + sel.replace(/\,/g, " OR ") + "))";
          if (first) {
            first = false;
            filterText = " (countryCode:" + element + typeStr;
          } else {
            filterText += " OR (countryCode:" + element + typeStr;
          }
        });
      }

      content += filterText;
      content += "</div>";
      $(".result-left-filter").append(content);
      // TODO 重新查询
      _this.selectQuery[filterCode] = filterText;
      _this.page = 1;
      // 重新渲染左侧节点
      _this.search();
    }
  });

  // 清除提示框按钮
  $("#searchResult").on("click", ".close-icon-self", function (e) {
    // 清除元素
    $(this).parent().remove();
    var type = $(this).data().type;
    _this.page = 1;
    if (type == "second") {
      _this.secondText = null;
      _this.searchText = $("#expandTextarea").val();
    } else {
      var filterCode = $(this).data().value;
      if (type == "filter") {
        var key = $(this).data().random;
        var filterArr = _this.filterQuery[filterCode];
        var index = -1;
        // 删除当前选中的
        filterArr.find(function (item, idx) {
          if (item.key == key) {
            index = idx;
            return;
          }
        });
        if (index >= 0) {
          filterArr.splice(index, 1);
          _this.filterQuery[filterCode] = filterArr;
        }
      } else {
        _this.selectQuery[filterCode] = null;
      }
    }
    _this.search();
  });

  /**
   * 过滤
   */
  $("#searchResult").on("click", ".filter-of-result", function (e) {
    var checked = $(this).parent().parent().find('.fliter-child input[value = "checked"]');
    var name = $(this).data().name;
    var filterCode = $(this).data().value;
    // 清除已有的 ps:多次过滤 不用清除
    // $('.filter-item.filter-modal[name = "' + name + '"]').remove();
    // 生成新的
    if (checked.length > 0) {
      var key = random++;
      var content = '<div class="filter-item filter-modal" name="' + name + '">';
      content += '<span class="close-icon-self" data-value="' + filterCode + '" data-random="' + key + '" data-type="filter">x</span>';
      content += '<span class="key-word">过滤 </span>';
      content += '<span class="key-type">' + name + " </span>";
      var filterText = "(";
      var parentKey = new Set();
      var parentSelect = {};
      checked.each(function (i, e2) {
        var id = $(e2).attr("id");
        var parent = $(e2).attr("parent");
        var value = id.split("-").pop();
        if (!parent) {
          // 无父节点
          if (i == 0) {
            filterText += value;
          } else {
            filterText += " OR " + value;
          }
        } else {
          //  国家匹配规则不一致 单独编写
          if (filterCode == "countryCode") {
            if (!parentKey.has(parent)) {
              parentKey.add(parent);
              parentSelect[parent] = value;
            } else {
              parentSelect[parent] += "," + value;
            }
          }
        }
      });
      filterText += ")";

      if (parentKey.size > 0) {
        var first = true;
        parentKey.forEach(function (element) {
          // 遍历Set
          var sel = parentSelect[element];
          var typeStr = sel.match(/\,/);
          typeStr = " AND type:(" + sel.replace(/\,/g, " OR ") + "))";
          if (first) {
            first = false;
            filterText = " (countryCode:" + element + typeStr;
          } else {
            filterText += " AND NOT (countryCode:" + element + typeStr;
          }
        });
      }

      content += filterText;
      content += "</div>";
      $(".result-left-filter").append(content);
      // TODO 重新查询
      if (_this.filterQuery[filterCode]) {
        _this.filterQuery[filterCode].push({ key: key, value: filterText });
      } else {
        _this.filterQuery[filterCode] = [{ key: key, value: filterText }];
      }
      _this.page = 1;
      _this.search();
    }
  });

  /**
   * 全球按钮
   */
  $("#quanqiuSelector").on("click", function (e) {
    var getParentNode = function (item) {
      var parentChecked = _this.selectedCountryDp;
      var checkedStatus = false;
      if (parentChecked.indexOf("all") !== -1) {
        checkedStatus = true;
      }
      if (parentChecked.indexOf("-" + item.value) !== -1) {
        checkedStatus = false;
      }
      // 叶子节点  COUNTRY-PARENT-VALUE
      var tpl = '<div class="search-country-layer">';
      tpl += '      <div class="squared-checkbox">';
      if ((parentChecked && parentChecked.indexOf(item.value) !== -1) || parentChecked == "all") {
        tpl += '          <input type="checkbox" class="tree-search-parent" value="checked" ';
      } else {
        tpl += '          <input type="checkbox" class="tree-search-parent" ';
      }
      tpl += '              id="COUNTRY-PARENT-' + item.value + '" />';
      tpl += '               <label class="country-layer-parent" for="COUNTRY-PARENT-';
      tpl += item.value + '" />';
      tpl += "      </div>";
      tpl += '      <span class="ml10 search-country-title with-parent ellipsis-text" style="flex:1" title="' + item.title + '">' + item.title + "</span>";
      tpl += "   </div>";
      return tpl;
    };

    var getChildNode = function (item) {
      var childChecked = _this.selectedCountry;
      var filter = _this.selectedCountryDd;
      var checkedStatus = false;
      if (childChecked == "all") {
        checkedStatus = true;
      }
      if (filter) {
        if (filter.indexOf(item.value) !== -1) {
          checkedStatus = false;
        }
      }
      // 子节点  COUNTRY-PARENT-VALUE
      var tpl = '<div class="search-country-layer">';
      tpl += '      <div class="squared-checkbox">';
      if ((childChecked && childChecked.indexOf(item.value) !== -1) || checkedStatus) {
        tpl += '          <input type="checkbox" class="tree-search-child" value="checked" ';
      } else {
        tpl += '          <input type="checkbox" class="tree-search-child" ';
      }
      tpl += '              parent="' + item.parent + '" ';
      tpl += '              id="COUNTRY-CHILD-' + item.value + '" />';
      tpl += '          <label class="country-layer-child" ';
      tpl += '              for="COUNTRY-CHILD-' + item.value + '" />';
      tpl += "      </div>";
      tpl += '      <span class="ml10 flag flag-' + item.value.toLowerCase() + '"/>';
      tpl += '      <span class="ml10 ellipsis-text" style="flex:1" title="' + item.title + '">' + item.title + "</span>";
      tpl += "   </div>";
      return tpl;
    };

    var content = '<div style="padding:20px;" class="layer-country-checkbox">';
    $.getJSON("mock/country.json", function (res, status) {
      var data = res.data;

      data.map(function (item, index) {
        var temp = "";
        if (item.value !== "NORMAL") {
          if (item.title == "中国" || item.title == "全球") {
            temp = '<div class="layer-line-parent inlineBlock">';
          } else {
            temp = '<div class="layer-line-parent">';
          }
          temp += getParentNode(item);
          temp += "</div>";
        }

        if (item.children && item.children.length > 0) {
          temp += '<div class="layer-line-child">';
          item.children.map(function (child, idx) {
            temp += getChildNode(child);
          });
          temp += "</div>";
        }

        content += temp;
      });

      content += "</div>";

      var index = layer.open({
        type: 1,
        offset: "auto",
        id: "layerSelector",
        content: content,
        btn: ["确认", "取消"],
        btnAlign: "c", //按钮居中
        shade: 0.5,
        area: ["800px", "500px"],
        yes: function () {
          var c = $("#layerSelector").find(".layer-line-child").find('input[value = "checked"]');
          var checkedC = "";
          c.each(function (i) {
            var id = $(this).attr("id");
            var value = id.split("-").pop();
            if (i == 0) {
              checkedC += value;
            } else {
              checkedC += "," + value;
            }
          });
          var d = $("#layerSelector").find(".layer-line-parent").find('input[value = "checked"]');
          var checkedD = "";
          d.each(function (i) {
            var id = $(this).attr("id");
            var value = id.split("-").pop();
            if (i == 0) {
              checkedD += value;
            } else {
              checkedD += "," + value;
            }
          });
          _this.selectedCountry = checkedC;
          _this.selectedCountryDp = checkedD;
          if ($("#layerSelector").find('input[id = "COUNTRY-PARENT-ALL"]').attr("value") == "checked") {
            _this.selectedCountry = "all";
            _this.selectedCountryDp = "all";
          }
          _this.page = 1;
          _this.renderPage();
          layer.close(index);
        },
        btn2: function () {
          layer.close(index);
        },
      });

      /**
       * 弹出选择框父节点 点击事件
       */
      $("#layerSelector").on("click", ".country-layer-parent", function (e) {
        var input = $(e.currentTarget).parent().find('input[value="checked"]');
        var id = $(e.currentTarget).parent().find("input").attr("id");
        var value = id.split("-").pop();
        if (input.length > 0) {
          // 取消
          $(e.currentTarget).prev().attr("value", "unchecked");
          $("#layerSelector")
            .find("input[parent = " + value + "]")
            .attr("value", "unchecked");
          $("#layerSelector").find('input[id = "COUNTRY-PARENT-ALL"]').attr("value", "unchecked");
          // 特殊 全球
          if (value == "ALL") {
            $("#layerSelector").find("input").attr("value", "unchecked");
          }
          // 特殊 欧盟
          if (value == "EUROPE") {
            $("#layerSelector").find('input[id = "COUNTRY-CHILD-EP"]').attr("value", "unchecked");
          }
        } else {
          // 选择
          $(e.currentTarget).prev().attr("value", "checked");
          $("#layerSelector")
            .find("input[parent = " + value + "]")
            .attr("value", "checked");
          // 特殊 全球
          if (value == "ALL") {
            $("#layerSelector").find("input").attr("value", "checked");
          } else {
            // 检查全球
            var allCountry = $("#layerSelector").find("input");
            var checkedCountry = $("#layerSelector").find("input[value=checked]");
            if (allCountry.length == checkedCountry.length + 1) {
              $("#layerSelector").find('input[id = "COUNTRY-PARENT-ALL"]').attr("value", "checked");
            }
          }
          // 特殊 欧盟
          if (value == "EUROPE") {
            $("#layerSelector").find('input[id = "COUNTRY-CHILD-EP"]').attr("value", "checked");
          }
        }
      });

      /**
       * 弹出选择框子节点 点击事件
       */
      $("#layerSelector").on("click", ".country-layer-child", function (e) {
        var input = $(e.currentTarget).parent().find('input[value="checked"]');
        var id = $(e.currentTarget).parent().find("input").attr("parent");
        var value = id.split("-").pop();
        if (input.length > 0) {
          $(e.currentTarget).prev().attr("value", "unchecked");
          // 取消全选
          $("#layerSelector")
            .find("#COUNTRY-PARENT-" + value)
            .attr("value", "unchecked");
          $("#layerSelector").find('input[id = "COUNTRY-PARENT-ALL"]').attr("value", "unchecked");
        } else {
          // 检查满足是否全选
          var all = $("#layerSelector").find("input[parent = " + value + "]");
          var checked = $("#layerSelector").find("input[parent = " + value + "][value=checked]");
          $(e.currentTarget).prev().attr("value", "checked");
          if (all.length == checked.length + 1) {
            $("#layerSelector")
              .find("#COUNTRY-PARENT-" + value)
              .attr("value", "checked");
          }
          // 检查全球
          var allCountry = $("#layerSelector").find("input");
          var checkedCountry = $("#layerSelector").find("input[value=checked]");
          if (allCountry.length == checkedCountry.length + 1) {
            $("#layerSelector").find('input[id = "COUNTRY-PARENT-ALL"]').attr("value", "checked");
          }
        }
      });
    });
  });

  /**
   * 搜索框
   */
  $(".expand-textarea").on("change", "textarea", function (e) {
    if (e.currentTarget.value) {
      _this.searchText = e.currentTarget.value;
    }
  });
});

(function () {})();

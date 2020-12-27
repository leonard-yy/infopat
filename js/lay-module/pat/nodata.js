layui.define(function (exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var obj = {
        html: `<div class="nodataInfo">
    <img src="./images/nodata.png" alt="_">
    <br>
    暂无数据
    </div>`
    };

    exports('patNodata', obj);
});  
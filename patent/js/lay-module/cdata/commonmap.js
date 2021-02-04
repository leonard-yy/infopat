/*
 * @Description:
 */

layui.define(function (exports) {
  var map = new Map();
  exports("commonmap", {
    set: function (key, value) {
      map.set(key, value);
    },
    get: function (key) {
      return map.get(key);
    },
  });
});

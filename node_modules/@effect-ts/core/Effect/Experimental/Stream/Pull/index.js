"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Pull = /*#__PURE__*/require("@effect-ts/system/Experimental/Stream/Pull");

Object.keys(_Pull).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Pull[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Pull[key];
    }
  });
});
//# sourceMappingURL=index.js.map
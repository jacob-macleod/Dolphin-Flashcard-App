"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Tracing = /*#__PURE__*/require("@effect-ts/system/Tracing");

Object.keys(_Tracing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Tracing[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Tracing[key];
    }
  });
});
//# sourceMappingURL=index.js.map
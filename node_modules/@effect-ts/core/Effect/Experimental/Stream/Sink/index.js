"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sink = /*#__PURE__*/require("@effect-ts/system/Experimental/Stream/Sink");

Object.keys(_Sink).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Sink[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Sink[key];
    }
  });
});
//# sourceMappingURL=index.js.map
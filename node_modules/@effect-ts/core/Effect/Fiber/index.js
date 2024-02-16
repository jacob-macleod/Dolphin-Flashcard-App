"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Fiber = /*#__PURE__*/require("@effect-ts/system/Fiber");

Object.keys(_Fiber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Fiber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Fiber[key];
    }
  });
});
//# sourceMappingURL=index.js.map
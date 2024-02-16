"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _FiberRef = /*#__PURE__*/require("@effect-ts/system/FiberRef");

Object.keys(_FiberRef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _FiberRef[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _FiberRef[key];
    }
  });
});
//# sourceMappingURL=index.js.map
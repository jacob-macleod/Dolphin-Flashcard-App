"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Clock = /*#__PURE__*/require("@effect-ts/system/Clock");

Object.keys(_Clock).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Clock[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Clock[key];
    }
  });
});
//# sourceMappingURL=index.js.map
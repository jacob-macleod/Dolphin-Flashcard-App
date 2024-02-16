"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Queue = /*#__PURE__*/require("@effect-ts/system/Queue");

Object.keys(_Queue).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Queue[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Queue[key];
    }
  });
});
//# sourceMappingURL=index.js.map
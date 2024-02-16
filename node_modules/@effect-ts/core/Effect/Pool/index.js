"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Pool = /*#__PURE__*/require("@effect-ts/system/Pool");

Object.keys(_Pool).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Pool[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Pool[key];
    }
  });
});
//# sourceMappingURL=index.js.map
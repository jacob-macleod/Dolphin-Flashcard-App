"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../Operator/index.js");

var _Function = /*#__PURE__*/require("@effect-ts/system/Function");

Object.keys(_Function).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Function[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Function[key];
    }
  });
});
//# sourceMappingURL=index.js.map
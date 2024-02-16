"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Scope = /*#__PURE__*/require("@effect-ts/system/Scope");

Object.keys(_Scope).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Scope[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Scope[key];
    }
  });
});
//# sourceMappingURL=index.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Cause = /*#__PURE__*/require("@effect-ts/system/Cause");

Object.keys(_Cause).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Cause[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Cause[key];
    }
  });
});
//# sourceMappingURL=index.js.map
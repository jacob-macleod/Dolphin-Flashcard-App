"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("../../Operator/index.js");

var _Managed = /*#__PURE__*/require("@effect-ts/system/Managed");

Object.keys(_Managed).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Managed[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Managed[key];
    }
  });
});
//# sourceMappingURL=index.js.map
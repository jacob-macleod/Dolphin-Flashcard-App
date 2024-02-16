"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mutable = /*#__PURE__*/require("@effect-ts/system/Support/Mutable");

Object.keys(_Mutable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _Mutable[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _Mutable[key];
    }
  });
});
//# sourceMappingURL=index.js.map